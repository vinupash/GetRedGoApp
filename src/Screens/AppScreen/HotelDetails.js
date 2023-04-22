import React, { useState, useEffect, useRef } from 'react';
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
    ImageBackground,
    Animated
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
import { useRoute } from '@react-navigation/native';
import { ImageUploadBarApi, ImageUploadOutsiteApi, ImageUploadTableApi, UploadAllowedApi } from '../../Constants/ApiCall';
import moment from 'moment';
import * as ImagePicker from 'react-native-image-crop-picker';
import Logo from '../../../assets/images/Logo';

const HotelDetails = ({ navigation, route }) => {
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
    const { user_points } = route.params;
    const routepage = useRoute();
    const [isTableUploadDate, setTtableUploadDate] = useState('')
    const [isBarDate, setBarDate] = useState('')
    const [isOutsiteDate, setOutsiteDate] = useState('')
    const [isMenuDate, setMenuDate] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccessMessage, setSuccessMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        fetchDataAsync();
        setPoints(user_points)
    }, [isFocused]);

    const fetchDataAsync = async () => {
        setLoading(true)
        const userLognDetails = await AsyncStorage.getItem("userData");
        if (!userLognDetails) {
            // Alert.alert("Unable to fetch mobile number, Login again");
            return;
        }
        const transformedLoginData = JSON.parse(userLognDetails);
        const userStoreDetails = await AsyncStorage.getItem("userStoreDetails");
        if (!userStoreDetails) {
            // Alert.alert("Unable to fetch mobile number, Login again");
            return;
        }
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
        setTtableUploadDate(responseUploadAllowed.tableUpload)
        setBarDate(responseUploadAllowed.barUpload)
        setOutsiteDate(responseUploadAllowed.outsideUpload)
        setMenuDate(responseUploadAllowed.menuUpload)

        // user upload approved
        setUploadAllowedTable(responseUploadAllowed.table)
        setUploadAllowedBar(responseUploadAllowed.bar)
        setUploadAllowedOutsite(responseUploadAllowed.outside)
        setUploadAllowedMenu(responseUploadAllowed.menu)
        console.log('responseUploadAllowed--->', responseUploadAllowed);
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

    const ImageUploadTableApi = (isWaiter_id, isStore_id, isTableImageType, isTableImagePath) => {
        console.log("isTableImageType ", isTableImageType)
        console.log("isTableImagePath ", isTableImagePath)
        setLoading(true)
        try {
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

            fetch(baseUrl + "image/uploadImage", requestOptions)
                .then(res => {
                    return res;
                }).then((data) => {
                    return data.json()
                }).then((dataJson) => {
                    // fetchDataAsync();
                    setLoading(false)
                    console.log("dataJson ", dataJson);
                    // handleSuccessMsg()
                    // setSuccessMessage(dataJson.message);
                    if (dataJson.status === true) {
                        fetchDataAsync();
                        handleSuccessMsg()
                        setSuccessMessage(dataJson.message);
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

    const captureImageTable = async (type) => {
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

            ImageUploadTableApi(isWaiter_id, isStore_id, img, image.path)
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

    const ImageUploadOutSiteApi = (isWaiter_id, isStore_id, isTableImageType, isTableImagePath) => {
        console.log("isTableImageType ", isTableImageType)
        console.log("isTableImagePath ", isTableImagePath)
        setLoading(true)
        try {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Basic YWRtaW46Q0ByXjBuQCQxMiE=");

            var formdata = new FormData();
            formdata.append("waiter_id", isWaiter_id);
            formdata.append("store_id", isStore_id);
            formdata.append("imagetype", 'outside');
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
                    setLoading(false)
                    console.log("dataJson ", dataJson);
                    // handleSuccessMsg()
                    // setSuccessMessage(dataJson.message);
                    if (dataJson.status === true) {
                        fetchDataAsync();
                        handleSuccessMsg()
                        setSuccessMessage(dataJson.message);
                        // alert(dataJson.message)
                    } else {
                        handleErrorMsg()
                        setErrorMessage(dataJson.message)
                        // alert(dataJson.message)
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

            ImageUploadOutSiteApi(isWaiter_id, isStore_id, img, image.path)
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

    const ImageUploadMenuApi = (isWaiter_id, isStore_id, isTableImageType, isTableImagePath) => {
        console.log("isTableImageType ", isTableImageType)
        console.log("isTableImagePath ", isTableImagePath)
        setLoading(true)
        try {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Basic YWRtaW46Q0ByXjBuQCQxMiE=");

            var formdata = new FormData();
            formdata.append("waiter_id", isWaiter_id);
            formdata.append("store_id", isStore_id);
            formdata.append("imagetype", 'menu');
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
                    setLoading(false)
                    console.log("dataJson ", dataJson);
                    // handleSuccessMsg()
                    // setSuccessMessage(dataJson.message);
                    if (dataJson.status === true) {
                        fetchDataAsync();
                        handleSuccessMsg()
                        setSuccessMessage(dataJson.message);
                        // alert(dataJson.message)
                    } else {
                        handleErrorMsg()
                        setErrorMessage(dataJson.message)
                        // alert(dataJson.message)
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

    const captureImageMenu = async (type) => {
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

            ImageUploadMenuApi(isWaiter_id, isStore_id, img, image.path)
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

    const ImageUploadBarApi = (isWaiter_id, isStore_id, isTableImageType, isTableImagePath) => {
        console.log("isTableImageType ", isTableImageType)
        console.log("isTableImagePath ", isTableImagePath)
        setLoading(true)
        try {
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

            fetch(baseUrl + "image/uploadImage", requestOptions)
                .then(res => {
                    return res;
                }).then((data) => {
                    return data.json()
                }).then((dataJson) => {
                    // fetchDataAsync();
                    setLoading(false)
                    console.log("dataJson ", dataJson);
                    // handleSuccessMsg()
                    // setSuccessMessage(dataJson.message);
                    if (dataJson.status === true) {
                        fetchDataAsync();
                        handleSuccessMsg()
                        setSuccessMessage(dataJson.message);
                        // alert(dataJson.message)
                    } else {
                        handleErrorMsg()
                        setErrorMessage(dataJson.message)
                        // alert(dataJson.message)
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

    const captureImageBar = async (type) => {
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

            ImageUploadBarApi(isWaiter_id, isStore_id, img, image.path)
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
    //     return <ActivityIndicator size='small' color={COLORS.brand.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(52, 52, 52, 0.8)' }} />
    // }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='dark-content'
                backgroundColor={COLORS.brand.white}
            />
            {isLoading ?
                <View style={styles.loading}>
                    <ActivityIndicator size='small' color={COLORS.brand.primary} />
                </View>
                : null}
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
            {/* <Header
                onPress={() => navigation.openDrawer()}
            /> */}

            <View style={styles.headerBar}>
                <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ height: 40, width: 40, justifyContent: 'center' }}>
                    <SvgXml xml={Menu} width={28} height={28} />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('Dashboard')}
                >
                    <SvgXml xml={Logo} width={75} height={24} />
                </TouchableOpacity>
                <View style={{ height: 40, width: 40 }}>
                </View>
            </View>
            <View style={{
                flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 8, width: windowWidth - 30,
                alignSelf: 'center',
            }}>
                <Text style={styles.pageTitle}>{isStoreName}</Text>
                {/* {isLoading ? <ActivityIndicator size="small" color={COLORS.brand.primary} style={{ marginLeft: 5 }} /> : null} */}
            </View>
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
                                            activeOpacity={0.85}
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
                                            activeOpacity={0.85}
                                            onPress={() => { captureImageTable('photo') }}
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
                                    <Text style={styles.cardTitle}>Last Uploaded</Text>
                                    <Text style={styles.cardText}>{isTableUploadDate}</Text>
                                </View>
                            </View>

                        </View>

                        <View style={[styles.cardPointBox]}>
                            <SvgXml xml={Table} width={43} height={42} />
                            <TouchableOpacity
                                activeOpacity={0.85}
                                onPress={() => navigation.navigate('HotelDetailsNavigation', {
                                    screen: 'View All Table',
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
                                            activeOpacity={0.85}
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
                                            activeOpacity={0.85}
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
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Text style={styles.cardTitle}>Last Uploaded</Text>
                                    <Text style={styles.cardText}>{isBarDate}</Text>
                                </View>
                            </View>

                        </View>

                        <View style={[styles.cardPointBox]}>
                            <SvgXml xml={Bar} width={43} height={38} />
                            <TouchableOpacity
                                activeOpacity={0.85}
                                // onPress={() => navigation.navigate('View All Bar', {
                                // })}
                                onPress={() => navigation.navigate('HotelDetailsNavigation', {
                                    screen: 'View All Bar',
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
                            <Text style={styles.cardUserName}>Outside</Text>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <View style={{ width: '50%' }}>
                                    {isUploadAllowedOutsite == 0 ?
                                        <TouchableOpacity
                                            activeOpacity={0.85}
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
                                            activeOpacity={0.85}
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

                                </View>
                                <View style={{ width: '50%' }}>
                                    <Text style={styles.cardTitle}>Last Uploaded</Text>
                                    <Text style={styles.cardText}>{isOutsiteDate}</Text>
                                </View>
                            </View>

                        </View>

                        <View style={[styles.cardPointBox]}>
                            <SvgXml xml={Outside} width={43} height={43} />
                            <TouchableOpacity
                                activeOpacity={0.85}
                                // onPress={() => navigation.navigate('View All Outside', {
                                // })}
                                onPress={() => navigation.navigate('HotelDetailsNavigation', {
                                    screen: 'View All Outside',
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
                            <Text style={styles.cardUserName}>Menu (Combo)</Text>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <View style={{ width: '50%' }}>
                                    {isUploadAllowedMenu == 0 ?
                                        <TouchableOpacity
                                            activeOpacity={0.85}
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
                                            activeOpacity={0.85}
                                            onPress={() => captureImageMenu('photo')}
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
                                    <Text style={styles.cardTitle}>Last Uploaded</Text>
                                    <Text style={styles.cardText}>{isMenuDate}</Text>
                                </View>
                            </View>

                        </View>

                        <View style={[styles.cardPointBox]}>
                            <SvgXml xml={MenuIcon} width={32} height={42} />
                            <TouchableOpacity
                                activeOpacity={0.85}
                                onPress={() => navigation.navigate('HotelDetailsNavigation', {
                                    screen: 'View All Menu',
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
        // marginBottom: 8,
        textAlign: 'left',
        // width: windowWidth - 30,
        alignSelf: 'center',
        fontSize: SIZES.extraLarge,
        fontFamily: FONT.InterBold,
        fontWeight: 700,
        color: COLORS.brand.textColor,
        // marginTop: 20
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
    headerBar: {
        height: 56,
        width: windowWidth,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#FFFFFF',
        ...SHADOWS.medium,
        marginBottom: 5,
        flexDirection: 'row'
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
    }
})