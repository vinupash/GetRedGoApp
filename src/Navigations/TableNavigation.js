
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HotelDetails from '../Screens/AppScreen/HotelDetails';
const Stack = createStackNavigator();

const TableNavigation = () => {
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
            {/* <Stack.Screen
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
            /> */}
        </Stack.Navigator>
    )
}

export default TableNavigation;