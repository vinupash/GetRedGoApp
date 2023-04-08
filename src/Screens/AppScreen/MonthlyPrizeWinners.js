import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, ScrollView, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native'
import Header from '../../Components/Header'
import { COLORS, FONT, SHADOWS, SIZES } from '../../Constants'
import { baseUrl } from '../../Constants/Api';
import assets from '../../Constants/assets';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';

const MonthlyPrizeWinners = ({ navigation }) => {
    const [isLoading, setLoading] = useState(false)
    const [isPrizeWinners, setPrizeWinners] = useState([])
    const [offset, setOffset] = useState(1);
    const [isTotalPages, setTotalPages] = useState('');
    const [dataSource, setDataSource] = useState([]);
    const isFocused = useIsFocused()

    useEffect(() => {
        GetPrizeWinnersList()
    }, [])

    const GetPrizeWinnersList = async () => {
        try {
            setLoading(true)
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Basic YWRtaW46Q0ByXjBuQCQxMiE=");
            myHeaders.append("Cookie", "off_cc=3da17356e226b10588350c425a3ca66f5bf56c67");

            var formdata = new FormData();
            formdata.append("type", "monthly");

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            const response = await fetch(baseUrl + "winner/getWinnerList", requestOptions);
            const json = await response.json();
            setLoading(false);
            console.log('json MonthlyPrizeWinners--->', json);
            if (json.status === "success") {
                setPrizeWinners(json.monthly_winners)
                setOffset(offset + 1);
                setPrizeWinners(json.monthly_winners)
                setDataSource([...dataSource, ...json.monthly_winners]);
            } else {
                alert(json.message)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const PrizeWinnersList = () => {
        return dataSource.map((CustomersDetail, index) => {
            return (
                <View style={styles.cardSection}
                    key={index}>
                    <View style={{
                        padding: 10,
                        flex: 1,
                    }}>
                        <Text style={styles.cardUserName}>{CustomersDetail.fldv_name}</Text>

                        {/* <ImageBackground
                            style={styles.prizeTag}
                            source={(index == 0) ? assets.Golden :
                                (index == 1) ? assets.Silver :
                                    assets.Bronze}
                            resizeMode="cover">
                            <Text style={styles.prizeText}>{index + 1}</Text>
                        </ImageBackground> */}
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <View style={{ width: '35%' }}>
                                <Text style={styles.cardTitle}>Restaurant</Text>
                                <Text style={styles.cardText}>{CustomersDetail.fldv_store_name ? CustomersDetail.fldv_store_name : '-'}</Text>
                            </View>
                            <View style={{ width: '35%' }}>
                                <Text style={styles.cardTitle}>City</Text>
                                <Text style={styles.cardText}>{CustomersDetail.fldv_city ? CustomersDetail.fldv_city : '-'}</Text>
                            </View>
                            <View style={{ width: '30%' }}>
                                <Text style={styles.cardTitle}>Date</Text>
                                <Text style={styles.cardText}>{moment(CustomersDetail.fldd_date).format('Do MMM YYYY')}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )
        })
    }

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

    // if (isLoading) {
    //     return <ActivityIndicator size="small" color={COLORS.brand.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    // }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='dark-content'
                backgroundColor={COLORS.brand.white}
            />
            <Header
                onPress={() => navigation.openDrawer()}
            />
            {/* <Text style={styles.pageTitle}>Monthly prize winners</Text> */}

            <View style={{
                width: windowWidth - 30,
                alignSelf: 'center',
                marginBottom: 14,
                marginTop: 20,
                justifyContent: 'space-between',
                flexDirection: 'row',
            }}>
                <Text style={styles.pageTitle}>Monthly prize winners</Text>
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
                    {/* {PrizeWinnersList()} */}
                    {dataSource.length > 0 ?
                        <>
                            {PrizeWinnersList()}
                            {renderFooter()}
                        </>
                        : <Text style={{ width: windowWidth - 30, alignSelf: 'center', fontFamily: FONT.InterMedium, fontSize: SIZES.small, color: COLORS.brand.error }}>No record found</Text>}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default MonthlyPrizeWinners

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
})