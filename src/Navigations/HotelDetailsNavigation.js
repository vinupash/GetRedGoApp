
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HotelDetails from '../Screens/AppScreen/HotelDetails';
import ViewAllTable from '../Screens/AppScreen/ViewAllTable';
import ViewAllBar from '../Screens/AppScreen/ViewAllBar';
import ViewAllMenu from '../Screens/AppScreen/ViewAllMenu';
import ViewAllOutside from '../Screens/AppScreen/ViewAllOutside';
import ViewAllMenuUpload from '../Screens/AppScreen/ViewAllMenuUpload';
const Stack = createStackNavigator();

const HotelDetailsNavigation = () => {

    const [isSplashScreen, setSplashScreen] = useState(true);
    useEffect(() => {
        setInterval(() => {
            setSplashScreen(false)
        }, 4000);
    }, [])

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Hotel Details"
                component={HotelDetails}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="View All Table"
                component={ViewAllTable}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="View All Bar"
                component={ViewAllBar}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="View All Menu"
                component={ViewAllMenu}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="View All Outside"
                component={ViewAllOutside}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="View All Menu Upload"
                component={ViewAllMenuUpload}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            {/* <Stack.Screen
                name="Enter Details"
                component={EnterDetails}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            /> */}
        </Stack.Navigator>
    )
}

export default HotelDetailsNavigation;