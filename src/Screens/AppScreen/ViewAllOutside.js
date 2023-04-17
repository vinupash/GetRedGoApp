import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, ScrollView, TouchableOpacity, Image, ActivityIndicator, PermissionsAndroid, Animated } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../../Constants/Api';
import { COLORS, SIZES, FONT, SHADOWS } from '../../Constants';
import Header from '../../Components/Header';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import {
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';
import { UploadAllowedApi } from '../../Constants/ApiCall';
import * as ImagePicker from 'react-native-image-crop-picker';

const ViewAllOutside = ({ navigation, route }) => {
    const [isLoading, setLoading] = useState(false);
    const [isAllTablesData, setAllTablesData] = useState([]);
    const isFocused = useIsFocused();
    const [isTableImagePath, setTableImagePath] = useState('');
    const [isTableImageType, setTableImageType] = useState('');
    const [isWaiter_id, setWaiter_id] = useState('');
    const [isStore_id, setStore_id] = useState('');
    const [isUploadAllowed, setUploadAllowed] = useState('');
    const [dataSource, setDataSource] = useState([]);
    const [offset, setOffset] = useState(1);
    const [isTotalPages, setTotalPages] = useState('');
    const [isUploadAllowedTable, setUploadAllowedTable] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccessMessage, setSuccessMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    // const { pageDetails } = route.params;
    const [shouldNavigate, setShouldNavigate] = useState(false);

    useEffect(() => {
        fetchDataAsync();
    }, []);

    useEffect(() => {
        ImageListingData();
    }, []);

    const fetchDataAsync = async () => {
        setLoading(true)
        const userLognDetails = await AsyncStorage.getItem("userData");
        if (!userLognDetails) {
            // Alert.alert("Unable to fetch mobile number, Login again");
            return;
        }
        const transformedLoginData = JSON.parse(userLognDetails);
        const userStoreDetails = await AsyncStorage.getItem("userStoreDetails");
        const transformedStoreData = JSON.parse(userStoreDetails);
        console.log('transformedStoreData --->', transformedStoreData);
        // console.log('transformedLoginData Hotel--->', transformedLoginData.waiter_id);
        const waiterId = transformedLoginData.waiter_id;
        const storeId = transformedLoginData.waiter_id;
        setWaiter_id(waiterId)
        setStore_id(storeId)
        const responseUploadAllowed = await UploadAllowedApi(waiterId, storeId);
        setLoading(false)
        setUploadAllowedTable(responseUploadAllowed.outside)
        console.log('responseUploadAllowed--->', responseUploadAllowed.outside);
    };

    const ImageListingData = async () => {
        try {
            setLoading(true)
            const userLognDetails = await AsyncStorage.getItem("userData");
            if (!userLognDetails) {
                // Alert.alert("Unable to fetch mobile number, Login again");
                return;
            }
            const transformedLoginData = JSON.parse(userLognDetails);
            console.log('transformedLoginData UploadPictures--->', transformedLoginData);

            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Basic YWRtaW46Q0ByXjBuQCQxMiE=");

            var formdata = new FormData();
            formdata.append("store_id", transformedLoginData.store_id);
            formdata.append("imagetype", 'outsite');
            formdata.append("page_no", offset);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            const response = await fetch(baseUrl + "image/imageListing", requestOptions);
            const json = await response.json();
            setLoading(false);
            console.log('json ViewAllTable--->', json);
            if (json.status === 'success') {
                setAllTablesData(json.result)
                setTotalPages(json.number_of_pages)
                setOffset(offset + 1);
                //Increasing the offset for the next API call
                setDataSource([...dataSource, ...json.result]);
            } else {
                alert(json.message)
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    const AllTableData = () => {
        return dataSource.map(allTableInfoData => {
            return (
                <View style={styles.productBox} key={allTableInfoData.fldi_id}>
                    <Image source={{ uri: allTableInfoData.fldv_image }} style={styles.ProductImage} />
                    <View style={styles.productDetails}>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.cardTitle}>Uploaded by</Text>
                            <Text style={styles.cardText}>{allTableInfoData.fldv_name}</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.cardTitle}>Uploaded on</Text>
                            <Text style={styles.cardText}>{moment(allTableInfoData.flddt_date_added).format('Do MMMM YYYY')}</Text>
                        </View>
                    </View>
                    <View style={styles.productDetails}>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.cardTitle}>Status</Text>
                            <Text style={styles.cardText}>{allTableInfoData.flg_status == 0 ? 'Approved' : 'Not-Approved'}</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.cardTitle}>Pts</Text>
                            <Text style={styles.cardText}>{allTableInfoData.fldf_points}</Text>
                        </View>
                    </View>
                </View>
            )
        })
    }

    const renderFooter = () => {
        return (
            <View style={styles.footer}>
                {offset <= isTotalPages ? (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={ImageListingData}
                        style={styles.loadMoreBtn}>
                        <Text style={{
                            color: COLORS.brand.white,
                            fontFamily: FONT.InterRegular,
                            color: COLORS.brand.textColor,
                            fontSize: SIZES.small
                        }}>Load More</Text>
                        {isLoading ? (
                            <ActivityIndicator
                                color="white"
                                style={{ marginLeft: 8 }} />
                        ) : null}
                    </TouchableOpacity>
                ) :
                    null}
            </View>
        );
    };

    const handleErrorMsg = () => {
        Animated.timing(
            fadeAnim,
            {
                toValue: isVisible ? 0 : 1,
                duration: 500,
                useNativeDriver: true
            }
        ).start();
        setTimeout(() => {
            setErrorMessage('');
        }, 5000);
    };

    const handleSuccessMsg = () => {
        Animated.timing(
            fadeAnim,
            {
                toValue: isVisible ? 0 : 1,
                duration: 500,
                useNativeDriver: true
            }
        ).start();
        setTimeout(() => {
            setSuccessMessage('');
        }, 5000);
    };

    useEffect(() => {
        if (shouldNavigate) {
            setTimeout(() => {
                navigation.goBack();
            }, 5000);
        }
    }, [shouldNavigate]);

    const ImageUploadOutsiteApi = (isWaiter_id, isStore_id, isTableImageType, isTableImagePath) => {
        console.log("isTableImageType ", isTableImageType)
        console.log("isTableImagePath ", isTableImagePath)
        try {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Basic YWRtaW46Q0ByXjBuQCQxMiE=");

            var formdata = new FormData();
            formdata.append("waiter_id", isWaiter_id);
            formdata.append("store_id", isStore_id);
            formdata.append("imagetype", 'outsite');
            formdata.append("upload_img", isTableImageType, isTableImagePath);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(baseUrl + "image/uploadImage", requestOptions)
                .then(res => {
                    return res;
                }).then((data) => {
                    return data.json()
                }).then((dataJson) => {
                    // fetchDataAsync();
                    console.log("dataJson ", dataJson);
                    // handleSuccessMsg()
                    // setSuccessMessage(dataJson.message);
                    if (dataJson.status === true) {
                        fetchDataAsync()
                        handleSuccessMsg()
                        ImageListingData()
                        setSuccessMessage(dataJson.message);
                        setShouldNavigate(dataJson.status)
                    } else {
                        handleErrorMsg()
                        setErrorMessage(dataJson.message)
                    }
                })
                .catch((err) => {
                    console.log(err)
                });
            // const json = response.json();
            // console.log(json);
            //return response;
        } catch (error) {
            console.log(error.message);
        }
    }

    const captureImageOutsite = async (type) => {
        ImagePicker.openCamera({
            mediaType: type,
            width: 300,
            height: 400,
            cropping: false,
            quality: 0.5,
        }).then(image => {
            console.log('selected media ==', image);
            console.log('Image type:', image.mime);
            console.log('Image path:', image.path);
            // const fileName = image.path.split('/').pop() || `image.${image.mime.split('/')[1]}`;
            const fileName = image.path.split('/').pop();
            console.log('Image name:', fileName);

            const img = {
                uri: image.path,
                name: fileName,
                type: image.mime
            }

            ImageUploadOutsiteApi(isWaiter_id, isStore_id, img, image.path)
        })
            .catch(er => {
                console.log(er);
                alert(er);
                if (er.code === 'E_PICKER_CANCELLED') {
                    // here the solution
                    return false;
                }
            });
    };

    // if (isLoading) {
    //     return <ActivityIndicator size="small" color={COLORS.brand.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    // }
    return (

        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='dark-content'
                backgroundColor={COLORS.brand.white}
            />
            {errorMessage !== '' && (
                <Animated.View style={[styles.snackbar, {
                    opacity: fadeAnim
                }]}>
                    <Text style={styles.snackbarText}>{errorMessage}</Text>
                </Animated.View>
            )}

            {isSuccessMessage !== '' && (
                <Animated.View style={[styles.snackbar, {
                    opacity: fadeAnim, backgroundColor: '#28a745'
                }]}>
                    <Text style={[styles.snackbarText, { color: '#FFFFFF' }]}>{isSuccessMessage}</Text>
                </Animated.View>
            )}
            <Header
                onPress={() => navigation.openDrawer()}
            />
            <View style={styles.btnTextGroup}>
                {/* <Text style={styles.pageTitle}>All Outsites</Text> */}
                <View style={{
                    // width: windowWidth - 30,
                    alignSelf: 'center',
                    marginBottom: 14,
                    marginTop: 20,
                    flexDirection: 'row',
                }}>
                    <Text style={styles.pageTitle}>All Outsites</Text>
                    {isLoading ? (
                        <ActivityIndicator
                            size="small" color={COLORS.brand.primary}
                            style={{ marginLeft: 8 }} />
                    ) : null}
                </View>

                {isUploadAllowedTable == 0 ?
                    <>
                        {/* <TouchableOpacity
                    onPress={notAllowed}
                    style={[styles.btnView]}
                >
                    <Text style={styles.btnText}>Upload New</Text>
                </TouchableOpacity> */}
                    </>
                    :
                    <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={() => captureImageOutsite('photo')}
                        style={[styles.btnView]}
                    >
                        <Text style={styles.btnText}>Upload New</Text>
                    </TouchableOpacity>
                }
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {!dataSource.length > 0 ? <Text style={{ width: windowWidth - 30, alignSelf: 'center', fontFamily: FONT.InterMedium, fontSize: SIZES.small, color: COLORS.brand.error }}>No record found</Text> :
                    <>
                        {AllTableData()}
                        {renderFooter()}
                    </>}
                {/* {AllTableData()}
                {renderFooter()} */}
            </ScrollView>

        </SafeAreaView>
    )
}

