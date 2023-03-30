import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLORS, FONT, SHADOWS, SIZES } from '../../Constants';
import { SvgXml } from 'react-native-svg';
import Logo from '../../../assets/images/Logo';
import BackIcon from '../../../assets/images/BackIcon';
import { PrimaryBtn } from '../../Components/Buttons';
import { Input } from '../../Components/Inputs';
import { validatePhoneNum } from '../../Constants/methods';
import { baseUrl } from '../../Constants/Api';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = ({ navigation }) => {
    const [isLoading, setLoading] = useState(false);
    const [isMobileNumber, setMobileNumber] = useState('');
    const [isMobileNumberError, setMobileNumberError] = useState('');
    console.log('isMobileNumber--->', isMobileNumber);

    const submitData = async () => {
        try {
            if (isMobileNumber.trim().length < 10 || !validatePhoneNum(isMobileNumber)) {
                setMobileNumberError('Please enter vaild mobile number');
                return;
            }

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

            const response = await fetch(baseUrl + "Auth/checkUserExists", requestOptions);
            const json = await response.json();
            setLoading(false);
            console.log('json Login--->', json);
            if (json.status === "success") {
                alert(json.message)
                // alert(json.result.fldv_otp)
                navigation.navigate('OTP', {
                    user: {
                        mobileNumber: isMobileNumber,
                        waiter_id: json.result.fldi_waiter_id,
                        store_id: json.result.fldi_store_id,
                    }
                })
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
                {/* <View style={styles.backIconSection}>
                    <TouchableOpacity
                        style={styles.backIcon}
                    onPress={}
                    >
                        <SvgXml xml={BackIcon} width={22} height={28} />
                    </TouchableOpacity>
                </View> */}
            </View>

            <View style={styles.inputSection}>
                <SvgXml xml={Logo} width={123} height={40} style={{ marginVertical: 60, alignItems: 'center' }} />
                <Text style={styles.pageTitle}>Login</Text>
                <Input
                    label='Enter your mobile number'
                    placeholder='Enter your mobile number'
                    keyboardType="number-pad"
                    maxLength={10}
                    value={isMobileNumber}
                    setValue={setMobileNumber}
                />
                {isMobileNumberError ? <Text style={styles.errorText}>{isMobileNumberError}</Text> : null}
            </View>

            <View style={styles.bottomSection}>
                <PrimaryBtn
                    btnText='Request OTP'
                    // onPress={() => navigation.navigate('OTP', {
                    //     user: {
                    //         mobileNumber: isMobileNumber
                    //     }
                    // })}

                    onPress={submitData}
                />
            </View>
        </View>
    )
}

export default Login

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
    errorText: {
        width: windowWidth - 30,
        fontFamily: FONT.InterRegular,
        fontSize: SIZES.small,
        textAlign: 'left',
        lineHeight: 18,
        color: COLORS.brand.error,
    }
})