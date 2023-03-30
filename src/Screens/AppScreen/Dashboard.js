import React, { useState, useEffect } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, View, TouchableOpacity, Dimensions, Modal, ActivityIndicator } from 'react-native'
import Header from '../../Components/Header';
import { COLORS, FONT, SHADOWS, SIZES } from '../../Constants';
import Card from '../../Components/Card'
import { SvgXml } from 'react-native-svg';
import Barcode from '../../../assets/images/Barcode';
// import QRCode from '../../../assets/images/QRCode';
import CloseIcon from '../../../assets/images/CloseIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { baseUrl } from '../../Constants/Api';
import QRCode from 'react-native-qrcode-svg';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Dashboard = ({ navigation }) => {
    const [isLoading, setLoading] = useState(false);
    const [isLoading1, setLoading1] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [isWaiter_id, setWaiter_id] = useState('');
    const [isStore_id, setStore_id] = useState('');
    const [isQR_Code, setQR_Code] = useState('');
    const [isUserPoints, setUserPoints] = useState('');
    const [isUnregisterd, setUnregisterd] = useState('');
    const [isRegistered, setRegistered] = useState('');

    const isFocused = useIsFocused()

    useEffect(() => {
        const GetUserAsyncLoginData = async () => {
            setLoading(true)
            const userLognDetails = await AsyncStorage.getItem("userData");
            if (!userLognDetails) {
                // Alert.alert("Unable to fetch mobile number, Login again");
                return;
            }
            setLoading(false)
            const transformedLoginData = JSON.parse(userLognDetails);
            // console.log('transformedLoginData Navigation--->', transformedLoginData);
            setWaiter_id(transformedLoginData.waiter_id)
            setStore_id(transformedLoginData.store_id)
        }
        GetUserAsyncLoginData()
        UserData()
    }, [isFocused])

    // useEffect(() => {
    //     UserData()
    // }, [])

    const UserData = async () => {
        try {
            setLoading1(true)
            const userLognDetails = await AsyncStorage.getItem("userData");
            if (!userLognDetails) {
                // Alert.alert("Unable to fetch mobile number, Login again");
                return;
            }
            setLoading1(false)
            const transformedLoginData = JSON.parse(userLognDetails);
            // console.log('transformedLoginData Navigation--->', transformedLoginData);
            setLoading1(true);
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
            setLoading1(false);
            console.log('json Dashboard UserData--->', json);
            if (json.status === true) {
                setUserPoints(json.result.fldf_points)
                setRegistered(json.registered)
                setUnregisterd(json.unregisterd)
                AsyncStorage.setItem(
                    "userStoreDetails",
                    JSON.stringify({
                        loginStatus: 1,
                        fldv_name: json.result.fldv_name,
                        fldv_store_name: json.result.fldv_store_name,
                    })
                );
            } else {
                console.log(json.message)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const boxNavigationArray = [
        {
            key: '1',
            title: 'My Customers',
            screenName: 'My Customers',
        },
        {
            key: '2',
            title: 'Upload Pictures',
            screenName: 'Hotel Details',
        },
    ];

    const NavigationScreenData = () => {
        return boxNavigationArray.map((NavigationInfoData, i) => {
            return (
                <TouchableOpacity
                    key={NavigationInfoData.key}
                    style={styles.menuSectionBox}
                    onPress={() => {
                        navigation.navigate(NavigationInfoData.screenName, {
                            userPoints: {
                                user_points: isUserPoints
                            }
                        })
                    }}
                >
                    <Text style={styles.menuSectionTitle}>{NavigationInfoData.title}</Text>
                </TouchableOpacity>
            )
        })
    }

    const generateQR = async () => {
        try {
            setLoading(true);
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Basic YWRtaW46Q0ByXjBuQCQxMiE=");
            myHeaders.append("Cookie", "off_cc=49bd3002dcbc1559ac7fad6a70f932b2a5e1950a");

            var formdata = new FormData();
            formdata.append("waiter_id", isWaiter_id);
            formdata.append("store_id", isStore_id);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            const response = await fetch(baseUrl + "user/generateNewScan", requestOptions);
            const json = await response.json();
            setLoading(false);
            console.log('json Dashboard generateQR--->', json.url);
            if (json.status === true) {
                setQR_Code(json.url)
            } else {
                alert(json.message)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    // useEffect(() => {
    //     const GetGenerateQR = async () => {
    //         try {
    //             setLoading(true)
    //             const userLognDetails = await AsyncStorage.getItem("userData");
    //             if (!userLognDetails) {
    //                 // Alert.alert("Unable to fetch mobile number, Login again");
    //                 return;
    //             }
    //             setLoading(false)
    //             const transformedLoginData = JSON.parse(userLognDetails);
    //             // console.log('transformedLoginData Navigation--->', transformedLoginData);

    //             setLoading(true);
    //             var myHeaders = new Headers();
    //             myHeaders.append("Authorization", "Basic YWRtaW46Q0ByXjBuQCQxMiE=");
    //             myHeaders.append("Cookie", "off_cc=49bd3002dcbc1559ac7fad6a70f932b2a5e1950a");

    //             var formdata = new FormData();
    //             formdata.append("waiter_id", transformedLoginData.waiter_id);
    //             formdata.append("store_id", transformedLoginData.store_id);

    //             var requestOptions = {
    //                 method: 'POST',
    //                 headers: myHeaders,
    //                 body: formdata,
    //                 redirect: 'follow'
    //             };

    //             const response = await fetch(baseUrl + "user/generateNewScan", requestOptions);
    //             const json = await response.json();
    //             setLoading(false);
    //             // console.log('json Dashboard GetGenerateQR--->', json.url);
    //             if (json.status === true) {
    //                 return setQR_Code(json.url)
    //             }
    //         } catch (error) {
    //             console.log(error.message);
    //         }
    //     }
    //     GetGenerateQR()
    // }, [])

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
            <>
                {isLoading1 ? (
                    <ActivityIndicator size="small" color={COLORS.brand.primary} style={{ justifyContent: 'center', alignItems: 'center' }} />
                ) : (
                    <Card
                        userPoints={isUserPoints}
                        registerd={!isRegistered ? '0' : isRegistered}
                        unregisterd={!isUnregisterd ? '0' : isUnregisterd}
                    />
                )}
            </>

            <View style={styles.menuSection}>
                {NavigationScreenData()}
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    // Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.modalViewContent}>
                            <View style={styles.qrCodeBox}>
                                {/* <SvgXml xml={QRCode} width={168} height={168} /> */}
                                {!isQR_Code ? null :
                                    <>
                                        {isLoading ? (
                                            <ActivityIndicator size="small" color={COLORS.brand.primary} style={{ justifyContent: 'center', alignItems: 'center' }} />
                                        ) : (
                                            <QRCode
                                                value={isQR_Code}
                                                size={170}
                                                logoBackgroundColor='transparent'
                                            />
                                        )}
                                    </>
                                }
                                {/* {isLoading ? (
                                    <ActivityIndicator size="small" color={COLORS.brand.primary} style={{ justifyContent: 'center', alignItems: 'center' }} />
                                ) : (
                                    <QRCode
                                        value="Just some string value"
                                        logo={{ uri: isQR_Code }}
                                        logoSize={200}
                                        logoBackgroundColor='transparent'
                                    />
                                )} */}
                            </View>
                            <Text style={styles.qrCodeText}>Scan to Reward</Text>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={generateQR}
                            >
                                <Text style={styles.btnText}>Regenerate QR code</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={styles.blackBtn}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <SvgXml xml={CloseIcon} width={24} height={24} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity
                style={styles.scanBtn}
                onPress={() => { setModalVisible(true); generateQR() }}
            >
                <View style={styles.btnCircle}>
                    <SvgXml xml={Barcode} height={35} width={35} />
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.brand.background
    },
    menuSection: {
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: 'space-between',
        width: windowWidth - 30,
        alignSelf: 'center',
        marginTop: 15,
    },
    menuSectionBox: {
        width: '48%',
        minHeight: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        paddingHorizontal: 10,
        paddingVertical: 16,
        borderRadius: 4,
        ...SHADOWS.light,
        marginHorizontal: 1,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        backgroundColor: COLORS.brand.background
    },
    menuSectionTitle: {
        color: COLORS.brand.textColor,
        fontSize: SIZES.medium,
        fontFamily: FONT.InterRegular
    },
    scanBtn: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    btnCircle: {
        width: 64,
        height: 64,
        borderRadius: 64 / 2,
        backgroundColor: COLORS.brand.primary,
        ...SHADOWS.light,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    modalViewContent: {
        paddingTop: 40,
        width: windowWidth - 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: COLORS.brand.white,
        minHeight: 400,
        borderRadius: 5,
        marginBottom: 20,
    },
    blackBtn: {
        width: 56,
        height: 56,
        borderRadius: 56 / 2,
        ...SHADOWS.light,
        backgroundColor: COLORS.brand.black,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    qrCodeBox: {
        width: 200,
        height: 200,
        ...SHADOWS.light,
        backgroundColor: COLORS.brand.white,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    qrCodeText: {
        color: COLORS.brand.textColor,
        fontFamily: FONT.InterRegular,
        fontSize: SIZES.medium,
        marginVertical: 20
    },
    btn: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        backgroundColor: COLORS.brand.primary,
        marginBottom: 5,
        ...SHADOWS.light
    },
    btnText: {
        color: COLORS.brand.white,
        fontFamily: FONT.InterRegular,
        fontSize: SIZES.medium,
    }
})