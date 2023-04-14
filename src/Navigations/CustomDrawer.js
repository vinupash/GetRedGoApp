import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { SvgXml } from 'react-native-svg';
import Close from '../../assets/images/Close';
import Logo from '../../assets/images/Logo';
import { COLORS, FONT, SIZES } from '../Constants';
import Logout from '../../assets/images/Logout';
import { AuthContext } from '../Context/AuthContex';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { UserDataApi } from '../Constants/ApiCall';

const CustomDrawer = (props) => {
    const { userLogout } = useContext(AuthContext);
    const [isLoading, setLoading] = useState(false);
    const [isUserProfileName, setUserProfileName] = useState('');
    const isFocused = useIsFocused()
    const navigation = useNavigation();
    const [currentPageName, setCurrentPageName] = useState(null);
    const [activeItem, setActiveItem] = useState('Dashboard');

    useEffect(() => {
        const fetchUserDataAsync = async () => {
            setLoading(true)
            const userLognDetails = await AsyncStorage.getItem("userData");
            const transformedLoginData = JSON.parse(userLognDetails);
            // console.log('transformedLoginData Navigation--->', transformedLoginData.waiter_id);
            const waiterId = transformedLoginData.waiter_id;
            const responseUserData = await UserDataApi(waiterId);
            setLoading(false)
            // console.log('responseUserData CustomDrawer--->', responseUserData);
            setUserProfileName(responseUserData.result.fldv_name)
        };
        fetchUserDataAsync()
    }, [isFocused])


    const handleItemPress = (title) => {
        setActiveItem(title);
    };

    const DrawerItem = ({ title, active, onPress }) => {
        const itemStyle = active ? styles.activeItem : styles.item;
        return (
            <TouchableOpacity activeOpacity={0.85} style={itemStyle} onPress={onPress}>
                <Text style={[styles.menuLabel, { color: active ? COLORS.brand.primary : '#666666' }]} >{title}</Text>
            </TouchableOpacity>
        );
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('state', () => {
            setCurrentPageName(navigation.getCurrentRoute().name);
        });

        return unsubscribe;
    }, [navigation]);

    // console.log('currentPageName', currentPageName);

    // useEffect(() => {
    //     const fetchDataAsync = async () => {
    //         setLoading(true)
    //         const userStoreDetails = await AsyncStorage.getItem("userStoreDetails");
    //         setLoading(false)
    //         const transformedStoreData = JSON.parse(userStoreDetails);
    //         console.log(transformedStoreData);
    //         setUserProfileName(transformedStoreData.fldv_name)
    //     };
    //     fetchDataAsync();
    // }, []);

    // if (isLoading) {
    //     return <ActivityIndicator size="small" color={COLORS.brand.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    // }

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
                <View style={{ paddingVertical: 10, paddingHorizontal: 16, flexDirection: 'row' }}>
                    <Text style={{
                        fontFamily: FONT.InterBold,
                        color: '#140601',
                        fontWeight: '700',
                        fontSize: SIZES.mediumLarge,
                    }}>Hello</Text>
                    {isLoading ? <ActivityIndicator size="small" color={COLORS.brand.primary} style={{ marginLeft: 10 }} /> : <Text style={{
                        fontFamily: FONT.InterBold,
                        color: '#140601',
                        fontWeight: '700',
                        fontSize: SIZES.mediumLarge,
                        marginLeft: 5,
                    }}>{isUserProfileName}!</Text>}

                </View>
                <View style={{ flex: 1, backgroundColor: "#F5F5F5", marginTop: 10, }}>
                    <DrawerItem
                        title="Dashboard"
                        active={currentPageName === 'Dashboard' ? activeItem : null}
                        onPress={() => { handleItemPress('Dashboard'); props.navigation.navigate('Dashboard'); }}
                    />
                    <DrawerItem
                        title="My Customers"
                        active={currentPageName === 'My Customers' ? activeItem : null}
                        onPress={() => { handleItemPress('My Customers'); props.navigation.navigate('My Customers'); }}
                    />
                    <DrawerItem
                        title="Leader Board"
                        active={currentPageName === 'Leader Board' ? activeItem : null}
                        onPress={() => { handleItemPress('Leader Board'); props.navigation.navigate('Leader Board'); }}
                    />
                    <DrawerItem
                        title="Daily Prize Winners"
                        active={currentPageName === 'Daily Prize Winners' ? activeItem : null}
                        onPress={() => { handleItemPress('Daily Prize Winners'); props.navigation.navigate('Daily Prize Winners'); }}
                    />
                    <DrawerItem
                        title="Weekly Prize Winners"
                        active={currentPageName === 'Weekly Prize Winners' ? activeItem : null}
                        onPress={() => { handleItemPress('Weekly Prize Winners'); props.navigation.navigate('Weekly Prize Winners'); }}
                    />
                    <DrawerItem
                        title="Monthly Prize Winners"
                        active={currentPageName === 'Monthly Prize Winners' ? activeItem : null}
                        onPress={() => { handleItemPress('Monthly Prize Winners'); props.navigation.navigate('Monthly Prize Winners'); }}
                    />
                    <DrawerItem
                        title="Rewards Catalogue"
                        active={currentPageName === 'Rewards Catalogue' ? activeItem : null}
                        onPress={() => { handleItemPress('Rewards Catalogue'); props.navigation.navigate('Rewards Catalogue'); }}
                    />
                    <DrawerItem
                        title="Contact Us"
                        active={currentPageName === 'Contact Us' ? activeItem : null}
                        onPress={() => { handleItemPress('Contact Us'); props.navigation.navigate('Contact Us'); }}
                    />
                    <DrawerItem
                        title="Privacy Policy"
                        active={currentPageName === 'Privacy Policy' ? activeItem : null}
                        onPress={() => { handleItemPress('Privacy Policy'); props.navigation.navigate('Privacy Policy'); }}
                    />
                    {/* <DrawerItem
                        title="About"
                        active={currentPageName === 'About' ? activeItem : null}
                        onPress={() => { handleItemPress('About'); props.navigation.navigate('About'); }}
                    /> */}

                </View>
            </DrawerContentScrollView>
            <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => { userLogout() }}
                style={styles.logotBox}
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
    },
    active: {
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
    unactive: {
        borderWidth: 1,
        height: 45,
        justifyContent: 'center',
        borderRadius: 5,
        marginBottom: 10,
        borderColor: '#FAE6E7',
        marginHorizontal: 16,
        paddingHorizontal: 16,
    },
    logotBox: {
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