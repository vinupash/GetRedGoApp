import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, ScrollView, TouchableOpacity, ImageBackground, ActivityIndicator, Image } from 'react-native'
import Header from '../../Components/Header'
import { COLORS, FONT, SHADOWS, SIZES } from '../../Constants'
import assets from '../../Constants/assets';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { baseUrl } from '../../Constants/Api';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { SvgXml } from 'react-native-svg';
import GoldCoine from '../../../assets/images/GoldCoine';
import GiftCard from '../../../assets/images/GiftCard';
import Menu from '../../../assets/images/Menu';
import Logo from '../../../assets/images/Logo';

const RewardsCatalogue = ({ navigation }) => {
    const [isLoading, setLoading] = useState(false)
    // const [isPrizeWinners, setPrizeWinners] = useState([])
    // const [offset, setOffset] = useState(1);
    // const [isTotalPages, setTotalPages] = useState('');
    // const [dataSource, setDataSource] = useState([]);
    // const isFocused = useIsFocused()

    // useEffect(() => {
    //     GetPrizeWinnersList()
    // }, [])

    // const GetPrizeWinnersList = async () => {
    //     try {
    //         setLoading(true)
    //         var myHeaders = new Headers();
    //         myHeaders.append("Authorization", "Basic YWRtaW46Q0ByXjBuQCQxMiE=");
    //         myHeaders.append("Cookie", "off_cc=3da17356e226b10588350c425a3ca66f5bf56c67");

    //         var formdata = new FormData();
    //         formdata.append("type", "daily");

    //         var requestOptions = {
    //             method: 'POST',
    //             headers: myHeaders,
    //             body: formdata,
    //             redirect: 'follow'
    //         };

    //         const response = await fetch(baseUrl + "winner/getWinnerList", requestOptions);
    //         const json = await response.json();
    //         setLoading(false);
    //         console.log('json DailyPrizeWinners--->', json.daily_winners);
    //         if (json.status === "success") {
    //             setTotalPages(json.number_of_pages)
    //             setOffset(offset + 1);
    //             setPrizeWinners(json.daily_winners)
    //             setDataSource([...dataSource, ...json.daily_winners]);
    //         } else {
    //             alert(json.message)
    //         }
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }

    // const PrizeWinnersList = () => {
    //     return dataSource.map((CustomersDetail, index) => {
    //         return (
    //             <View style={styles.cardSection}
    //                 key={index}>
    //                 <View style={{
    //                     padding: 20,
    //                     flex: 1
    //                 }}>
    //                     <Text style={styles.cardUserName}>{CustomersDetail.fldv_name}</Text>

    //                     <ImageBackground
    //                         style={styles.prizeTag}
    //                         source={(index == 0) ? assets.Golden :
    //                             (index == 1) ? assets.Silver :
    //                                 assets.Bronze}
    //                         resizeMode="cover">
    //                         <Text style={styles.prizeText}>{index + 1}</Text>
    //                     </ImageBackground>
    //                     <View style={{
    //                         flexDirection: 'row'
    //                     }}>
    //                         <View style={{ width: '48%' }}>
    //                             <Text style={styles.cardTitle}>Restaurant</Text>
    //                             <Text style={styles.cardText}>{CustomersDetail.fldv_store_name ? CustomersDetail.fldv_store_name : '-'}</Text>
    //                         </View>
    //                         <View style={{ width: '48%' }}>
    //                             <Text style={styles.cardTitle}>City</Text>
    //                             <Text style={styles.cardText}>{CustomersDetail.fldv_city ? CustomersDetail.fldv_city : '-'}</Text>
    //                         </View>
    //                         {/* <View style={{ width: '30%' }}>
    //                             <Text style={styles.cardTitle}>Date</Text>
    //                             <Text style={styles.cardText}>{moment(CustomersDetail.fldd_date).format('Do MMM YYYY')}</Text>
    //                         </View> */}
    //                     </View>
    //                     <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 45, marginTop: 10 }}>
    //                         <View style={{ width: '48%', height: 45 }}>
    //                             <ImageBackground
    //                                 source={assets.Tag}
    //                                 style={{ width: '100%', height: 45, justifyContent: 'center' }}
    //                                 resizeMode='contain'>
    //                                 <Text style={{ marginLeft: '20%', fontFamily: FONT.InterBold, fontWeight: '800', fontSize: SIZES.medium, color: COLORS.brand.white }}>
    //                                     Amazon
    //                                 </Text>
    //                             </ImageBackground>
    //                         </View>

    //                         <View style={{ width: '48%', height: 45, backgroundColor: '#FFF7EB', borderRadius: 3, justifyContent: 'center', alignItems: 'center' }}>
    //                             <Text style={{ color: '#FF9900', fontSize: SIZES.base, fontFamily: FONT.InterRegular, textAlign: 'center' }}>Amazon Pay Gift Voucher Worth Rs.1000</Text>
    //                         </View>
    //                     </View>
    //                 </View>
    //             </View>
    //         )
    //     })
    // }

    const renderFooter = () => {
        return (
            <View style={styles.footer}>
                {offset <= isTotalPages ? (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={getData}
                        style={styles.loadMoreBtn}>
                        <Text style={[styles.btnText, { color: COLORS.brand.white }]}>Load More</Text>
                        {isLoading ? (
                            <ActivityIndicator
                                color="white"
                                style={{ marginLeft: 8 }} />
                        ) : null}
                    </TouchableOpacity>
                ) :
                    null}
            </View>
        );
    };

    const currentDate = new Date();

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
            {/* <Text style={styles.pageTitle}>Daily prize winners</Text> */}
            <View style={{
                width: windowWidth - 30,
                alignSelf: 'center',
                marginBottom: 14,
                marginTop: 20,
                justifyContent: 'space-between',
                flexDirection: 'row',
            }}>
                <Text style={styles.pageTitle}>Rewards Catalogue</Text>
                {isLoading ? (
                    <ActivityIndicator
                        size="small" color={COLORS.brand.primary}
                        style={{ marginLeft: 8 }} />
                ) : null}
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <LinearGradient
                    start={{ x: 0, y: 0.25 }} end={{ x: 0.5, y: 1.8 }}
                    colors={['#956109', '#F9B23A', '#F7CC84']}
                    style={styles.cardSection}
                >
                    <ImageBackground
                        style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
                        source={assets.bgImageCongo}
                        resizeMode='contain'>
                        <Image source={assets.bikeImg} style={{ width: 160, height: 108 }} />
                        <Text style={{ paddingVertical: 3, paddingHorizontal: 5, backgroundColor: '#FFFFFF', borderRadius: 2, color: '#AE730F', fontFamily: FONT.InterRegular, fontSize: SIZES.medium, ...SHADOWS.light }}>1 Top Performer will win</Text>
                        <Text style={{ fontSize: 24, fontFamily: FONT.InterBold, fontWeight: '800', color: '#FFFFFF', paddingVertical: 8, paddingHorizontal: 10, textAlign: 'center' }}>Royal Enfield Bullet 350 ES Regal Red</Text>

                        <Text style={{ fontSize: 12, fontFamily: FONT.InterRegular, fontWeight: '400', color: '#FFFFFF', marginBottom: 10 }}> Worth Rs.2,20,000</Text>
                    </ImageBackground>
                </LinearGradient>
                {/* <View style={styles.cardSection}>
                    <ImageBackground
                        style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
                        source={assets.bgImageCongo}
                        resizeMode='contain'>
                        <Image source={assets.bikeImg} style={{ width: 137, height: 108 }} />
                        <Text style={{ paddingVertical: 3, paddingHorizontal: 5, backgroundColor: '#FFFFFF', borderRadius: 2, color: '#AE730F', fontFamily: FONT.InterRegular, fontSize: SIZES.medium, ...SHADOWS.light }}>1 Top Performer will win</Text>
                        <Text style={{ fontSize: 24, fontFamily: FONT.InterBold, fontWeight: '800', color: '#FFFFFF', paddingVertical: 8 }}>Jawa Orion Red 45</Text>

                        <Text style={{ fontSize: 12, fontFamily: FONT.InterRegular, fontWeight: '400', color: '#FFFFFF', marginBottom: 10 }}> Worth Rs.2,37,267</Text>

                    </ImageBackground>
                </View> */}

                <LinearGradient
                    start={{ x: 0, y: 0.4 }} end={{ x: 0.8, y: 2 }}
                    colors={['#E41E2B', '#EDBC42', '#C8B509']}
                    style={styles.cardBox}
                >
                    <View style={{ justifyContent: 'center' }}>
                        <View style={{ paddingHorizontal: 8, backgroundColor: '#FFFFFF', borderRadius: 2, ...SHADOWS.light, paddingVertical: 5 }}>
                            <Text style={{ color: '#C1450B', fontFamily: FONT.InterRegular, fontSize: SIZES.medium, textAlign: 'center' }}>Monthly Winners get</Text>
                        </View>
                        <Text style={{ fontSize: 24, fontFamily: FONT.InterBold, fontWeight: '800', color: '#FFFFFF', marginTop: 8 }}>Gold Coin</Text>
                        <Text style={{ fontSize: 12, fontFamily: FONT.InterRegular, fontWeight: '400', color: '#FFFFFF' }}>Value Rs.9,999</Text>
                    </View>
                    <View style={{ width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                        <SvgXml xml={GoldCoine} width={60} height={68} />
                    </View>
                </LinearGradient>

                <LinearGradient
                    start={{ x: 0, y: 0.4 }} end={{ x: 0.8, y: 2 }}
                    colors={['#E41E2B', '#FEBD69']}
                    style={styles.cardBox}
                >
                    <View style={{ justifyContent: 'center' }}>
                        <View style={{ paddingHorizontal: 8, backgroundColor: '#FFFFFF', borderRadius: 2, ...SHADOWS.light, paddingVertical: 5 }}>
                            <Text style={{ color: '#C1450B', fontFamily: FONT.InterRegular, fontSize: SIZES.medium, textAlign: 'center' }}>Weekly Winners get</Text>
                        </View>
                        <Text style={{ fontSize: 24, fontFamily: FONT.InterBold, fontWeight: '800', color: '#FFFFFF', marginTop: 8 }}>Amazon Pay</Text>
                        <Text style={{ fontSize: 12, fontFamily: FONT.InterRegular, fontWeight: '400', color: '#FFFFFF' }}>Gift voucher Worth Rs.2,000</Text>
                    </View>
                    <View style={{ width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                        <SvgXml xml={GiftCard} width={68} height={48} />
                    </View>
                </LinearGradient>

                <LinearGradient
                    start={{ x: 0, y: 0.4 }} end={{ x: 0.8, y: 2 }}
                    colors={['#E41E2B', '#CB202D']}
                    style={styles.cardBox}
                >
                    <View style={{ justifyContent: 'center' }}>
                        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 2, ...SHADOWS.light, paddingVertical: 5 }}>
                            <Text style={{ color: '#C1450B', fontFamily: FONT.InterRegular, fontSize: SIZES.medium, textAlign: 'center' }}>Daily Winners</Text>
                        </View>
                        <Text style={{ fontSize: 24, fontFamily: FONT.InterBold, fontWeight: '800', color: '#FFFFFF', marginTop: 8 }}>Zomato</Text>
                        <Text style={{ fontSize: 12, fontFamily: FONT.InterRegular, fontWeight: '400', color: '#FFFFFF' }}>Gift voucher Worth Rs.250</Text>
                    </View>
                    <View style={{ width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                        <SvgXml xml={GiftCard} width={68} height={48} />
                    </View>
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RewardsCatalogue

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.brand.background
    },
    pageTitle: {
        textAlign: 'left',
        fontSize: SIZES.extraLarge,
        fontFamily: FONT.InterBold,
        fontWeight: 700,
        color: COLORS.brand.textColor,
    },
    inputSection: {
        marginTop: 10,
        width: windowWidth - 30,
        alignSelf: 'center',
    },
    cardSection: {
        minHeight: 220,
        marginBottom: 10,
        ...SHADOWS.light,
        borderColor: '#966209',
        backgroundColor: '#966209',
        borderRadius: 5,
        width: windowWidth - 30,
        alignSelf: 'center',
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
    cardBox: {
        width: windowWidth - 30,
        alignSelf: 'center',
        minHeight: 130,
        paddingHorizontal: 16,
        paddingVertical: 20,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        ...SHADOWS.light,
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