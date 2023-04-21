import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions, TouchableOpacity, TextInput, ActivityIndicator, Animated } from 'react-native';
import { COLORS, FONT, SHADOWS, SIZES } from '../../Constants';
import { SvgXml } from 'react-native-svg';
import Logo from '../../../assets/images/Logo';
import BackIcon from '../../../assets/images/BackIcon';
import { PrimaryBtn } from '../../Components/Buttons';
import { Input } from '../../Components/Inputs';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { useIsFocused } from '@react-navigation/native';
import { AuthContext } from '../../Context/AuthContex';
import { baseUrl } from '../../Constants/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoWhite from '../../../assets/images/LogoWhite';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { ReSendOtpApi, ValidateOtpApi } from '../../Constants/ApiCall';

const OTP = ({ navigation, route }) => {
    const { ValidateOtpApi } = useContext(AuthContext);
    const isFocused = useIsFocused()
    const { user } = route.params;
    console.log('user--->', user);
    useEffect(() => {
        setMobileNumber(user.mobileNumber)
        setWaiter_id(user.waiter_id)
        setStore_id(user.store_id)
    }, [isFocused])

    const [isLoading, setLoading] = useState(false);
    const [isMobileNumber, setMobileNumber] = useState('');
    const [isMobileOTP, setMobileOTP] = useState('');
    const [isMobileOTPError, setMobileOTPError] = useState(null);
    const [isWaiter_id, setWaiter_id] = useState('');
    const [isStore_id, setStore_id] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccessMessage, setSuccessMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;

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
        }, 3000);
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
        }, 3000);
    };

    const [timer, setTimer] = useState(0);
    const timeOutCallback = useCallback(() => setTimer(currTimer => currTimer - 1), []);
    useEffect(() => {
        timer > 0 && setTimeout(timeOutCallback, 1000);
    }, [timer, timeOutCallback]);

    var hideMobileNumaber = isMobileNumber;
    var userMobilenumbaer = hideMobileNumaber.replace(/.(?=.{3})/g, '*');

    const [seconds, setSeconds] = useState(60);
    const timeOutCallback1 = useCallback(() => setSeconds(currTimer => currTimer - 1), []);
    useEffect(() => {
        seconds > 0 && setTimeout(timeOutCallback1, 1000);
    }, [seconds, timeOutCallback1]);

    const ReSendOtp = async () => {
        try {
            const response = await ReSendOtpApi(isMobileNumber);
            console.log('json OTP--->', response);
            if (response.status === "success") {
                handleSuccessMsg();
                setSuccessMessage(response.message)
            } else {
                handleErrorMsg()
                setErrorMessage(response.message)
                alert(response.message)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const resetTimer = async () => {
        try {
            if (!timer) {
                setTimer(60);
            }
            console.log('resetTimer');
        } catch (error) {
            console.log(error.message);
        }
    };

    const submitData = async () => {
        if (!isMobileOTP) {
            handleErrorMsg()
            setErrorMessage('Please enter valid OTP')
            return
        }
        setLoading(true)
        const response = await ValidateOtpApi(isMobileOTP, isWaiter_id, isMobileNumber, isStore_id);
        setLoading(false)
        console.log('response OTP screen--->', response);
        if (response.status === "success") {
            handleSuccessMsg()
            setSuccessMessage(response.message)
            alert(response.message)
            // AsyncStorage.setItem(
            //     "userData",
            //     JSON.stringify({
            //         loginStatusUser: 1,
            //         userMobileNumber: isMobileNumber,
            //         waiter_id: isWaiter_id,
            //         loginStatus: response.result,
            //         store_id: isStore_id,
            //     })
            // );
        } else {
            handleErrorMsg()
            setErrorMessage(json.message)
        }
    };

    if (isLoading) {
        return <ActivityIndicator size="small" color={COLORS.brand.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    }

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle='dark-content'
                backgroundColor={COLORS.brand.background}
            />
            {/* {isLoading ? <ActivityIndicator size="small" color={COLORS.brand.primary} style={{ justifyContent: 'center', alignItems: 'center' }} /> : null} */}
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
            {/* <View style={styles.backIconSection}>
                <View style={{ width: windowWidth - 30, alignSelf: 'center' }}>
                    <TouchableOpacity
                        style={styles.backIcon}
                        onPress={navigation.goBack}
                    >
                        <SvgXml xml={BackIcon} width={22} height={28} />
                    </TouchableOpacity>
                </View>
            </View> */}
            <View style={styles.inputSection}>
                <SvgXml xml={LogoWhite} width={123} height={40} style={{ alignItems: 'center' }} />
            </View>


            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>

                <View style={{ width: windowWidth - 30, alignSelf: 'center' }}>
                    {/* <Text style={styles.pageTitle}>Enter the OTP</Text> */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 10, marginTop: 24 }}>
                        <Text style={styles.pageTitle}>Enter the OTP</Text>
                        {isLoading ? <ActivityIndicator size="small" color={COLORS.brand.primary} style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 10 }} /> : null}
                    </View>
                    <View style={styles.inputSectionBox}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.inputLabel}>We have sent it to +91 {userMobilenumbaer}</Text>
                            <TouchableOpacity activeOpacity={0.85} onPress={navigation.goBack}><Text style={{ color: COLORS.brand.error }}> Change Number</Text></TouchableOpacity>
                        </View>

                        <OTPInputView
                            style={{ width: '100%', height: 70 }}
                            pinCount={6}
                            borderStyleBase
                            autoFocusOnLoad
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            onCodeFilled={(code => {
                                console.log(`Code is ${code}, you are good to go!`)
                                setMobileOTP(code)
                            })}
                            secureTextEntry={true}
                        />

                        {seconds === 0 ?
                            <>
                                {timer === 0 ?

                                    <TouchableOpacity
                                        activeOpacity={0.85}
                                        style={{ marginTop: 10, marginLeft: 5 }}
                                        onPress={() => { resetTimer(); ReSendOtp() }}
                                    >
                                        <Text style={{
                                            fontFamily: FONT.InterRegular,
                                            fontSize: SIZES.small,
                                            color: COLORS.brand.labelText,
                                            fontWeight: '400'
                                        }}>Didn’t receive OTP? <Text style={{ color: COLORS.brand.error }}>Resend</Text></Text>
                                    </TouchableOpacity>
                                    :
                                    <Text style={styles.timeLabel}>Time Remaining <Text style={{ color: COLORS.brand.error }}>{timer}s</Text></Text>}
                            </>
                            :
                            <Text style={styles.timeLabel}>Time Remaining <Text style={{ color: COLORS.brand.error }}>{seconds}s</Text></Text>
                        }
                    </View>
                </View>

                <View style={styles.bottomSection}>
                    <PrimaryBtn
                        btnText='Verify'
                        onPress={submitData}
                    />
                </View>
            </View>


        </View>
    )
}

