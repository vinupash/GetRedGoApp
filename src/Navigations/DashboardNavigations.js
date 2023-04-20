
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../Screens/AppScreen/Dashboard';
import HotelDetailsNavigation from './HotelDetailsNavigation';

const Stack = createStackNavigator();

const DashboardNavigations = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="Hotel Details Navigation"
                component={HotelDetailsNavigation}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
        </Stack.Navigator>
    )
}

export default DashboardNavigations;