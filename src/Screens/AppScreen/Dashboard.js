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
    }, []);

    const fetchDataAsync = async () => {
        setLoading(true)
        const userLognDetails = await AsyncStorage.getItem("userData");
        const transformedLoginData = JSON.parse(userLognDetails);
        // console.log('transformedLoginData Navigation--->', transformedLoginData.waiter_id);
        const waiterId = transformedLoginData.waiter_id;
        const responseUserData = await UserDataApi(waiterId);
        setLoading(false)
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

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='dark-content'
                backgroundColor={COLORS.brand.white}
            />
            <Header
                onPress={() => navigation.openDrawer()}
            />

            <View style={{ width: windowWidth - 30, alignSelf: 'center' }}>
                <Text style={{ fontFamily: FONT.InterMedium, color: COLORS.brand.textColor, fontSize: SIZES.medium, marginTop: 10 }}>Hi, {isUserProfileName}</Text>
                <Text style={{ fontFamily: FONT.InterBold, color: COLORS.brand.black, fontSize: SIZES.mediumLarge, marginTop: 2, fontWeight: '800' }}>Your Point card</Text>
            </View>
            <>
                {isLoading1 ? (
                    <ActivityIndicator size="small" color={COLORS.brand.primary} style={{ justifyContent: 'center', alignItems: 'center' }} />
                ) : (
                    <Card
                        userPoints={isUserPoints}
                        registerd={!isUnregisterd ? '0' : isUnregisterd}
                    />
                )}
            </>

            <View style={styles.menuSection}>
                <Text style={styles.sectionTitle}>Others</Text>
                <TouchableOpacity
                    style={styles.menuSectionBox}
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
                                style={styles.btn}
                                onPress={generateQR}
                            >
                                <Text style={styles.btnText}>Regenerate QR code</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={styles.blackBtn}
                            onPress={() => { setModalVisible(!modalVisible), fetchDataAsync() }}>
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
    }
})