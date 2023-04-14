import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(false);
    const [isUserLoginStatus, setUserLoginStatus] = useState(false)

    const GetUserAsyncLoginData = async () => {
        setLoading(true)
        const userLognDetails = await AsyncStorage.getItem("userData");
        if (!userLognDetails) {
            // Alert.alert("Unable to fetch mobile number, Login again");
            return;
        }
        setLoading(false)
        const transformedLoginData = JSON.parse(userLognDetails);
        // console.log('transformedLoginData Navigation--->', transformedLoginData);
        setUserLoginStatus(transformedLoginData.loginStatus)

    }

    useEffect(() => {
        GetUserAsyncLoginData()
    }, [])

    const userLogout = () => {
        setLoading(true)
        setUserLoginStatus(null)
        AsyncStorage.removeItem('userData')
        setLoading(false)
    }

    return (
        <AuthContext.Provider value={{ isLoading, userLogout, isUserLoginStatus, GetUserAsyncLoginData }}>
            {children}
        </AuthContext.Provider>
    )
}

