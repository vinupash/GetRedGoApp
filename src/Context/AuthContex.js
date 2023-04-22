import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(false);
    const [isUserLoginStatus, setUserLoginStatus] = useState(false)
    const BASE_URL_V1 = 'https://demo.crayoninfotech.com/cocacola/api/';
    const BASE_URL = 'https://www.theofferclub.com/cocacolaspinandwin/api/';
    // const GetUserAsyncLoginData = async () => {
    //     setLoading(true)
    //     const userLognDetails = await AsyncStorage.getItem("userData");
    //     if (!userLognDetails) {
    //         // Alert.alert("Unable to fetch mobile number, Login again");
    //         return;
    //     }
    //     setLoading(false)
    //     const transformedLoginData = JSON.parse(userLognDetails);
    //     // console.log('transformedLoginData Navigation--->', transformedLoginData);
    //     setUserLoginStatus(transformedLoginData.loginStatus)

    // }

    // useEffect(() => {
    //     GetUserAsyncLoginData()
    // }, [])

    const ValidateOtpApi = async (isMobileOTP, isWaiter_id, isMobileNumber, isStore_id) => {
        console.log(isMobileOTP, isWaiter_id, isMobileNumber);
        setLoading(true)
        try {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Basic YWRtaW46Q0ByXjBuQCQxMiE=");

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

            const response = await fetch(BASE_URL + "Auth/validateotp", requestOptions);
            const json = await response.json();
            // console.log('response AuthContext--->', json);
            setLoading(false)
            if (json.status === "success") {
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
                AsyncStorage.setItem('UserLoginStatus',
                    JSON.stringify({
                        LoginStatus: 1,
                        UserLoginStatus: json.result,
                    })
                )
                setUserLoginStatus(json.result)
                // AsyncStorage.setItem("UserLoginStatus", json.result);
            } else {
                // handleErrorMsg()
                // setErrorMessage(json.message)
                console.log(json.message);
            }
            return json;
        } catch (error) {
            console.error(error);
        }
    };

    const userLogout = () => {
        setLoading(true)
        setUserLoginStatus(null)
        AsyncStorage.removeItem('userData')
        AsyncStorage.removeItem('UserLoginStatus')
        setLoading(false)
    }

    const isUserLogged = async () => {
        try {
            // setLoading(true)
            let UserLoginStatus = await AsyncStorage.getItem('UserLoginStatus')
            // console.log('UserLoginStatus cool--->', UserLoginStatus);
            if (!UserLoginStatus) {
                // Alert.alert("Unable to fetch mobile number, Login again");
                return;
            }
            const transformedLoginData = JSON.parse(UserLoginStatus);
            // setLoading(false)
            console.log('transformedLoginData AuthContext--->', transformedLoginData);
            setUserLoginStatus(transformedLoginData.UserLoginStatus)
        } catch (error) {
            console.log(`isUserLogged in ${error}`);
        }
    }

    useEffect(() => {
        isUserLogged()
    }, [])

    return (
        <AuthContext.Provider value={{ isLoading, userLogout, isUserLoginStatus, ValidateOtpApi }}>
            {children}
        </AuthContext.Provider>
    )
}

