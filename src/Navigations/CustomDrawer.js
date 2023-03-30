import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,

} from '@react-navigation/drawer';
import { SvgXml } from 'react-native-svg';
import Close from '../../assets/images/Close';
import Logo from '../../assets/images/Logo';
import { COLORS, FONT, SIZES } from '../Constants';
import Logout from '../../assets/images/Logout';
import { AuthContext } from '../Context/AuthContex';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { baseUrl } from '../Constants/Api';
import { useIsFocused } from '@react-navigation/native';

const CustomDrawer = (props) => {
    const { userLogout } = useContext(AuthContext);
    const [isLoading, setLoading] = useState(false);
    const [isUserProfileName, setUserProfileName] = useState('');
    const [activeItem, setActiveItem] = useState('Dashboard');
    const isFocused = useIsFocused()

    const handleItemPress = (title) => {
        setActiveItem(title);
    };

    const DrawerItem = ({ title, active, onPress }) => {
        const itemStyle = active ? styles.activeItem : styles.item;
        return (
            <TouchableOpacity style={itemStyle} onPress={onPress}>
                <Text style={[styles.menuLabel, { color: active ? COLORS.brand.primary : '#666666' }]} >{title}</Text>
            </TouchableOpacity>
        );
    };

    useEffect(() => {
        UserAsyncStorageData()
    }, [isFocused])

    const UserAsyncStorageData = async () => {
        try {
            setLoading(true)
            const userStoreDetails = await AsyncStorage.getItem("userStoreDetails");
            if (!userStoreDetails) {
                // Alert.alert("Unable to fetch mobile number, Login again");
                return;
            }
            setLoading(false)
            const transformedStoreData = JSON.parse(userStoreDetails);
            console.log('transformedStoreData --->', transformedStoreData);
            setUserProfileName(transformedStoreData.fldv_name)
        } catch (error) {
            console.log(error.message);
        }
    }


    if (isLoading) {
        return <ActivityIndicator size="small" color={COLORS.brand.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
            <DrawerContentScrollView {...props}
                contentContainerStyle={{
                    backgroundColor: "#F5F5F5",
                }}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                    <TouchableOpacity
                        style={{ width: 50, height: 50, justifyContent: 'center' }}
                        onPress={() => props.navigation.closeDrawer()}
                    >
                        <SvgXml xml={Close} width={22} height={22} />
                    </TouchableOpacity>
                    <View style={styles.logoSection}>
                        <SvgXml xml={Logo} width={75} height={24} />
                    </View>
                </View>
                <View style={{ paddingVertical: 10, paddingHorizontal: 16 }}>
                    <Text style={{
                        fontFamily: FONT.InterBold,
                        color: '#140601',
                        fontWeight: '700',
                        fontSize: SIZES.mediumLarge,
                    }}>Hello {isUserProfileName}!</Text>
                </View>
                <View style={{ flex: 1, backgroundColor: "#F5F5F5", marginTop: 10, }}>

                    <DrawerItem
                        title="Dashboard"
                        active={activeItem === 'Dashboard'}
                        onPress={() => { handleItemPress('Dashboard'); props.navigation.navigate('Dashboard'); }}
                    />
                    <DrawerItem
                        title="My Customers"
                        active={activeItem === 'My Customers'}
                        onPress={() => { handleItemPress('My Customers'); props.navigation.navigate('My Customers'); }}
                    />
                    <DrawerItem
                        title="About"
                        active={activeItem === 'About'}
                        onPress={() => { handleItemPress('About'); props.navigation.navigate('About'); }}
                    />

                    <DrawerItem
                        title="Contact Us"
                        active={activeItem === 'Contact Us'}
                        onPress={() => { handleItemPress('Contact Us'); props.navigation.navigate('Contact Us'); }}
                    />
                    <DrawerItem
                        title="Privacy Policy"
                        active={activeItem === 'Privacy Policy'}
                        onPress={() => { handleItemPress('Privacy Policy'); props.navigation.navigate('Privacy Policy'); }}
                    />
                    <DrawerItem
                        title="Daily Prize Winners"
                        active={activeItem === 'Daily Prize Winners'}
                        onPress={() => { handleItemPress('Daily Prize Winners'); props.navigation.navigate('Daily Prize Winners'); }}
                    />
                    <DrawerItem
                        title="Weekly Prize Winners"
                        active={activeItem === 'Weekly Prize Winners'}
                        onPress={() => { handleItemPress('Weekly Prize Winners'); props.navigation.navigate('Weekly Prize Winners'); }}
                    />
                    <DrawerItem
                        title="Monthly Prize Winners"
                        active={activeItem === 'Monthly Prize Winners'}
                        onPress={() => { handleItemPress('Monthly Prize Winners'); props.navigation.navigate('Monthly Prize Winners'); }}
                    />
                    <DrawerItem
                        title="Leader Board"
                        active={activeItem === 'Leader Board'}
                        onPress={() => { handleItemPress('Leader Board'); props.navigation.navigate('Leader Board'); }}
                    />
                    {/* <DrawerItem
                        label="Dashboard"
                        labelStyle={styles.menuLabel}
                        style={styles.drawerItemStyle}
                        onPress={() => {
                            props.navigation.navigate('Dashboard');
                        }}
                    />
                    <DrawerItem
                        label="My Customers"
                        labelStyle={styles.menuLabel}
                        style={styles.drawerItemStyle}
                        onPress={() => {
                            props.navigation.navigate('My Customers');
                        }}
                    />
                    <DrawerItem
                        label="About App"
                        labelStyle={styles.menuLabel}
                        style={styles.drawerItemStyle}
                        onPress={() => {
                            props.navigation.navigate('About');
                        }}
                    />
                    <DrawerItem
                        label="Contact Us"
                        labelStyle={styles.menuLabel}
                        style={styles.drawerItemStyle}
                        onPress={() => {
                            props.navigation.navigate('Contact Us');
                        }}
                    />
                    <DrawerItem
                        label="Privacy Policy"
                        labelStyle={styles.menuLabel}
                        style={styles.drawerItemStyle}
                        onPress={() => {
                            props.navigation.navigate('Privacy Policy');
                        }}
                    />
                    <DrawerItem
                        label="Daily Prize Winners"
                        labelStyle={styles.menuLabel}
                        style={styles.drawerItemStyle}
                        onPress={() => {
                            props.navigation.navigate('Daily Prize Winners');
                        }}
                    />
                    <DrawerItem
                        label="Weekly Prize Winners"
                        labelStyle={styles.menuLabel}
                        style={styles.drawerItemStyle}
                        onPress={() => {
                            props.navigation.navigate('Weekly Prize Winners');
                        }}
                    />
                    <DrawerItem
                        label="Monthly Prize Winners"
                        labelStyle={styles.menuLabel}
                        style={styles.drawerItemStyle}
                        onPress={() => {
                            props.navigation.navigate('Monthly Prize Winners');
                        }}
                    /> */}
                </View>
            </DrawerContentScrollView>
            <TouchableOpacity
                onPress={() => { userLogout() }}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    borderWidth: 1,
                    marginHorizontal: 20,
                    borderRadius: 5,
                    marginBottom: 20,
                    height: 45,
                    borderColor: COLORS.brand.primary
                }}
            >
                <Text style={{ fontFamily: FONT.InterMedium, fontSize: SIZES.font, color: COLORS.brand.primary, marginRight: 8, lineHeight: 18, marginLeft: 6 }}>Logout</Text>
                <SvgXml xml={Logout} width={20} height={20} />
            </TouchableOpacity>
        </View>
    )
}

export default CustomDrawer

const styles = StyleSheet.create({
    menuLabel: {
        fontFamily: FONT.InterMedium,
        fontSize: SIZES.font,
        lineHeight: 18
    },
    drawerItemStyle: {
        borderWidth: 1,
        height: 45,
        justifyContent: 'center',
        borderRadius: 5,
        marginBottom: 10,
        borderColor: '#FAE6E7',
    },
    item: {
        borderWidth: 1,
        height: 45,
        justifyContent: 'center',
        borderRadius: 5,
        marginBottom: 10,
        borderColor: '#FAE6E7',
        marginHorizontal: 16,
        paddingHorizontal: 16,
    },
    activeItem: {
        borderWidth: 1,
        backgroundColor: '#FAE6E7',
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginHorizontal: 16,
        borderRadius: 5,
        marginBottom: 10,
        height: 45,
        justifyContent: 'center',
        borderColor: COLORS.brand.primary
    },
})