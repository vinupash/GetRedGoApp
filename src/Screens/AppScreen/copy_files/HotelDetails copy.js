import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, ScrollView, TouchableOpacity, ImageBackground, ActivityIndicator, PermissionsAndroid } from 'react-native'
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
// import ImagePicker from 'react-native-image-crop-picker';
import * as ImagePicker from 'react-native-image-picker';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HotelDetails = ({ navigation }) => {
    const [isLoading, setLoading] = useState(false);
    const [isStoreName, setStoreName] = useState('');
    const [isImageType, setImageType] = useState('table');
    const [isTableImagePath, setTableImagePath] = useState('');
    const [isTableImageType, setTableImageType] = useState('');
    const [isWaiter_id, setWaiter_id] = useState('');
    const [isStore_id, setStore_id] = useState('');
    const [isUploadAllowedTable, setUploadAllowedTable] = useState('');
    const [isUploadAllowedBar, setUploadAllowedBar] = useState('');
    const [isUploadAllowedOutsite, setUploadAllowedOutsite] = useState('');
    const [isUploadAllowedMenu, setUploadAllowedMenu] = useState('');

    useEffect(() => {
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
        UploadAllowed()
    }, [])


    useEffect(() => {
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
                // console.log('json HotelDetails--->', json);
                setStoreName(json.result.fldv_store_name)
            } catch (error) {
                console.log(error.message);
            }
        }

        UserData()
    }, [])

    console.log(isWaiter_id, isStore_id, isImageType);

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

    const ImageUploadOutsite = async () => {
        try {
            setLoading(true);

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

    const ImageUploadMenu = async () => {
        try {
            setLoading(true);

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

    // const requestCameraPermission = async () => {
    //     try {
    //         const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.CAMERA,
    //             {
    //                 title: 'Cool Photo App Camera Permission',
    //                 message:
    //                     'Cool Photo App needs access to your camera ' +
    //                     'so you can take awesome pictures.',
    //                 buttonNeutral: 'Ask Me Later',
    //                 buttonNegative: 'Cancel',
    //                 buttonPositive: 'OK',
    //             },
    //         );
    //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //             console.log('You can use the camera');
    //         } else {
    //             console.log('Camera permission denied');
    //         }
    //     } catch (err) {
    //         console.warn(err);
    //     }
    // };

    const tableImage = async () => {
        try {
            setImageType('table')
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
                        // setImageType('table')
                        { ImageUploadTable() }
                    }
                }
            })
        } catch (error) {
            console.warn(error);
        }
    }

    const barImage = async () => {
        alert('cool')
        try {
            setImageType('bar')
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
                        // setImageType('bar')
                        ImageUploadBar()
                    }
                }
            })
        } catch (error) {
            console.warn(error);
        }
    }

    const outsideImage = async () => {
        try {
            setImageType('outsite')
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
                        // setImageType('outsite')
                        ImageUploadOutsite()
                    }
                }
            })
        } catch (error) {
            console.warn(error);
        }
    }

    const menuImage = async () => {
        try {
            setImageType('menu')
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
                        // setImageType('menu')
                        ImageUploadMenu()
                    }
                }
            })
        } catch (error) {
            console.warn(error);
        }
    }

    const notAllowed = () => {
        return alert('Not allowed')
    }

    if (isLoading) {
        return <ActivityIndicator size="small" color={COLORS.brand.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    }

    return (
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
                    <Text style={styles.pointsUser}>5</Text>
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
                                    <TouchableOpacity
                                        onPress={isUploadAllowedTable == 0 ? notAllowed : tableImage}
                                        style={[styles.btnUpload,
                                        {
                                            backgroundColor: isUploadAllowedTable == 0 ? COLORS.brand.error : '#1DB22E'
                                        }
                                        ]}
                                    >
                                        <Text style={styles.btnTextUpload}>Upload</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Text style={styles.cardTitle}>Last Uploaded</Text>
                                    <Text style={styles.cardText}>11 Feb 23</Text>
                                </View>
                            </View>

                        </View>

                        <View style={[styles.cardPointBox]}>
                            <SvgXml xml={Table} width={43} height={42} />
                            <TouchableOpacity
                                onPress={() => navigation.navigate('View All Table', {
                                    // pageDetails: {
                                    //     pageTitle: "All Tables",
                                    //     screenName: 'Table',
                                    //     imageType: 'table'
                                    // }
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
                                    {/* <TouchableOpacity
                                        onPress={isUploadAllowedBar == 0 ? notAllowed : barImage}
                                        style={[styles.btnUpload,
                                        {
                                            backgroundColor: isUploadAllowedBar == 0 ? COLORS.brand.error : '#1DB22E'
                                        }
                                        ]}
                                    >
                                        <Text style={styles.btnTextUpload}>Upload</Text>
                                    </TouchableOpacity> */}
                                    <TouchableOpacity
                                        onPress={barImage}
                                        style={[styles.btnUpload, { backgroundColor: COLORS.brand.error }]}
                                    >
                                        <Text style={styles.btnTextUpload}>Upload</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Text style={styles.cardTitle}>Last Uploaded</Text>
                                    <Text style={styles.cardText}>11 Feb 23</Text>
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
                                    <TouchableOpacity
                                        onPress={isUploadAllowedOutsite == 0 ? notAllowed : outsideImage}
                                        style={[styles.btnUpload,
                                        {
                                            backgroundColor: isUploadAllowedOutsite == 0 ? COLORS.brand.error : '#1DB22E'
                                        }
                                        ]}
                                    >
                                        <Text style={styles.btnTextUpload}>Upload</Text>
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity
                                        onPress={outsideImage}
                                        style={[styles.btnUpload, { backgroundColor: COLORS.brand.error }]}
                                    >
                                        <Text style={styles.btnTextUpload}>Upload</Text>
                                    </TouchableOpacity> */}
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Text style={styles.cardTitle}>Last Uploaded</Text>
                                    <Text style={styles.cardText}>11 Feb 23</Text>
                                </View>
                            </View>

                        </View>

                        <View style={[styles.cardPointBox]}>
                            <SvgXml xml={Outside} width={43} height={43} />
                            <TouchableOpacity
                                onPress={() => navigation.navigate('View All Outside', {
                                    // pageDetails: {
                                    //     pageTitle: "All Outsides",
                                    //     screenName: 'Outside',
                                    //     imageType: 'outside'
                                    // }
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
                                    <TouchableOpacity
                                        onPress={isUploadAllowedOutsite == 0 ? notAllowed : menuImage}
                                        style={[styles.btnUpload,
                                        {
                                            backgroundColor: isUploadAllowedOutsite == 0 ? COLORS.brand.error : '#1DB22E'
                                        }
                                        ]}
                                    >
                                        <Text style={styles.btnTextUpload}>Upload</Text>
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity
                                        onPress={menuImage}
                                        style={[styles.btnUpload, { backgroundColor: COLORS.brand.error }]}
                                    >
                                        <Text style={styles.btnTextUpload}>Upload</Text>
                                    </TouchableOpacity> */}
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Text style={styles.cardTitle}>Last Uploaded</Text>
                                    <Text style={styles.cardText}>11 Feb 23</Text>
                                </View>
                            </View>

                        </View>

                        <View style={[styles.cardPointBox]}>
                            <SvgXml xml={MenuIcon} width={32} height={42} />
                            <TouchableOpacity
                                onPress={() => navigation.navigate('View All Menu', {
                                    // pageDetails: {
                                    //     pageTitle: "All Menus",
                                    //     screenName: 'Menu',
                                    //     imageType: 'menu'
                                    // }
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

{/* <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <Text style={styles.text}>Inside</Text>
    </ImageBackground> */}