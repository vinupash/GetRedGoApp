import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import PrivacyPolicy from '../Screens/AppScreen/PrivacyPolicy';
import Dashboard from '../Screens/AppScreen/Dashboard';
import AboutApp from '../Screens/AppScreen/AboutApp';
import ContactUs from '../Screens/AppScreen/ContactUs';
import DailyPrizeWinners from '../Screens/AppScreen/DailyPrizeWinners';
import HotelDetails from '../Screens/AppScreen/HotelDetails';
import MyCustomers from '../Screens/AppScreen/MyCustomers';
import Success from '../Screens/AppScreen/Success';
import UploadPictures from '../Screens/AppScreen/UploadPictures';
import ViewAll from '../Screens/AppScreen/ViewAll';
import WeeklyPrizeWinners from '../Screens/AppScreen/WeeklyPrizeWinners';
import MonthlyPrizeWinners from '../Screens/AppScreen/MonthlyPrizeWinners';
import ViewAllTable from '../Screens/AppScreen/ViewAllTable';
import ViewAllBar from '../Screens/AppScreen/ViewAllBar';
import ViewAllOutside from '../Screens/AppScreen/ViewAllOutside';
import ViewAllMenu from '../Screens/AppScreen/ViewAllMenu';
import LeaderBoard from '../Screens/AppScreen/LeaderBoard';
import ViewAllMenuUpload from '../Screens/AppScreen/ViewAllMenuUpload';
const Drawer = createDrawerNavigator();

const AppNavigations = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerActiveTintColor: "white",
                drawerInactiveTintColor: "yellow",
            }}
        >
            <Drawer.Screen name="Dashboard" component={Dashboard} />
            <Drawer.Screen name="About" component={AboutApp} />
            <Drawer.Screen name="Contact Us" component={ContactUs} />
            <Drawer.Screen name="Daily Prize Winners" component={DailyPrizeWinners} />
            <Drawer.Screen name="Hotel Details" component={HotelDetails} />
            <Drawer.Screen name="My Customers" component={MyCustomers} />
            <Drawer.Screen name="Success" component={Success} />
            <Drawer.Screen name="Upload Pictures" component={UploadPictures} />
            <Drawer.Screen name="Privacy Policy" component={PrivacyPolicy} />
            <Drawer.Screen name="View All" component={ViewAll} />
            <Drawer.Screen name="Weekly Prize Winners" component={WeeklyPrizeWinners} />
            <Drawer.Screen name="Monthly Prize Winners" component={MonthlyPrizeWinners} />
            <Drawer.Screen name="View All Table" component={ViewAllTable} />
            <Drawer.Screen name="View All Bar" component={ViewAllBar} />
            <Drawer.Screen name="View All Outside" component={ViewAllOutside} />
            <Drawer.Screen name="View All Menu" component={ViewAllMenu} />
            <Drawer.Screen name="Leader Board" component={LeaderBoard} />
            <Drawer.Screen name="View All Menu Upload" component={ViewAllMenuUpload} />
        </Drawer.Navigator>
    )
}

export default AppNavigations