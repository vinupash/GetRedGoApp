import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, ScrollView, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native'
import Header from '../../Components/Header'
import { COLORS, FONT, SHADOWS, SIZES } from '../../Constants'
import assets from '../../Constants/assets';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Golden from './../../../assets/images/golden.png'
import Silver from './../../../assets/images/silver.png'
import Bronze from './../../../assets/images/bronze.png'
import { baseUrl } from '../../Constants/Api';

const DailyPrizeWinners = ({ navigation }) => {
    const [isLoading, setLoading] = useState(false)
    const [isPrizeWinners, setPrizeWinners] = useState([])

    useEffect(() => {
        const GetPrizeWinnersList = async () => {
            try {
                setLoading(true)
                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Basic YWRtaW46Q0ByXjBuQCQxMiE=");
                myHeaders.append("Cookie", "off_cc=3da17356e226b10588350c425a3ca66f5bf56c67");

                var formdata = new FormData();
                formdata.append("type", "daily");

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: formdata,
                    redirect: 'follow'
                };

                const response = await fetch(baseUrl + "winner/getWinnerList", requestOptions);
                const json = await response.json();
                setLoading(false);
                console.log('json DailyPrizeWinners--->', json);
                if (json.status === "success") {
                    setPrizeWinners(json.daily_winners)
                } else {
                    alert(json.message)
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        GetPrizeWinnersList()
    }, [])

    const CustomersDetail = [
        {
            key: 1,
            name: 'Johon  Doe',
            point: 80,
            status: 'Registered',
            customerNo: 4,
            priseImage: Golden,
            position: '1st',
            landmark: 'Landmark Hotel',
            city: 'Mumbai'
        },
        {
            key: 2,
            name: 'Johon  Doe',
            point: 100,
            status: 'Registered',
            customerNo: 4,
            priseImage: Silver,
            position: '2nd',
            landmark: 'Landmark Hotel',
            city: 'Mumbai'
        },
        {
            key: 3,
            name: 'Johon  Doe',
            point: 5,
            status: 'Registered',
            customerNo: 4,
            priseImage: Bronze,
            position: '3rd',
            landmark: 'Landmark Hotel',
            city: 'Ahmedabad'
        },
        {
            key: 4,
            name: 'Johon  Doe',
            point: 50,
            status: 'Registered',
            customerNo: 4,
            priseImage: Bronze,
            position: '4th',
            landmark: 'Landmark Hotel',
            city: 'Ahmedabad'
        },
        {
            key: 5,
            name: 'Johon',
            point: 50,
            status: 'Registered',
            customerNo: 4,
            priseImage: Bronze,
            position: '5th',
            landmark: 'Landmark Hotel',
            city: 'Ahmedabad'
        },
        {
            key: 6,
            name: 'Johon',
            point: 50,
            status: 'Registered',
            customerNo: 4,
            priseImage: Bronze,
            position: '6th',
            landmark: 'Landmark Hotel',
            city: 'Ahmedabad'
        },
    ];

    console.log(isPrizeWinners);

    const PersonData = () => {
        return CustomersDetail.map((CustomersDetail, i) => {
            return (
                <View style={styles.cardSection}
                    key={CustomersDetail.key}>
                    <View style={{
                        padding: 10,
                        flex: 1
                    }}>
                        <Text style={styles.cardUserName}>{CustomersDetail.name}</Text>

                        <ImageBackground
                            style={styles.prizeTag}
                            source={CustomersDetail.priseImage}
                            resizeMode="cover">
                            <Text style={styles.prizeText}>{CustomersDetail.position}</Text>
                        </ImageBackground>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <View style={{ width: '40%' }}>
                                <Text style={styles.cardTitle}>Restaurant</Text>
                                <Text style={styles.cardText}>{CustomersDetail.landmark}</Text>
                            </View>
                            <View style={{ width: '40%' }}>
                                <Text style={styles.cardTitle}>City</Text>
                                <Text style={styles.cardText}>{CustomersDetail.city}</Text>
                            </View>
                            <View style={{ width: '12%' }}>
                                <Text style={styles.cardTitle}>Pts</Text>
                                <Text style={styles.cardText}>{CustomersDetail.point}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )
        })
    }

    const PrizeWinnersList = () => {
        return isPrizeWinners.map((CustomersDetail, index) => {
            return (
                <View style={styles.cardSection}
                    key={CustomersDetail.fldi_id}>
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
                            // source={assets.Bronze}
                            resizeMode="cover">
                            <Text style={styles.prizeText}>{index + 1}</Text>
                        </ImageBackground>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <View style={{ width: '49%' }}>
                                <Text style={styles.cardTitle}>Restaurant</Text>
                                <Text style={styles.cardText}>{CustomersDetail.fldv_state ? CustomersDetail.fldv_state : '-'}</Text>
                            </View>
                            <View style={{ width: '49%' }}>
                                <Text style={styles.cardTitle}>City</Text>
                                <Text style={styles.cardText}>{CustomersDetail.fldv_city ? CustomersDetail.fldv_city : '-'}</Text>
                            </View>
                            {/* <View style={{ width: '12%' }}>
                                <Text style={styles.cardTitle}>Pts</Text>
                                <Text style={styles.cardText}>{CustomersDetail.point}</Text>
                            </View> */}
                        </View>
                    </View>
                </View>
            )
        })
    }

    if (isLoading) {
        return <ActivityIndicator size="small" color={COLORS.brand.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='dark-content'
                backgroundColor={COLORS.brand.white}
            />
            <Header
                onPress={() => navigation.openDrawer()}
            />
            <Text style={styles.pageTitle}>Daily prize winners</Text>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.inputSection}>
                    {/* <Text style={styles.dateDetailsText}>24th Feb 23</Text> */}
                    {PrizeWinnersList()}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DailyPrizeWinners

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.brand.background
    },
    pageTitle: {
        marginBottom: 14,
        textAlign: 'left',
        width: windowWidth - 30,
        alignSelf: 'center',
        fontSize: SIZES.extraLarge,
        fontFamily: FONT.InterBold,
        fontWeight: 700,
        color: COLORS.brand.textColor,
        marginTop: 20
    },
    inputSection: {
        marginTop: 10,
        width: windowWidth - 30,
        alignSelf: 'center',
    },
    cardSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        top: -6,
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
})