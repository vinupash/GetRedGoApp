import React, { useState, useEffect } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, View, TouchableOpacity, Dimensions, Modal, ActivityIndicator } from 'react-native'
import Header from '../../Components/Header';
import { COLORS, FONT, SHADOWS, SIZES } from '../../Constants';
import Card from '../../Components/Card'
import { SvgXml } from 'react-native-svg';
import Barcode from '../../../assets/images/Barcode';
import CloseIcon from '../../../assets/images/CloseIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import { GenerateQRApi, UserDataApi } from '../../Constants/ApiCall';
import UploadPictures from '../../../assets/images/UploadPictures';
import Gift from '../../../assets/images/Gift';
import Account from '../../../assets/images/Account';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import * as ImagePicker from 'react-native-image-crop-picker';
import RemotePushController from '../../Services/RemotePushController';
import { LocalNotification } from '../../Services/LocalPushController';
import Menu from '../../../assets/images/Menu';
import Logo from '../../../assets/images/Logo';

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
    const [isUserProfileName, setUserProfileName] = useState('');
    const isFocused = useIsFocused()

    useEffect(() => {
        fetchDataAsync();
    }, [isFocused]);

    const fetchDataAsync = async () => {
        setLoading(true)
        const userLognDetails = await AsyncStorage.getItem("userData");
        if (!userLognDetails) {
            // Alert.alert("Unable to fetch mobile number, Login again");
            return;
        }
        const transformedLoginData = JSON.parse(userLognDetails);
        console.log('transformedLoginData Navigation--->', transformedLoginData.waiter_id);
        const waiterId = transformedLoginData.waiter_id;
        const responseUserData = await UserDataApi(waiterId);
        setLoading(false)
        console.log('responseUserData ---->', responseUserData);
        setWaiter_id(transformedLoginData.waiter_id)
        setStore_id(transformedLoginData.store_id)
        if (responseUserData.status === true) {
            setUserProfileName(responseUserData.result.fldv_name)
            setUserPoints(responseUserData.result.fldf_points)
            setRegistered(responseUserData.registered)
            setUnregisterd(responseUserData.unregisterd)
            AsyncStorage.setItem(
                "userStoreDetails",
                JSON.stringify({
                    loginStatus: 1,
                    fldv_name: responseUserData.result.fldv_name,
                    fldv_store_name: responseUserData.result.fldv_store_name,
                })
            );
        } else {
            console.log(responseUserData.message)
        }
    };

    console.log('isUserPoints', isUserPoints, isRegistered, isUnregisterd);

    const boxNavigationArray = [
        {
            key: '2',
            title: 'My Rewards',
            screenName: 'My Rewards',
            icon: Gift,
        },
        {
            key: '3',
            title: 'My Customers',
            screenName: 'My Customers',
            icon: Account,
        },
    ];

    const NavigationScreenData = () => {
        return boxNavigationArray.map((NavigationInfoData, i) => {
            return (
                <TouchableOpacity
                    activeOpacity={0.85}
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
                    <View style={{ width: 32, height: 32, backgroundColor: COLORS.brand.primary, borderRadius: 30 / 2, justifyContent: 'center', alignItems: 'center' }}>
                        <SvgXml xml={NavigationInfoData.icon} width={20} height={20} />
                    </View>
                </TouchableOpacity>
            )
        })
    }

    const generateQR = async () => {
        try {
            setLoading(true);
            const response = await GenerateQRApi(isWaiter_id, isStore_id);
            setLoading(false);
            // console.log('json Dashboard generateQR--->', response.url);
            if (response.status === true) {
                setQR_Code(response.url)
            } else {
                alert(response.message)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    // const handleButtonPress = () => {
    //     LocalNotification()
    // }

    if (isLoading) {
        return <ActivityIndicator size="small" color={COLORS.brand.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='dark-content'
                backgroundColor={COLORS.brand.white}
            />
            {/* <Header
                onPress={() => navigation.openDrawer()}
            /> */}
            <View style={styles.headerBar}>
                <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ height: 40, width: 40, justifyContent: 'center' }}>
                    <SvgXml xml={Menu} width={28} height={28} />
                </TouchableOpacity>
                <SvgXml xml={Logo} width={75} height={24} />
                <View style={{ height: 40, width: 40 }}>
                </View>
            </View>
            <RemotePushController />
            <View style={{ width: windowWidth - 30, alignSelf: 'center' }}>
                <Text style={{ fontFamily: FONT.InterMedium, color: COLORS.brand.textColor, fontSize: SIZES.medium, marginTop: 10 }}>Hi, {isUserProfileName}</Text>
                <Text style={{ fontFamily: FONT.InterBold, color: COLORS.brand.black, fontSize: SIZES.mediumLarge, marginTop: 2, fontWeight: '800' }}>Your Point card</Text>
            </View>
            {/* <>
                {isLoading ? (
                    <ActivityIndicator size="small" color={COLORS.brand.primary} style={{ justifyContent: 'center', alignItems: 'center' }} />
                ) : (
                    <Card
                        userPoints={isUserPoints}
                        registerd={!isRegistered ? '0' : isRegistered}
                    />
                )}
            </> */}
            <Card
                userPoints={isUserPoints}
                registerd={!isRegistered ? '0' : isRegistered}
            />

            <View style={styles.menuSection}>
                <Text style={styles.sectionTitle}>Others</Text>
                <TouchableOpacity
                    activeOpacity={0.85}
                    style={[styles.menuSectionBox]}
                    onPress={() => navigation.navigate('HotelDetailsNavigation', {
                        screen: 'Hotel Details',
                        params: {
                            user_points: isUserPoints
                        }
                    })}
                >
                    <Text style={styles.menuSectionTitle}>Upload Pictures</Text>
                    <View style={{ width: 32, height: 32, backgroundColor: COLORS.brand.primary, borderRadius: 30 / 2, justifyContent: 'center', alignItems: 'center' }}>
                        <SvgXml xml={UploadPictures} width={20} height={20} />
                    </View>
                </TouchableOpacity>
                {NavigationScreenData()}
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.modalViewContent}>
                            <View style={styles.qrCodeBox}>
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
                            </View>
                            <Text style={styles.qrCodeText}>Scan to Reward</Text>
                            <TouchableOpacity
                                activeOpacity={0.85}
                                style={styles.btn}
                                onPress={generateQR}
                            >
                                <Text style={styles.btnText}>Regenerate QR code</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.85}
                            style={styles.blackBtn}
                            onPress={() => { setModalVisible(!modalVisible), fetchDataAsync() }}>
                            <SvgXml xml={CloseIcon} width={24} height={24} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity
                activeOpacity={0.85}
                style={styles.scanBtn}
                onPress={() => { setModalVisible(true); generateQR() }}
            // onPress={() => { handleButtonPress() }}

            >
                <Text style={{ textAlign: 'center', paddingHorizontal: 20, marginBottom: 10, fontFamily: FONT.InterRegular, fontSize: SIZES.font, lineHeight: 22, color: COLORS.brand.textColor }}>Note: Please collect the Cap/ crown of the Coca-Cola bottle for points validation</Text>
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
        width: windowWidth - 30,
        alignSelf: 'center',
        marginTop: 15,
    },
    menuSectionBox: {
        width: windowWidth - 30,
        alignSelf: 'center',
        height: 53,
        marginVertical: 8,
        ...SHADOWS.light,
        borderRadius: 10,
        backgroundColor: COLORS.brand.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    menuSectionTitle: {
        color: COLORS.brand.textColor,
        fontFamily: FONT.InterRegular,
        fontSize: SIZES.font
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
    },
    sectionTitle: {
        fontFamily: FONT.InterMedium,
        color: COLORS.brand.textColor,
        fontSize: SIZES.medium,
        marginBottom: 10
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
    }
})