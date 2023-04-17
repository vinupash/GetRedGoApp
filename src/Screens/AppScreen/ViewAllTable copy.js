import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, ScrollView, TouchableOpacity, Image, ActivityIndicator, PermissionsAndroid } from 'react-native'
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

const ViewAllTable = ({ navigation, route }) => {
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
    // const { pageDetails } = route.params;

    useEffect(() => {
        fetchDataAsync();
        setPoints(user_points)
    }, []);

    const fetchDataAsync = async () => {
        setLoading(true)
        const userLognDetails = await AsyncStorage.getItem("userData");
        const transformedLoginData = JSON.parse(userLognDetails);
        const userStoreDetails = await AsyncStorage.getItem("userStoreDetails");
        const transformedStoreData = JSON.parse(userStoreDetails);
        // console.log('transformedStoreData --->', transformedStoreData);
        // console.log('transformedLoginData Hotel--->', transformedLoginData.waiter_id);
        const waiterId = transformedLoginData.waiter_id;
        const storeId = transformedLoginData.waiter_id;
        setWaiter_id(waiterId)
        setStore_id(storeId)
        const responseUploadAllowed = await UploadAllowedApi(waiterId, storeId);
        setLoading(false)
        setStoreName(transformedStoreData.fldv_store_name)
        // user upload date and time
        // setTtableUploadDate(responseUploadAllowed.tableUpload)
        // setBarDate(responseUploadAllowed.barUpload)
        // setOutsiteDate(responseUploadAllowed.outsideUpload)
        // setMenuDate(responseUploadAllowed.menuUpload)

        // user upload approved
        setUploadAllowedTable(responseUploadAllowed.table)
        // setUploadAllowedBar(responseUploadAllowed.bar)
        // setUploadAllowedOutsite(responseUploadAllowed.outside)
        // setUploadAllowedMenu(responseUploadAllowed.menu)
        // console.log('responseUploadAllowed--->', responseUploadAllowed);
    };

    useEffect(() => {
        UserAsyncStorageData()
        UserData()
        UploadAllowed()
    }, [])

    const UserAsyncStorageData = async () => {
        setLoading(true)
        const userLognDetails = await AsyncStorage.getItem("userData");
        if (!userLognDetails) {
            // Alert.alert("Unable to fetch mobile number, Login again");
            return;
        }
        const transformedLoginData = JSON.parse(userLognDetails);
        setLoading(false)
        console.log('transformedLoginData UploadPictures--->', transformedLoginData);
        setWaiter_id(transformedLoginData.waiter_id);
        setStore_id(transformedLoginData.store_id);
    }

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

            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Basic YWRtaW46Q0ByXjBuQCQxMiE=");

            var formdata = new FormData();
            formdata.append("store_id", transformedLoginData.store_id);
            formdata.append("imagetype", 'table');
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

    const UploadAllowed = async () => {
        try {
            setLoading(true);
            const userLognDetails = await AsyncStorage.getItem("userData");
            if (!userLognDetails) {
                // Alert.alert("Unable to fetch mobile number, Login again");
                return;
            }
            const transformedLoginData = JSON.parse(userLognDetails);
            console.log('transformedLoginData UploadPictures--->', transformedLoginData);
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Basic YWRtaW46Q0ByXjBuQCQxMiE=");
            myHeaders.append("Cookie", "off_cc=de024eb00ef8108547e846800b561484bb084e69");

            var formdata = new FormData();
            formdata.append("waiter_id", transformedLoginData.waiter_id);
            formdata.append("store_id", transformedLoginData.store_id);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            const response = await fetch(baseUrl + "image/isUploadAllowed", requestOptions);
            const json = await response.json();
            setLoading(false);
            console.log('json UploadAllowed--->', json);
            setUploadAllowed(json.table)
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

    const ImageUpload = async () => {
        try {
            setLoading(true);
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Basic YWRtaW46Q0ByXjBuQCQxMiE=");

            var formdata = new FormData();
            formdata.append("waiter_id", isWaiter_id);
            formdata.append("store_id", isStore_id);
            formdata.append("imagetype", 'table');
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

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    },
                );
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else return true;
    };

    const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                    },
                );
                // If WRITE_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                alert('Write permission err', err);
            }
            return false;
        } else return true;
    };

    const captureImageTable = async (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            videoQuality: 'low',
            durationLimit: 30, //Video max duration in seconds
            saveToPhotos: true,
        };
        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
            launchCamera(options, (response) => {
                console.log('Response--->', response);

                if (response.didCancel) {
                    alert('User cancelled camera picker');
                    return;
                } else if (response.errorCode == 'camera_unavailable') {
                    alert('Camera not available on device');
                    return;
                } else if (response.errorCode == 'permission') {
                    alert('Permission not satisfied');
                    return;
                } else if (response.errorCode == 'others') {
                    alert(response.errorMessage);
                    return;
                } else {
                    const resitem = response && response.assets[0]
                    const img = {
                        uri: resitem.uri,
                        name: resitem.fileName,
                        type: resitem.type
                    }
                    console.log('img--->', img);
                    console.log('setImage--->', response.assets[0].uri);
                    setTableImagePath(response.assets[0].uri)
                    setTableImageType(img)
                    ImageUpload()
                }

            });
        }
    };

    const renderFooter = () => {
        return (
            <View style={styles.footer}>
                {offset <= isTotalPages ? (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={UserData}
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

    const notAllowed = () => {
        return alert('Not allowed')
    }

    // if (isLoading) {
    //     return <ActivityIndicator size="small" color={COLORS.brand.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    // }
    return (

        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='dark-content'
                backgroundColor={COLORS.brand.white}
            />
            <Header
                onPress={() => navigation.openDrawer()}
            />
            <View style={styles.btnTextGroup}>
                {/* <Text style={styles.pageTitle}>All Tables</Text> */}

                <View style={{
                    // width: windowWidth - 30,
                    alignSelf: 'center',
                    marginBottom: 14,
                    marginTop: 20,
                    flexDirection: 'row',
                }}>
                    <Text style={styles.pageTitle}>All Tables</Text>
                    {isLoading ? (
                        <ActivityIndicator
                            size="small" color={COLORS.brand.primary}
                            style={{ marginLeft: 8 }} />
                    ) : null}
                </View>

                {isUploadAllowed == 0 ?
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
                        onPress={() => captureImageTable('photo')}
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

            </ScrollView>

        </SafeAreaView>
    )
}

export default ViewAllTable

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
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    loadMoreBtn: {
        padding: 10,
        backgroundColor: COLORS.brand.primary,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
