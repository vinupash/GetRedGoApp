import React, { useState, useEffect } from 'react';
// Import required components
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Platform,
    PermissionsAndroid,
    ActivityIndicator,
    Dimensions,
    StatusBar,
    ScrollView,
    ImageBackground
} from 'react-native';
import {
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';
import { SvgXml } from 'react-native-svg';
import Bar from '../../../assets/images/Bar';
import Menu from '../../../assets/images/Menu';
import MenuIcon from '../../../assets/images/MenuIcon';
import Outside from '../../../assets/images/Outside';
import Table from '../../../assets/images/Table';
import Header from '../../Components/Header'
import { COLORS, FONT, SHADOWS, SIZES } from '../../Constants'
import assets from '../../Constants/assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../../Constants/Api';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { useIsFocused } from '@react-navigation/native';

const HotelDetails = ({ navigation }) => {
    const [isLoading, setLoading] = useState(false);
    const [isWaiter_id, setWaiter_id] = useState('');
    const [isStore_id, setStore_id] = useState('');
    const [isImageType, setImageType] = useState('');
    const [isTableImagePath, setTableImagePath] = useState(null);
    const [isTableImageType, setTableImageType] = useState('');
    const [isUploadAllowedTable, setUploadAllowedTable] = useState('');
    const [isUploadAllowedBar, setUploadAllowedBar] = useState('');
    const [isUploadAllowedOutsite, setUploadAllowedOutsite] = useState('');
    const [isUploadAllowedMenu, setUploadAllowedMenu] = useState('');
    const [isStoreName, setStoreName] = useState('');
    const [isPoints, setPoints] = useState('');
    const isFocused = useIsFocused()

    useEffect(() => {
        UserAsyncStorageData()
        UserData()
        UploadAllowed()
    }, [isFocused])
    // console.log('isWaiter_id', isWaiter_id, isStore_id, isTableImagePath, isTableImageType);

    const UserAsyncStorageData = async () => {
        try {
            setLoading(true)
            const userLognDetails = await AsyncStorage.getItem("userData");
            if (!userLognDetails) {
                // Alert.alert("Unable to fetch mobile number, Login again");
                return;
            }
            setLoading(false)
            const transformedLoginData = JSON.parse(userLognDetails);
            console.log('transformedLoginData UploadPictures--->', transformedLoginData);
            setWaiter_id(transformedLoginData.waiter_id);
            setStore_id(transformedLoginData.store_id);

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
        setImageType('table')
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

                // if (response.didCancel) {
                //     alert('User cancelled camera picker');
                //     return;
                // } else if (response.errorCode == 'camera_unavailable') {
                //     alert('Camera not available on device');
                //     return;
                // } else if (response.errorCode == 'permission') {
                //     alert('Permission not satisfied');
                //     return;
                // } else if (response.errorCode == 'others') {
                //     alert(response.errorMessage);
                //     return;
                // }

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
                        console.log('img--->', img);
                        console.log('setImage--->', response.assets[0].uri);
                        setTableImagePath(response.assets[0].uri)
                        setTableImageType(img)
                        setImageType('table')
                        ImageUploadTable()
                    }
                }

                // if (!response.uri) {
                //     const resitem = response && response.assets[0]
                //     const img = {
                //         uri: resitem.uri,
                //         name: resitem.fileName,
                //         type: resitem.type
                //     }
                //     console.log('img--->', img);
                //     console.log('setImage--->', response.assets[0].uri);
                //     setTableImagePath(response.assets[0].uri)
                //     setTableImageType(img)
                //     setImageType('table')
                //     { ImageUploadTable() }
                // }

            });
        }
    };

    const captureImageBar = async (type) => {
        setImageType('bar')
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

                // if (response.didCancel) {
                //     alert('User cancelled camera picker');
                //     return;
                // } else if (response.errorCode == 'camera_unavailable') {
                //     alert('Camera not available on device');
                //     return;
                // } else if (response.errorCode == 'permission') {
                //     alert('Permission not satisfied');
                //     return;
                // } else if (response.errorCode == 'others') {
                //     alert(response.errorMessage);
                //     return;
                // }

                // if (!response.uri) {
                //     const resitem = response && response.assets[0]
                //     const img = {
                //         uri: resitem.uri,
                //         name: resitem.fileName,
                //         type: resitem.type
                //     }
                //     console.log('img--->', img);
                //     console.log('setImage--->', response.assets[0].uri);
                //     setTableImagePath(response.assets[0].uri)
                //     setTableImageType(img)
                //     setImageType('bar')
                //     { ImageUploadTable() }
                // }

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
                        console.log('img--->', img);
                        console.log('setImage--->', response.assets[0].uri);
                        setTableImagePath(response.assets[0].uri)
                        setTableImageType(img)
                        setImageType('bar')
                        ImageUploadBar()
                    }
                }

            });
        }
    };

    const captureImageOutsite = async (type) => {
        setImageType('outsite')
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
                }

                if (!response.uri) {
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
                    setImageType('outsite')
                    { ImageUploadTable() }
                }

            });
        }
    };

    const captureImageMenu = async (type) => {
        setImageType('menu')
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
                }

                if (!response.uri) {
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
                    setImageType('menu')
                    { ImageUploadTable() }
                }

            });
        }
    };

    const UserData = async () => {
        try {
            setLoading(true)
            const userLognDetails = await AsyncStorage.getItem("userData");
            if (!userLognDetails) {
                // Alert.alert("Unable to fetch mobile number, Login again");
                return;
            }
            setLoading(false)
            const transformedLoginData = JSON.parse(userLognDetails);
            // console.log('transformedLoginData UploadPictures--->', transformedLoginData);
            setWaiter_id(transformedLoginData.waiter_id);
            setStore_id(transformedLoginData.store_id);
            setLoading(true);
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Basic YWRtaW46Q0ByXjBuQCQxMiE=");
            myHeaders.append("Cookie", "off_cc=49bd3002dcbc1559ac7fad6a70f932b2a5e1950a");

            var formdata = new FormData();
            formdata.append("waiter_id", transformedLoginData.waiter_id);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            const response = await fetch(baseUrl + "user/getuserInfo", requestOptions);
            const json = await response.json();
            setLoading(false);
            console.log('json HotelDetails--->', json);
            setStoreName(json.result.fldv_store_name)
            setPoints(json.result.fldf_points)
        } catch (error) {
            console.log(error.message);
        }
    }

    const UploadAllowed = async () => {
        try {
            setLoading(true);
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Basic YWRtaW46Q0ByXjBuQCQxMiE=");
            myHeaders.append("Cookie", "off_cc=de024eb00ef8108547e846800b561484bb084e69");

            var formdata = new FormData();
            formdata.append("waiter_id", isWaiter_id);
            formdata.append("store_id", isStore_id);

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
            setUploadAllowedTable(json.table)
            setUploadAllowedBar(json.bar)
            setUploadAllowedOutsite(json.outside)
            setUploadAllowedMenu(json.menu)
        } catch (error) {
            console.log(error.message);
        }
    }


    const ImageUploadTable = async () => {
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

    const ImageUploadBar = async () => {
        try {
            setLoading(true);

            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Basic YWRtaW46Q0ByXjBuQCQxMiE=");

            var formdata = new FormData();
            formdata.append("waiter_id", isWaiter_id);
            formdata.append("store_id", isStore_id);
            formdata.append("imagetype", 'bar');
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


    if (isLoading) {
        return <ActivityIndicator size="small" color={COLORS.brand.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    }

    return (
        // <SafeAreaView style={{ flex: 1 }}>
        //     <Text style={styles.titleText}>
        //         Example of Image Picker in React Native
        //     </Text>
        //     <View style={styles.container}>

        //         <Text style={styles.textStyle}>{isTableImagePath}</Text>
        //         <TouchableOpacity
        //             activeOpacity={0.5}
        //             style={styles.buttonStyle}
        //             onPress={() => captureImageTable('photo')}>
        //             <Text style={styles.textStyle}>
        //                 Launch Camera for Image
        //             </Text>
        //         </TouchableOpacity>

        //     </View>
        // </SafeAreaView>
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='dark-content'
                backgroundColor={COLORS.brand.white}
            />
            <Header
                onPress={() => navigation.openDrawer()}
            />
            <Text style={styles.pageTitle}>{isStoreName}</Text>
            <View style={styles.pointsUserBox}>
                <View style={styles.pointBox}>
                    <Text style={styles.pointsUser}>{isPoints}</Text>
                    <Text style={styles.pointsText}>Pts</Text>
                </View>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.inputSection}>
                    <Text style={styles.dateDetailsText}>Pictures</Text>

                    <ImageBackground style={styles.cardSection} source={assets.cardBg} resizeMode="cover">
                        <View style={{
                            padding: 10,
                            flex: 1
                        }}>
                            <Text style={styles.cardUserName}>Table</Text>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <View style={{ width: '50%' }}>

                                    {isUploadAllowedTable == 0 ?
                                        <TouchableOpacity
                                            // onPress={notAllowed}
                                            style={[styles.btnUpload,
                                            {
                                                backgroundColor: '#C5C5C5'
                                            }
                                            ]}
                                        >
                                            <Text style={styles.btnTextUpload}>Upload</Text>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity
                                            onPress={() => captureImageTable('photo')}
                                            style={[styles.btnUpload,
                                            {
                                                backgroundColor: COLORS.brand.error
                                            }
                                            ]}
                                        >
                                            <Text style={styles.btnTextUpload}>Upload</Text>
                                        </TouchableOpacity>
                                    }

                                </View>
                                <View style={{ width: '50%' }}>
                                    {/* <Text style={styles.cardTitle}>Last Uploaded</Text>
                                    <Text style={styles.cardText}>11 Feb 23</Text> */}
                                </View>
                            </View>

                        </View>

                        <View style={[styles.cardPointBox]}>
                            <SvgXml xml={Table} width={43} height={42} />
                            <TouchableOpacity
                                onPress={() => navigation.navigate('View All Table', {
                                })}
                                style={[styles.btnView]}
                            >
                                <Text style={styles.btnText}>View All</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>

                    <ImageBackground style={styles.cardSection} source={assets.cardBg} resizeMode="cover">
                        <View style={{
                            padding: 10,
                            flex: 1
                        }}>
                            <Text style={styles.cardUserName}>Bar</Text>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <View style={{ width: '50%' }}>
                                    {isUploadAllowedBar == 0 ?
                                        <TouchableOpacity
                                            // onPress={notAllowed}
                                            style={[styles.btnUpload,
                                            {
                                                backgroundColor: '#C5C5C5'
                                            }
                                            ]}
                                        >
                                            <Text style={styles.btnTextUpload}>Upload</Text>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity
                                            onPress={() => captureImageBar('photo')}
                                            style={[styles.btnUpload,
                                            {
                                                backgroundColor: COLORS.brand.error
                                            }
                                            ]}
                                        >
                                            <Text style={styles.btnTextUpload}>Upload</Text>
                                        </TouchableOpacity>
                                    }
                                    {/* <TouchableOpacity
                                        onPress={() => captureImageBar('photo')}
                                        style={[styles.btnUpload,
                                        {
                                            backgroundColor: COLORS.brand.error
                                        }
                                        ]}
                                    >
                                        <Text style={styles.btnTextUpload}>Upload</Text>
                                    </TouchableOpacity> */}
                                </View>
                                <View style={{ width: '50%' }}>
                                    {/* <Text style={styles.cardTitle}>Last Uploaded</Text>
                                    <Text style={styles.cardText}>11 Feb 23</Text> */}
                                </View>
                            </View>

                        </View>

                        <View style={[styles.cardPointBox]}>
                            <SvgXml xml={Bar} width={43} height={38} />
                            <TouchableOpacity
                                onPress={() => navigation.navigate('View All Bar', {
                                })}
                                style={[styles.btnView]}
                            >
                                <Text style={styles.btnText}>View All</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>

                    <ImageBackground style={styles.cardSection} source={assets.cardBg} resizeMode="cover">
                        <View style={{
                            padding: 10,
                            flex: 1
                        }}>
                            <Text style={styles.cardUserName}>Outsite</Text>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <View style={{ width: '50%' }}>
                                    {isUploadAllowedOutsite == 0 ?
                                        <TouchableOpacity
                                            // onPress={notAllowed}
                                            style={[styles.btnUpload,
                                            {
                                                backgroundColor: '#C5C5C5'
                                            }
                                            ]}
                                        >
                                            <Text style={styles.btnTextUpload}>Upload</Text>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity
                                            onPress={() => captureImageOutsite('photo')}
                                            style={[styles.btnUpload,
                                            {
                                                backgroundColor: COLORS.brand.error
                                            }
                                            ]}
                                        >
                                            <Text style={styles.btnTextUpload}>Upload</Text>
                                        </TouchableOpacity>
                                    }
                                    {/* <TouchableOpacity
                                        onPress={() => captureImageOutsite('photo')}
                                        style={[styles.btnUpload,
                                        {
                                            backgroundColor: COLORS.brand.error
                                        }
                                        ]}
                                    >
                                        <Text style={styles.btnTextUpload}>Upload</Text>
                                    </TouchableOpacity> */}
                                </View>
                                <View style={{ width: '50%' }}>
                                    {/* <Text style={styles.cardTitle}>Last Uploaded</Text>
                                    <Text style={styles.cardText}>11 Feb 23</Text> */}
                                </View>
                            </View>

                        </View>

                        <View style={[styles.cardPointBox]}>
                            <SvgXml xml={Outside} width={43} height={43} />
                            <TouchableOpacity
                                onPress={() => navigation.navigate('View All Outside', {
                                })}
                                style={[styles.btnView]}
                            >
                                <Text style={styles.btnText}>View All</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>

                    <ImageBackground style={styles.cardSection} source={assets.cardBg} resizeMode="cover">
                        <View style={{
                            padding: 10,
                            flex: 1
                        }}>
                            <Text style={styles.cardUserName}>Menu</Text>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <View style={{ width: '50%' }}>
                                    {isUploadAllowedOutsite == 0 ?
                                        <TouchableOpacity
                                            // onPress={notAllowed}
                                            style={[styles.btnUpload,
                                            {
                                                backgroundColor: '#C5C5C5'
                                            }
                                            ]}
                                        >
                                            <Text style={styles.btnTextUpload}>Upload</Text>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity
                                            // onPress={() => captureImageMenu('photo')}
                                            onPress={() => navigation.navigate('View All Menu', {

                                            })}
                                            style={[styles.btnUpload,
                                            {
                                                backgroundColor: COLORS.brand.error
                                            }
                                            ]}
                                        >
                                            <Text style={styles.btnTextUpload}>Upload</Text>
                                        </TouchableOpacity>
                                    }
                                    {/* <TouchableOpacity
                                        onPress={() => captureImageMenu('photo')}
                                        style={[styles.btnUpload,
                                        {
                                            backgroundColor: COLORS.brand.error
                                        }
                                        ]}
                                    >
                                        <Text style={styles.btnTextUpload}>Upload</Text>
                                    </TouchableOpacity> */}
                                </View>
                                <View style={{ width: '50%' }}>
                                    {/* <Text style={styles.cardTitle}>Last Uploaded</Text>
                                    <Text style={styles.cardText}>11 Feb 23</Text> */}
                                </View>
                            </View>

                        </View>

                        <View style={[styles.cardPointBox]}>
                            <SvgXml xml={MenuIcon} width={32} height={42} />
                            <TouchableOpacity
                                onPress={() => navigation.navigate('View All Menu', {

                                })}
                                style={[styles.btnView]}
                            >
                                <Text style={styles.btnText}>View All</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HotelDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.brand.background
    },
    pageTitle: {
        marginBottom: 8,
        textAlign: 'left',
        width: windowWidth - 30,
        alignSelf: 'center',
        fontSize: SIZES.extraLarge,
        fontFamily: FONT.InterBold,
        fontWeight: 700,
        color: COLORS.brand.textColor,
        marginTop: 20
    },
    pointsUserBox: {
        width: windowWidth - 30,
        alignSelf: 'center',

    },
    pointBox: {
        width: 60,
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.brand.success,
        borderRadius: 3,
        ...SHADOWS.light
    },
    pointsUser: {
        fontWeight: 600,
        fontFamily: FONT.InterBold,
        color: COLORS.brand.white,
        fontSize: SIZES.medium
    },
    pointsText: {
        fontSize: SIZES.base,
        fontWeight: 300,
        fontFamily: FONT.InterRegular,
        color: COLORS.brand.white,
        marginLeft: 5
    },
    inputSection: {
        marginTop: 10,
        width: windowWidth - 30,
        alignSelf: 'center',
    },
    cardSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 96,
        marginBottom: 10,
        ...SHADOWS.light,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        width: windowWidth - 30,
        alignSelf: 'center',
        margin: 6
    },
    cardPointBox: {
        width: '30%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardUserName: {
        fontSize: SIZES.medium,
        fontWeight: 800,
        fontFamily: FONT.InterBold,
        marginBottom: 10,
        color: COLORS.brand.textColor
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
    btnView: {
        borderWidth: 1,
        borderColor: '#3D3D3D',
        backgroundColor: COLORS.brand.white,
        ...SHADOWS.light,
        marginTop: 6,
        width: 66,
        height: 26,
        borderRadius: 26 / 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        fontFamily: FONT.InterRegular,
        color: COLORS.brand.textColor,
        fontSize: SIZES.small,
    },
    btnUpload: {
        width: 66,
        height: 26,
        backgroundColor: '#C5C5C5',
        borderRadius: 26 / 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnTextUpload: {
        fontFamily: FONT.InterRegular,
        color: COLORS.brand.white,
        fontSize: SIZES.small,
    },
    dateDetailsText: {
        fontFamily: FONT.InterRegular,
        color: COLORS.brand.textColor,
        fontSize: SIZES.small,
    },
})