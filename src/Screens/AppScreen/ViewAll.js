import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../../Constants/Api';
import { COLORS, SIZES, FONT, SHADOWS } from '../../Constants';
import Header from '../../Components/Header';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import * as ImagePicker from 'react-native-image-picker';

const ViewAll = ({ navigation, route }) => {
    const [isLoading, setLoading] = useState(false);
    const [isAllTablesData, setAllTablesData] = useState([]);
    const isFocused = useIsFocused();
    const [isPageTitle, setPageTitle] = useState('')
    const [isScreenName, setScreenName] = useState('')
    const [isImageType, setImageType] = useState('');
    const [isGetImageType, setGetImageType] = useState('');
    const [isTableImagePath, setTableImagePath] = useState('');
    const [isTableImageType, setTableImageType] = useState('');
    const [isWaiter_id, setWaiter_id] = useState('');
    const [isStore_id, setStore_id] = useState('');

    const { pageDetails } = route.params;
    useEffect(() => {
        setPageTitle(pageDetails.pageTitle)
        setScreenName(pageDetails.screenName)
        setGetImageType(pageDetails.imageType)
    }, [isFocused])
    // 1 1 Menu  Menu All Menus
    console.log(isWaiter_id, isStore_id, isScreenName, isImageType, isScreenName, isPageTitle, isGetImageType);

    const ImageUpload = async () => {
        try {
            setLoading(true);

            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Basic YWRtaW46Q0ByXjBuQCQxMiE=");

            var formdata = new FormData();
            formdata.append("waiter_id", isWaiter_id);
            formdata.append("store_id", isStore_id);
            formdata.append("imagetype", isGetImageType);
            formdata.append("upload_img", isTableImageType, isTableImagePath);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            const response = await fetch(baseUrl + "image/uploadImage", requestOptions);
            const json = await response.json();
            setLoading(false);
            console.log('json HotelDetails TableImage--->', json);

            if (json.status === true) {
                alert(json.message);
            } else {
                alert(json.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        const UserData = async () => {
            try {
                setLoading(true)
                const userLognDetails = await AsyncStorage.getItem("userData");
                if (!userLognDetails) {
                    // Alert.alert("Unable to fetch mobile number, Login again");
                    return;
                }

                const transformedLoginData = JSON.parse(userLognDetails);
                console.log('transformedLoginData UploadPictures--->', transformedLoginData);
                setWaiter_id(transformedLoginData.waiter_id);
                setStore_id(transformedLoginData.store_id);

                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Basic YWRtaW46Q0ByXjBuQCQxMiE=");

                var formdata = new FormData();
                formdata.append("store_id", transformedLoginData.store_id);
                formdata.append("imagetype", isGetImageType);
                formdata.append("page_no", "1");

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: formdata,
                    redirect: 'follow'
                };

                const response = await fetch(baseUrl + "image/imageListing", requestOptions);
                const json = await response.json();
                setLoading(false);
                console.log('json ViewAll--->', json);
                if (json.status === 'success') {
                    setAllTablesData(json.result)
                } else {
                    alert(json.message)
                }

            } catch (error) {
                console.log(error.message);
            }
        }

        UserData()
    }, [])

    const AllTableData = () => {
        return isAllTablesData.map(allTableInfoData => {
            return (
                <View style={styles.productBox} key={allTableInfoData.fldi_id}>
                    <Image source={{ uri: allTableInfoData.fldv_image }} style={styles.ProductImage} />
                    <View style={styles.productDetails}>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.cardTitle}>Uploaded by</Text>
                            <Text style={styles.cardText}>Suresh Yadav</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.cardTitle}>Uploaded on</Text>
                            <Text style={styles.cardText}>{allTableInfoData.flddt_date_added}</Text>
                            {/* <Text style={styles.cardText}>moment({allTableInfoData.flddt_date_added}).format('MMMM Do YYYY');</Text> */}
                        </View>
                    </View>
                    <View style={styles.productDetails}>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.cardTitle}>Status</Text>
                            <Text style={styles.cardText}>{allTableInfoData.flg_status == 0 ? 'Approved' : 'Not-Approved'}</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.cardTitle}>Pts</Text>
                            <Text style={styles.cardText}>5</Text>
                        </View>
                    </View>
                </View>
            )
        })
    }

    const tableImage = async () => {
        try {
            const options = {
                storageOptions: {
                    path: 'image'
                },
                mediaType: 'photo',
                includeBase64: false,
                quality: 1,
            }
            ImagePicker.launchCamera(options, response => {
                // console.log('response--->', response);
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else {
                    if (!response.uri) {
                        const resitem = response && response.assets[0]
                        const img = {
                            uri: resitem.uri,
                            name: resitem.fileName,
                            type: resitem.type
                        }
                        // setfiledata(img)
                        // setImage(response.assets[0].uri)
                        console.log('img--->', img);
                        console.log('setImage--->', response.assets[0].uri);
                        setTableImagePath(response.assets[0].uri)
                        setTableImageType(img)
                        setImageType('table')
                        ImageUpload()
                    }
                }
            })
        } catch (error) {
            console.warn(error);
        }
    }

    const barImage = async () => {
        try {
            const options = {
                storageOptions: {
                    path: 'image'
                },
                mediaType: 'photo',
                includeBase64: false,
                quality: 1,
            }
            ImagePicker.launchCamera(options, response => {
                // console.log('response--->', response);
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else {
                    if (!response.uri) {
                        const resitem = response && response.assets[0]
                        const img = {
                            uri: resitem.uri,
                            name: resitem.fileName,
                            type: resitem.type
                        }
                        // setfiledata(img)
                        // setImage(response.assets[0].uri)
                        console.log('img--->', img);
                        console.log('setImage--->', response.assets[0].uri);
                        setTableImagePath(response.assets[0].uri)
                        setTableImageType(img)
                        setImageType('bar')
                        ImageUpload()
                    }
                }
            })
        } catch (error) {
            console.warn(error);
        }
    }

    const outsideImage = async () => {
        try {
            const options = {
                storageOptions: {
                    path: 'image'
                },
                mediaType: 'photo',
                includeBase64: false,
                quality: 1,
            }
            ImagePicker.launchCamera(options, response => {
                // console.log('response--->', response);
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else {
                    if (!response.uri) {
                        const resitem = response && response.assets[0]
                        const img = {
                            uri: resitem.uri,
                            name: resitem.fileName,
                            type: resitem.type
                        }
                        // setfiledata(img)
                        // setImage(response.assets[0].uri)
                        console.log('img--->', img);
                        console.log('setImage--->', response.assets[0].uri);
                        setTableImagePath(response.assets[0].uri)
                        setTableImageType(img)
                        setImageType('outsite')
                        ImageUpload()
                    }
                }
            })
        } catch (error) {
            console.warn(error);
        }
    }

    const menuImage = async () => {
        try {
            const options = {
                storageOptions: {
                    path: 'image'
                },
                mediaType: 'photo',
                includeBase64: false,
                quality: 1,
            }
            ImagePicker.launchCamera(options, response => {
                // console.log('response--->', response);
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else {
                    if (!response.uri) {
                        const resitem = response && response.assets[0]
                        const img = {
                            uri: resitem.uri,
                            name: resitem.fileName,
                            type: resitem.type
                        }
                        // setfiledata(img)
                        // setImage(response.assets[0].uri)
                        console.log('img--->', img);
                        console.log('setImage--->', response.assets[0].uri);
                        setTableImagePath(response.assets[0].uri)
                        setTableImageType(img)
                        setImageType('menu')
                        ImageUpload()
                    }
                }
            })
        } catch (error) {
            console.warn(error);
        }
    }

    if (isLoading) {
        return <ActivityIndicator size="small" color={COLORS.brand.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    }
    return (
        // <View>
        //     <Text>ViewAll</Text>
        //     {AllTableData()}
        // </View>
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='dark-content'
                backgroundColor={COLORS.brand.white}
            />
            <Header
                onPress={() => navigation.openDrawer()}
            />
            <View style={styles.btnTextGroup}>
                <Text style={styles.pageTitle}>{isPageTitle}</Text>

                {isScreenName === 'Table' ?
                    <TouchableOpacity
                        onPress={tableImage}
                        style={[styles.btnView]}
                    >
                        <Text style={styles.btnText}>Upload New</Text>
                    </TouchableOpacity>
                    :
                    null
                }

                {isScreenName === 'Bar' ?
                    <TouchableOpacity
                        onPress={barImage}
                        style={[styles.btnView]}
                    >
                        <Text style={styles.btnText}>Upload New</Text>
                    </TouchableOpacity>
                    :
                    null
                }

                {isScreenName === 'Outside' ?
                    <TouchableOpacity
                        onPress={outsideImage}
                        style={[styles.btnView]}
                    >
                        <Text style={styles.btnText}>Upload New</Text>
                    </TouchableOpacity>
                    :
                    null
                }

                {isScreenName === 'Menu' ?
                    <TouchableOpacity
                        onPress={menuImage}
                        style={[styles.btnView]}
                    >
                        <Text style={styles.btnText}>Upload New</Text>
                    </TouchableOpacity>
                    :
                    null
                }

            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >

                {isScreenName === 'Table' ?
                    <>
                        {AllTableData()}
                    </>
                    :
                    null
                }

                {isScreenName === 'Bar' ?
                    <>
                        {AllTableData()}
                    </>
                    :
                    null
                }

                {isScreenName === 'Outside' ?
                    <>
                        {AllTableData()}
                    </>
                    :
                    null
                }

                {isScreenName === 'Menu' ?
                    <>
                        {AllTableData()}
                    </>
                    :
                    null
                }

            </ScrollView>

        </SafeAreaView>
    )
}

export default ViewAll

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
})