export default OTP

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: COLORS.brand.background
    },
    topSection: {
        width: windowWidth,
        height: 50,
    },
    bottomSection: {
        width: windowWidth,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputSection: {
        alignItems: 'center',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.brand.primary
    },
    backIconSection: {
        width: windowWidth,
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.brand.primary
    },
    backIcon: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        ...SHADOWS.light,
        backgroundColor: '#FAFAFA',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pageTitle: {
        // marginBottom: 10,
        // marginTop: 24,
        textAlign: 'left',
        // width: windowWidth - 30,
        alignSelf: 'center',
        fontSize: SIZES.extraLarge,
        fontFamily: FONT.InterBold,
        fontWeight: '700',
        color: COLORS.brand.textColor
        // alignSelf: 'flex-start'
    },
    inputSectionBox: {
        width: windowWidth - 30,
    },
    inputLabel: {
        fontFamily: FONT.InterRegular,
        fontSize: SIZES.small,
        textAlign: 'left',
        lineHeight: 18,
        color: COLORS.brand.labelText,
        marginBottom: 5,
    },
    inputBox: {
        height: 45,
        width: '100%',
        borderWidth: 1,
        backgroundColor: COLORS.brand.white,
        borderColor: '#E0E0E0',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 2,
    },
    inputStyle: {
        fontFamily: FONT.InterRegular,
        fontSize: SIZES.font,
        color: COLORS.brand.textColor,
        flex: 1,
    },
    timeLabel: {
        fontFamily: FONT.InterRegular,
        fontSize: SIZES.small,
        color: COLORS.brand.labelText,
        fontWeight: '400',
        marginTop: 10,
        marginLeft: 5
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
    underlineStyleBase: {
        height: 53,
        width: 51,
        borderWidth: 1,
        borderRadius: 5,
        fontFamily: FONT.InterRegular,
        fontSize: SIZES.font,
        color: COLORS.brand.textColor,
        backgroundColor: COLORS.brand.white,
        borderColor: '#E0E0E0',
    },

})