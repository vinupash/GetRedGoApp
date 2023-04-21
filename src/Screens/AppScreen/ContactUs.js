import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, ScrollView, ActivityIndicator, Animated, TouchableOpacity } from 'react-native'
import { PrimaryBtn } from '../../Components/Buttons';
import Header from '../../Components/Header'
import { CustomTextArea, Input } from '../../Components/Inputs';
import { COLORS, FONT, SHADOWS, SIZES } from '../../Constants'
import { baseUrl } from '../../Constants/Api';
import { validateEmail, validatePhoneNum } from '../../Constants/methods';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { SavefeedbackApi } from '../../Constants/ApiCall';
import Menu from '../../../assets/images/Menu';
import Logo from '../../../assets/images/Logo';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { SvgXml } from 'react-native-svg';

const ContactUs = ({ navigation }) => {
    const [isLoading, setLoading] = useState(false);
    const [isMobileNumber, setMobileNumber] = useState('');
    const [isUserName, setUserName] = useState('');
    const [isUserEmail, setUserEmail] = useState('');
    const [isMessage, setMessage] = useState('')
    const [isWaiter_id, setWaiter_id] = useState('');
    const [isStore_id, setStore_id] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccessMessage, setSuccessMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const isFocused = useIsFocused()

    useEffect(() => {
        const fetchDataAsync = async () => {
            setLoading(true)
            const userLognDetails = await AsyncStorage.getItem("userData");
            if (!userLognDetails) {
                // Alert.alert("Unable to fetch mobile number, Login again");
                return;
            }
            setLoading(false)
            const transformedStoreData = JSON.parse(userLognDetails);
            // console.log(transformedStoreData);
            setWaiter_id(transformedStoreData.waiter_id)
            setStore_id(transformedStoreData.store_id)
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

    const submitData = async () => {
        if (!isUserName) {
            handleErrorMsg()
            setErrorMessage('Please enter full name');
            return
        }
        if (isMobileNumber.trim().length < 10 || !validatePhoneNum(isMobileNumber)) {
            handleErrorMsg()
            setErrorMessage('Please enter vaild mobile number');
            return;
        }
        if (isUserEmail.trim().length == 0 || !validateEmail(isUserEmail)) {
            handleErrorMsg();
            setErrorMessage("Please enter vaild email address");
            return;
        }
        if (!isMessage) {
            handleErrorMsg()
            setErrorMessage('Please enter your message');
            return;
        }
        setLoading(true)
        const response = await SavefeedbackApi(isWaiter_id, isStore_id, isUserName, isMobileNumber, isUserEmail, isMessage);
        setLoading(false)
        console.log('response--->', response);
        if (response.status == true) {
            handleSuccessMsg()
            setSuccessMessage(response.message)
            setUserName('');
            setUserEmail('');
            setMobileNumber('');
            setMessage('')
        } else {
            handleErrorMsg()
            setErrorMessage(response.message)
        }
    };

    // if (isLoading) {
    //     return <ActivityIndicator size="small" color={COLORS.brand.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    // }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='dark-content'
                backgroundColor={COLORS.brand.white}
            />
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
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {/* <Text style={styles.pageTitle}>Get in Touch</Text> */}
                <View style={{
                    flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 8, width: windowWidth - 30,
                    alignSelf: 'center',
                }}>
                    <Text style={styles.pageTitle}>Get in Touch</Text>
                    {isLoading ? <ActivityIndicator size="small" color={COLORS.brand.primary} style={{ marginLeft: 5 }} /> : null}
                </View>
                <Text style={styles.pageSubTitle}>Have a query? Ask our team</Text>

                <View style={styles.inputSection}>
                    <Input
                        label='Enter Your Name'
                        placeholder='Enter Your Name'
                        value={isUserName}
                        setValue={setUserName}
                    />

                    <View style={{ marginTop: 20 }}>
                        <Input
                            label='Enter your mobile number'
                            placeholder='Enter your mobile number'
                            keyboardType="number-pad"
                            value={isMobileNumber}
                            setValue={setMobileNumber}
                            maxLength={10}
                        />
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Input
                            label='Email Address'
                            placeholder='Enter email address'
                            value={isUserEmail}
                            setValue={setUserEmail}
                        />
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <CustomTextArea
                            label='Message'
                            numberOfLines={4}
                            placeholder='Message'
                            value={isMessage}
                            setValue={setMessage}
                        />
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <PrimaryBtn
                            btnText='Submit'
                            onPress={submitData}
                        />
                    </View>

                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default ContactUs

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
    pageSubTitle: {
        marginBottom: 14,
        textAlign: 'left',
        width: windowWidth - 30,
        alignSelf: 'center',
        fontSize: SIZES.mediumLarge,
        fontFamily: FONT.InterBold,
        fontWeight: '700',
        color: COLORS.brand.textColor,
        marginBottom: 10
        // alignSelf: 'flex-start'
    },
    inputSection: {
        marginTop: 10,
        width: windowWidth - 30,
        alignSelf: 'center',
    },
    errorText: {
        fontFamily: FONT.InterRegular,
        fontSize: SIZES.small,
        textAlign: 'left',
        lineHeight: 18,
        color: COLORS.brand.error,
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
    }
})