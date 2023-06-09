import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions, ActivityIndicator, Animated } from 'react-native';
import { COLORS, FONT, SHADOWS, SIZES } from '../../Constants';
import { SvgXml } from 'react-native-svg';
import Logo from '../../../assets/images/Logo';
import { PrimaryBtn } from '../../Components/Buttons';
import { Input } from '../../Components/Inputs';
import { validatePhoneNum } from '../../Constants/methods';
import { LoginApi } from '../../Constants/ApiCall';
import LogoWhite from '../../../assets/images/LogoWhite';
import crashlytics from '@react-native-firebase/crashlytics'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import RemotePushController from '../../Services/RemotePushController';

const Login = ({ navigation }) => {
    const [isLoading, setLoading] = useState(false);
    const [isMobileNumber, setMobileNumber] = useState('');
    const [isDeviceTokan, setDeviceTokan] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccessMessage, setSuccessMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    // useEffect(() => {
    //     crashlytics().log('App mounted.')
    // }, [])

    useEffect(() => {
        const fetchDataAsync = async () => {
            setLoading(true)
            const userDeviceTokan = await AsyncStorage.getItem("userDeviceTokan");
            setLoading(false)
            const transformedLoginData = JSON.parse(userDeviceTokan);
            console.log('transformedLoginData login in', transformedLoginData.deviceTokan);
            setDeviceTokan(transformedLoginData.deviceTokan)
        };
        fetchDataAsync();
    }, []);



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

    console.log('isMobileNumber--->', isMobileNumber);

    const submitData = async () => {
        if (isMobileNumber.trim().length < 10 || !validatePhoneNum(isMobileNumber)) {
            handleErrorMsg()
            setErrorMessage('Please enter vaild mobile number');
            return;
        }
        setLoading(true)
        const response = await LoginApi(isMobileNumber, isDeviceTokan);
        setLoading(false)
        console.log('response--->', response);
        if (response.status === "success") {
            handleSuccessMsg()
            setSuccessMessage(response.message)
            // alert(response.message)
            navigation.navigate('OTP', {
                user: {
                    mobileNumber: isMobileNumber,
                    waiter_id: response.result.fldi_waiter_id,
                    store_id: response.result.fldi_store_id,
                }
            })
        } else {
            handleErrorMsg()
            setErrorMessage(response.message)
        }
    };

    // if (isLoading) {
    //     return <ActivityIndicator size="small" color={COLORS.brand.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    // }

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle='dark-content'
                backgroundColor={COLORS.brand.background}
            />
            <RemotePushController />
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
            <View style={styles.inputSection}>
                <SvgXml xml={LogoWhite} width={123} height={40} style={{ alignItems: 'center' }} />
            </View>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                <View style={{ width: windowWidth - 30, alignSelf: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 10, marginTop: 24 }}>
                        <Text style={styles.pageTitle}>Login</Text>
                        {isLoading ? <ActivityIndicator size="small" color={COLORS.brand.primary} style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 10 }} /> : null}
                    </View>
                    <Input
                        label='Enter your mobile number'
                        placeholder='Enter your mobile number'
                        keyboardType="number-pad"
                        maxLength={10}
                        value={isMobileNumber}
                        setValue={setMobileNumber}
                    />
                </View>

                <View style={styles.bottomSection}>
                    <PrimaryBtn
                        btnText='Request OTP'
                        onPress={submitData}
                    // onPress={() => { crashlytics().crash() }}
                    />
                </View>
            </View>
        </View>
    )
}

export default Login

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
        // marginBottom: 10,
        // marginTop: 24,
        textAlign: 'left',
        // width: windowWidth - 30,
        alignSelf: 'center',
        fontSize: SIZES.extraLarge,
        fontFamily: FONT.InterBold,
        fontWeight: '700',
        color: COLORS.brand.textColor,
        alignSelf: 'flex-start',
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
})