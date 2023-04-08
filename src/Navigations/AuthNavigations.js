import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../Screens/AuthScreen/SplashScreen';
import Login from '../Screens/AuthScreen/Login';
import OTP from '../Screens/AuthScreen/OTP';
import EnterDetails from '../Screens/AuthScreen/EnterDetails';

const Stack = createStackNavigator();

const AuthNavigations = () => {

    const [isSplashScreen, setSplashScreen] = useState(true);
    useEffect(() => {
        setInterval(() => {
            setSplashScreen(false)
        }, 4000);
    }, [])

    return (
        <Stack.Navigator>
            {isSplashScreen ?
                (<Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                    options={{
                        headerShown: false,
                        animation: 'slide_from_right'
                    }} />)
                : null
            }
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="OTP"
                component={OTP}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="Enter Details"
                component={EnterDetails}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
        </Stack.Navigator>
    )
}

export default AuthNavigations;