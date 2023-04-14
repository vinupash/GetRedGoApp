import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions, TouchableOpacity, Keyboard } from 'react-native';
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

const EnterDetails = ({ navigation, route }) => {
    const { userLogin } = useContext(AuthContext);
    const isFocused = useIsFocused()
    const { user } = route.params;
    useEffect(() => {
        setMobileNumber(user.mobileNumber)
    }, [isFocused])

    const [isMobileNumber, setMobileNumber] = useState('');
    const [isUserFullName, setUserFullName] = useState('')
    const [isStoreName, setStoreName] = useState('')
    const [isCity, setCity] = useState('')
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const SaveUserData = async () => {
        try {

        } catch (error) {
            console.log(error.message);
        }
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
                        activeOpacity={0.85}
                        style={styles.backIcon}
                        onPress={navigation.goBack}
                    >
                        <SvgXml xml={BackIcon} width={22} height={28} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.inputSection}>
                <SvgXml xml={Logo} width={123} height={40} style={{ marginVertical: 60, alignItems: 'center' }} />
                <Text style={styles.pageTitle}>Enter basic details</Text>
                <Input
                    label='Full Name'
                    placeholder='Full Name'
                    maxLength={10}
                    value={isUserFullName}
                    setValue={setUserFullName}
                />

                <View style={{ marginTop: 10 }}>
                    <Input
                        label='Restaurant / Store'
                        placeholder='Restaurant / Store'
                        value={isStoreName}
                        setValue={setStoreName}
                    />
                </View>

                <View style={{ marginTop: 10 }}>
                    <Input
                        label='City'
                        placeholder='City'
                        value={isCity}
                        setValue={setCity}
                    />
                </View>
            </View>

            {!isKeyboardVisible ?
                <View style={styles.bottomSection}>
                    <PrimaryBtn
                        btnText='Save'
                        onPress={() => { userLogin() }}
                    // onPress={() => navigation.navigate('OTP', {
                    //     user: {
                    //         mobileNumber: isMobileNumber
                    //     }
                    // })}
                    />
                </View>
                :
                null
            }


        </View>
    )
}

export default EnterDetails

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
    }
})