import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, ScrollView, ActivityIndicator } from 'react-native'
import { PrimaryBtn } from '../../Components/Buttons';
import Header from '../../Components/Header'
import { CustomTextArea, Input } from '../../Components/Inputs';
import { COLORS, FONT, SIZES } from '../../Constants'
import { baseUrl } from '../../Constants/Api';
import { validateEmail, validatePhoneNum } from '../../Constants/methods';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ContactUs = ({ navigation }) => {
    const [isLoading, setLoading] = useState(false);
    const [isMobileNumber, setMobileNumber] = useState('');
    const [isMobileNumberError, setMobileNumberError] = useState(null);
    const [isUserName, setUserName] = useState('');
    const [isUserNameError, setUserNameError] = useState(null);
    const [isUserEmail, setUserEmail] = useState('');
    const [isUserEmailError, setUserEmailError] = useState(null);
    const [isMessage, setMessage] = useState('')
    const [isMessageError, setMessageError] = useState(null)
    const [isWaiter_id, setWaiter_id] = useState('');
    const [isStore_id, setStore_id] = useState('');

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
            console.log('transformedLoginData Navigation--->', transformedLoginData);
            setWaiter_id(transformedLoginData.waiter_id)
            setStore_id(transformedLoginData.store_id)
        }
        GetUserAsyncLoginData()
    }, [isFocused])

    const submitData = async () => {
        try {

            if (isUserName === '') {
                setUserNameError('Please enter full name');
            } else {
                setUserNameError(null);
            }

            if (isMobileNumber.trim().length < 10 || !validatePhoneNum(isMobileNumber)) {
                setMobileNumberError('Please enter vaild mobile number');
            } else {
                setMobileNumberError(null);
            }

            if (isUserEmail.trim().length == 0 || !validateEmail(isUserEmail)) {
                setUserEmailError("Please enter vaild email address");
            } else {
                setUserEmailError(null);
            }

            if (isMessage === '') {
                setMessageError('Please enter your message');
            } else {
                setMessageError(null);
            }

            setLoading(true);
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Basic YWRtaW46Q0ByXjBuQCQxMiE=");
            myHeaders.append("Cookie", "off_cc=49bd3002dcbc1559ac7fad6a70f932b2a5e1950a");

            var formdata = new FormData();
            formdata.append("waiter_id", isWaiter_id);
            formdata.append("store_id", isStore_id);
            formdata.append("fldv_name", isUserName);
            formdata.append("fldv_mobile", isMobileNumber);
            formdata.append("fldv_email", isUserEmail);
            formdata.append("fldt_msg", isMessage);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            const response = await fetch(baseUrl + "feedback/savefeedback", requestOptions);
            const json = await response.json();
            setLoading(false);
            console.log('json ContactUs--->', json);
            if (json.status === true) {
                alert(json.message)
                setUserName(null);
                setUserEmail(null);
                setMobileNumber(null);
                setMessage(null)
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
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='dark-content'
                backgroundColor={COLORS.brand.white}
            />
            <Header
                onPress={() => navigation.openDrawer()}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.pageTitle}>Get in Touch</Text>
                <Text style={styles.pageSubTitle}>Have a query? Ask our team</Text>

                <View style={styles.inputSection}>
                    <Input
                        label='Enter Your Name'
                        placeholder='Enter Your Name'
                        value={isUserName}
                        setValue={setUserName}
                    />
                    {isUserNameError ? <Text style={styles.errorText}>{isUserNameError}</Text> : null}

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
                    {isMobileNumberError ? <Text style={styles.errorText}>{isMobileNumberError}</Text> : null}

                    <View style={{ marginTop: 20 }}>
                        <Input
                            label='Email Address'
                            placeholder='Enter email address'
                            value={isUserEmail}
                            setValue={setUserEmail}
                        />
                    </View>
                    {isUserEmailError ? <Text style={styles.errorText}>{isUserEmailError}</Text> : null}

                    <View style={{ marginTop: 20 }}>
                        <CustomTextArea
                            label='Message'
                            numberOfLines={4}
                            placeholder='Message'
                            value={isMessage}
                            setValue={setMessage}
                        />
                    </View>
                    {isMessageError ? <Text style={styles.errorText}>{isMessageError}</Text> : null}

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
        marginBottom: 10,
        textAlign: 'left',
        width: windowWidth - 30,
        alignSelf: 'center',
        fontSize: SIZES.extraLarge,
        fontFamily: FONT.InterBold,
        fontWeight: '700',
        color: COLORS.brand.textColor,
        marginTop: 20
        // alignSelf: 'flex-start'
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
    }
})