export default ViewAllOutside

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.brand.background
    },
    pageTitle: {
        textAlign: 'left',
        fontSize: SIZES.mediumLarge,
        fontFamily: FONT.InterBold,
        fontWeight: 700,
        color: COLORS.brand.textColor,
    },
    btnTextGroup: {
        marginTop: 20,
        width: windowWidth - 30,
        marginBottom: 14,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btnView: {
        borderWidth: 1,
        borderColor: COLORS.brand.primary,
        backgroundColor: COLORS.brand.background,
        ...SHADOWS.light,
        marginTop: 6,
        borderRadius: 40 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: 126,
        height: 40,
    },
    btnText: {
        fontFamily: FONT.InterBold,
        color: COLORS.brand.primary,
        fontSize: SIZES.medium,
        fontWeight: 800
    },
    productBox: {
        width: windowWidth - 30,
        alignSelf: 'center',
        marginVertical: 10
    },
    ProductImage: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        width: windowWidth - 30,
        height: 200
    },
    productDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
    },
    cardTitle: {
        fontSize: SIZES.base,
        color: COLORS.brand.labelText,
        fontWeight: '400',
        fontFamily: FONT.InterRegular,
        marginBottom: 2,
    },
    cardText: {
        fontSize: SIZES.small,
        color: COLORS.brand.textColor,
        fontWeight: 700,
        fontFamily: FONT.InterMedium,
    },
    snackbar: {
        backgroundColor: '#C62828',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1,
        // height: 45,
        paddingHorizontal: 5,
        paddingVertical: 10,
        justifyContent: 'center'
    },
    snackbarText: {
        color: '#FFFFFF',
        fontSize: SIZES.font,
        fontFamily: FONT.InterRegular,
        textAlign: 'center'
    },
})