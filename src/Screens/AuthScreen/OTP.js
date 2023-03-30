import React, { useState, useEffect, useContext, useCallback } from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
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

const OTP = ({ navigation, route }) => {
    const { GetUserAsyncLoginData } = useContext(AuthContext);
    const isFocused = useIsFocused()
    const { user } = route.params;
    useEffect(() => {
        setMobileNumber(user.mobileNumber)
        setWaiter_id(user.waiter_id)
        setStore_id(user.store_id)
        GetUserAsyncLoginData()
    }, [isFocused])

    const [isLoading, setLoading] = useState(false);
    const [isMobileNumber, setMobileNumber] = useState('');
    const [isMobileOTP, setMobileOTP] = useState('');
    const [isMobileOTPError, setMobileOTPError] = useState(null);
    const [isWaiter_id, setWaiter_id] = useState('');
    const [isStore_id, setStore_id] = useState('');

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
            setLoading(true);
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Basic YWRtaW46Q0ByXjBuQCQxMiE=");
            myHeaders.append("Cookie", "off_cc=49bd3002dcbc1559ac7fad6a70f932b2a5e1950a");

            var formdata = new FormData();
            formdata.append("mobile", isMobileNumber);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            const response = await fetch(baseUrl + "Auth/resendotp", requestOptions);
            const json = await response.json();

            setLoading(false);
            console.log('json OTP--->', json);
            if (json.status === "success") {
                alert(json.message)
            } else {
                alert(json.message)
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
        try {

            if (!isMobileOTP) {
                setMobileOTPError('Please enter valid OTP')
            } else {
                setMobileOTPError(null)
            }
            setLoading(true);
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Basic YWRtaW46Q0ByXjBuQCQxMiE=");
            myHeaders.append("Cookie", "off_cc=49bd3002dcbc1559ac7fad6a70f932b2a5e1950a");

            var formdata = new FormData();
            formdata.append("otp", isMobileOTP);
            formdata.append("waiter_id", isWaiter_id);
            formdata.append("mobile", isMobileNumber);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            const response = await fetch(baseUrl + "Auth/validateotp", requestOptions);
            const json = await response.json();

            setLoading(false);
            console.log('json OTP--->', json);
            if (json.status === "success") {
                GetUserAsyncLoginData();
                alert(json.message)
                AsyncStorage.setItem(
                    "userData",
                    JSON.stringify({
                        loginStatusUser: 1,
                        userMobileNumber: isMobileNumber,
                        waiter_id: isWaiter_id,
                        loginStatus: json.result,
                        store_id: isStore_id,
                    })
                );
                GetUserAsyncLoginData();
            } else {
                alert(json.message)
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    if (isLoading) {
        return <ActivityIndicator size="small" color={COLORS.brand.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    }

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle='dark-content'
                backgroundColor={COLORS.brand.background}
            />
            <View style={styles.topSection}>
                <View style={styles.backIconSection}>
                    <TouchableOpacity
                        style={styles.backIcon}
                        onPress={navigation.goBack}
                    >
                        <SvgXml xml={BackIcon} width={22} height={28} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.inputSection}>
                <SvgXml xml={Logo} width={123} height={40} style={{ marginVertical: 60, alignItems: 'center' }} />
                <Text style={styles.pageTitle}>Enter the OTP</Text>
                <View style={styles.inputSectionBox}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.inputLabel}>We have sent it to +91 {userMobilenumbaer}</Text>
                        <TouchableOpacity onPress={navigation.goBack}><Text style={{ color: COLORS.brand.error }}> Change Number</Text></TouchableOpacity>
                    </View>
                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder="Enter OTP"
                            placeholderTextColor='#A3A3A3'
                            secureTextEntry={true}
                            value={isMobileOTP}
                            onChangeText={setMobileOTP}
                            maxLength={6}
                            keyboardType="number-pad"
                        />
                        {isMobileOTPError ? <Text style={styles.errorText}>{isMobileOTPError}</Text> : null}
                    </View>


                    {seconds === 0 ?
                        <>
                            {timer === 0 ?

                                <TouchableOpacity
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
                    // onPress={() => { userLogin() }}
                    onPress={submitData}
                // onPress={() => navigation.navigate('Enter Details', {
                //     user: {
                //         mobileNumber: isMobileNumber
                //     }
                // })}
                />
            </View>
        </View>
    )
}

export default OTP

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        flex: 1,
        height: windowHeight - 200,
        alignItems: 'center'
    },
    backIconSection: {
        width: windowWidth - 30,
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center',
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
        marginBottom: 14,
        textAlign: 'left',
        width: windowWidth - 30,
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
    }

})