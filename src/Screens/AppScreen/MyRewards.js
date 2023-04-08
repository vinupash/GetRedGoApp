import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, ScrollView, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native'
import Header from '../../Components/Header'
import { COLORS, FONT, SHADOWS, SIZES } from '../../Constants'
import assets from '../../Constants/assets';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { baseUrl } from '../../Constants/Api';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';

const MyRewards = ({ navigation }) => {
    const currentDate = new Date();
    const [isLoading, setLoading] = useState(false)

    // const renderFooter = () => {
    //     return (
    //         <View style={styles.footer}>
    //             {offset <= isTotalPages ? (
    //                 <TouchableOpacity
    //                     activeOpacity={0.9}
    //                     onPress={getData}
    //                     style={styles.loadMoreBtn}>
    //                     <Text style={[styles.btnText, { color: COLORS.brand.white }]}>Load More</Text>
    //                     {isLoading ? (
    //                         <ActivityIndicator
    //                             color="white"
    //                             style={{ marginLeft: 8 }} />
    //                     ) : null}
    //                 </TouchableOpacity>
    //             ) :
    //                 null}
    //         </View>
    //     );
    // };

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
            <View style={{
                width: windowWidth - 30,
                alignSelf: 'center',
                marginBottom: 14,
                marginTop: 20,
                justifyContent: 'space-between',
                flexDirection: 'row',
            }}>
                <Text style={styles.pageTitle}>My Rewards</Text>
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
                    <Text style={styles.dateDetailsText}>{moment(currentDate).format('Do MMM YYYY')}</Text>
                    {/* {isPrizeWinners.length > 0 ?
                        <>
                            {PrizeWinnersList()}
                            {renderFooter()}
                        </> : <Text style={{ width: windowWidth - 30, alignSelf: 'center', fontFamily: FONT.InterMedium, fontSize: SIZES.small, color: COLORS.brand.error }}>No record found</Text>} */}

                    <View style={styles.cardSection}>
                        <View style={{
                            padding: 20,
                            flex: 1
                        }}>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <View style={{ width: '48%' }}>
                                    <Text style={styles.cardTitle}>Restaurant</Text>
                                    <Text style={styles.cardText}>Landmark Hotel</Text>
                                </View>
                                <View style={{ width: '48%' }}>
                                    <Text style={styles.cardTitle}>City</Text>
                                    <Text style={styles.cardText}>Ahmedabad</Text>
                                </View>

                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 45, marginTop: 10 }}>
                                <View style={{ width: '48%', height: 45 }}>
                                    <ImageBackground
                                        source={assets.Tag}
                                        style={{ width: '100%', height: 45, justifyContent: 'center' }}
                                        resizeMode='contain'>
                                        <Text style={{ marginLeft: '20%', fontFamily: FONT.InterBold, fontWeight: '800', fontSize: SIZES.medium, color: COLORS.brand.white }}>
                                            Amazon
                                        </Text>
                                    </ImageBackground>
                                </View>

                                <View style={{ width: '48%', height: 45, backgroundColor: '#FFF7EB', borderRadius: 3, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: '#FF9900', fontSize: SIZES.base, fontFamily: FONT.InterRegular, textAlign: 'center' }}>Gift Voucher Worth Rs.250</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.cardSection}>
                        <View style={{
                            padding: 20,
                            flex: 1
                        }}>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <View style={{ width: '48%' }}>
                                    <Text style={styles.cardTitle}>Restaurant</Text>
                                    <Text style={styles.cardText}>Landmark Hotel</Text>
                                </View>
                                <View style={{ width: '48%' }}>
                                    <Text style={styles.cardTitle}>City</Text>
                                    <Text style={styles.cardText}>Ahmedabad</Text>
                                </View>

                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 45, marginTop: 10 }}>
                                <View style={{ width: '48%', height: 45 }}>
                                    <ImageBackground
                                        source={assets.Tag}
                                        style={{ width: '100%', height: 45, justifyContent: 'center' }}
                                        resizeMode='contain'>
                                        <Text style={{ marginLeft: '20%', fontFamily: FONT.InterBold, fontWeight: '800', fontSize: SIZES.medium, color: COLORS.brand.white }}>
                                            Amazon
                                        </Text>
                                    </ImageBackground>
                                </View>

                                <View style={{ width: '48%', height: 45, backgroundColor: '#FFF7EB', borderRadius: 3, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: '#FF9900', fontSize: SIZES.base, fontFamily: FONT.InterRegular, textAlign: 'center' }}>Gift Voucher Worth Rs.250</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default MyRewards

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
        // alignItems: 'center',
        minHeight: 130,
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