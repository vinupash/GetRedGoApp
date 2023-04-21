import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, ScrollView, TouchableOpacity, ImageBackground, ActivityIndicator, FlatList } from 'react-native'
import Header from '../../Components/Header'
import { COLORS, FONT, SHADOWS, SIZES } from '../../Constants'
import { baseUrl } from '../../Constants/Api';
import assets from '../../Constants/assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { useIsFocused } from '@react-navigation/native';
import Menu from '../../../assets/images/Menu';
import Logo from '../../../assets/images/Logo';
import { SvgXml } from 'react-native-svg';

const LeaderBoard = ({ navigation }) => {
    const [isLoading, setLoading] = useState(false)
    const [isPrizeWinners, setPrizeWinners] = useState([])

    const isFocused = useIsFocused()

    useEffect(() => {
        GetPrizeWinnersList()
    }, [isFocused])

    const GetPrizeWinnersList = async () => {
        try {
            setLoading(true)
            const userLognDetails = await AsyncStorage.getItem("userData");
            if (!userLognDetails) {
                // Alert.alert("Unable to fetch mobile number, Login again");
                return;
            }
            const transformedLoginData = JSON.parse(userLognDetails);
            // console.log('transformedLoginData UploadPictures--->', transformedLoginData);

            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Basic YWRtaW46Q0ByXjBuQCQxMiE=");
            myHeaders.append("Cookie", "off_cc=bbbdefbe6e1ac09b92f30ea7a7d679c38e9ca607");

            var formdata = new FormData();
            formdata.append("waiter_id", transformedLoginData.waiter_id);
            formdata.append("store_id", transformedLoginData.store_id);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            const response = await fetch(baseUrl + "winner/getLeaderboard", requestOptions);
            const json = await response.json();
            setLoading(false);
            console.log('json LeaderBoard--->', json);
            if (json.status === "success") {
                setPrizeWinners(json.leader_board)
            } else {
                alert(json.message)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const PrizeWinnersList = () => {
        return isPrizeWinners.map((CustomersDetail, index) => {
            return (
                <View style={styles.cardSection}
                    key={index}>
                    <View style={{
                        padding: 10,
                        flex: 1
                    }}>
                        <Text style={styles.cardUserName}>{CustomersDetail.fldv_name}</Text>

                        <ImageBackground
                            style={styles.prizeTag}
                            source={(index == 0) ? assets.Golden :
                                (index == 1) ? assets.Silver :
                                    assets.Bronze}
                            resizeMode="cover">
                            <Text style={styles.prizeText}>{index + 1}</Text>
                        </ImageBackground>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <View style={{ width: '40%' }}>
                                <Text style={styles.cardTitle}>Restaurant</Text>
                                <Text style={styles.cardText}>{CustomersDetail.fldv_store_name ? CustomersDetail.fldv_store_name : '-'}</Text>
                            </View>
                            <View style={{ width: '40%' }}>
                                <Text style={styles.cardTitle}>City</Text>
                                <Text style={styles.cardText}>{CustomersDetail.fldv_city ? CustomersDetail.fldv_city : '-'}</Text>
                            </View>
                            <View style={{ width: '20%' }}>
                                <Text style={styles.cardTitle}>Pts</Text>
                                <Text style={styles.cardText}>{CustomersDetail.fldf_points}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )
        })
    }

    // if (isLoading) {
    //     return <ActivityIndicator size="small" color={COLORS.brand.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    // }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='dark-content'
                backgroundColor={COLORS.brand.white}
            />
            {/* <Header
                onPress={() => navigation.openDrawer()}
            /> */}
            <View style={styles.headerBar}>
                <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ height: 40, width: 40, justifyContent: 'center' }}>
                    <SvgXml xml={Menu} width={28} height={28} />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('Dashboard')}
                >
                    <SvgXml xml={Logo} width={75} height={24} />
                </TouchableOpacity>
                <View style={{ height: 40, width: 40 }}>
                </View>
            </View>
            {/* <Text style={styles.pageTitle}>Leader Board</Text> */}
            <View style={{
                width: windowWidth - 30,
                alignSelf: 'center',
                marginBottom: 14,
                marginTop: 20,
                justifyContent: 'space-between',
                flexDirection: 'row',
            }}>
                <Text style={styles.pageTitle}>Leader Board</Text>
                {isLoading ? (
                    <ActivityIndicator
                        size="small" color={COLORS.brand.primary}
                        style={{ marginLeft: 8 }} />
                ) : null}
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.inputSection}>
                    {/* <Text style={styles.dateDetailsText}>24th Feb 23</Text> */}
                    {isPrizeWinners.length > 0 ? <>{PrizeWinnersList()}</> : <Text style={{ width: windowWidth - 30, alignSelf: 'center', fontFamily: FONT.InterMedium, fontSize: SIZES.small, color: COLORS.brand.error }}>No record found</Text>}
                    {/* {PrizeWinnersList()} */}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default LeaderBoard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.brand.background
    },
    pageTitle: {
        // marginBottom: 14,
        textAlign: 'left',
        // width: windowWidth - 30,
        alignSelf: 'center',
        fontSize: SIZES.extraLarge,
        fontFamily: FONT.InterBold,
        fontWeight: 700,
        color: COLORS.brand.textColor,
        // marginTop: 20
    },
    inputSection: {
        marginTop: 10,
        width: windowWidth - 30,
        alignSelf: 'center',
    },
    cardSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        height: 96,
        marginBottom: 10,
        ...SHADOWS.light,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        width: windowWidth - 30,
        alignSelf: 'center',
        margin: 6,
        position: 'relative'
    },
    prizeTag: {
        position: 'absolute',
        width: 80,
        height: 40,
        top: 0,
        right: 0,
        borderTopRightRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    prizeText: {
        color: COLORS.brand.white,
        fontSize: SIZES.font,
        fontFamily: FONT.InterBold,
        fontWeight: '800',
        marginLeft: 50,
    },
    dateDetailsText: {
        fontFamily: FONT.InterRegular,
        color: COLORS.brand.textColor,
        fontSize: SIZES.small,
    },
    cardTitle: {
        fontSize: SIZES.base,
        color: COLORS.brand.labelText,
        fontWeight: '400',
        fontFamily: FONT.InterRegular,
        marginBottom: 2,
    },
    cardText: {
        fontSize: SIZES.small,
        color: COLORS.brand.textColor,
        fontWeight: 700,
        fontFamily: FONT.InterMedium,
    },
    cardUserName: {
        fontSize: SIZES.medium,
        fontWeight: 800,
        fontFamily: FONT.InterBold,
        marginBottom: 10,
        color: COLORS.brand.textColor
    },
    headerBar: {
        height: 56,
        width: windowWidth,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#FFFFFF',
        ...SHADOWS.medium,
        marginBottom: 5,
        flexDirection: 'row'
    }
})