import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native'
import Header from '../../Components/Header'
import { COLORS, FONT, SHADOWS, SIZES } from '../../Constants'
import assets from '../../Constants/assets';
import { useIsFocused } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import CokeIconRed from '../../../assets/images/CokeIconRed';
import CokeIconWhite from '../../../assets/images/CokeIconWhite';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const UploadPictures = ({ navigation, route }) => {
    const isFocused = useIsFocused()
    const [isPageTitle, setPageTitle] = useState('')
    const [isScreenName, setScreenName] = useState('')
    const { pageDetails, screenName } = route.params;
    useEffect(() => {
        setPageTitle(pageDetails.pageTitle)
        setScreenName(pageDetails.screenName)
    }, [isFocused])
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='dark-content'
                backgroundColor={COLORS.brand.white}
            />
            <Header
                onPress={() => navigation.openDrawer()}
            />
            <View style={styles.btnTextGroup}>
                <Text style={styles.pageTitle}>{isPageTitle}</Text>
                <TouchableOpacity
                    activeOpacity={0.85}
                    //    onPress={onPress} 
                    style={[styles.btnView]}
                >
                    <Text style={styles.btnText}>Upload New</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >

                {isScreenName === 'Table' ?
                    <View style={styles.productBox}>
                        <Image source={assets.ProductImage} style={styles.ProductImage} />
                        <View style={styles.productDetails}>
                            <View style={{ width: '50%' }}>
                                <Text style={styles.cardTitle}>Uploaded by</Text>
                                <Text style={styles.cardText}>Suresh Yadav</Text>
                            </View>
                            <View style={{ width: '50%' }}>
                                <Text style={styles.cardTitle}>Uploaded on</Text>
                                <Text style={styles.cardText}>11th Jan 2023</Text>
                            </View>
                        </View>
                        <View style={styles.productDetails}>
                            <View style={{ width: '50%' }}>
                                <Text style={styles.cardTitle}>Status</Text>
                                <Text style={styles.cardText}>Approved</Text>
                            </View>
                            <View style={{ width: '50%' }}>
                                <Text style={styles.cardTitle}>Pts</Text>
                                <Text style={styles.cardText}>5</Text>
                            </View>
                        </View>
                    </View>
                    :
                    null
                }


                {isScreenName === 'Bar' ?
                    <View style={styles.productBox}>
                        <Image source={assets.ProductImage} style={styles.ProductImage} />
                        <View style={styles.productDetails}>
                            <View style={{ width: '50%' }}>
                                <Text style={styles.cardTitle}>Uploaded by</Text>
                                <Text style={styles.cardText}>Suresh Yadav</Text>
                            </View>
                            <View style={{ width: '50%' }}>
                                <Text style={styles.cardTitle}>Uploaded on</Text>
                                <Text style={styles.cardText}>11th Jan 2023</Text>
                            </View>
                        </View>
                        <View style={styles.productDetails}>
                            <View style={{ width: '50%' }}>
                                <Text style={styles.cardTitle}>Status</Text>
                                <Text style={styles.cardText}>Approved</Text>
                            </View>
                            <View style={{ width: '50%' }}>
                                <Text style={styles.cardTitle}>Pts</Text>
                                <Text style={styles.cardText}>5</Text>
                            </View>
                        </View>
                    </View>
                    :
                    null
                }

                {isScreenName === 'Outside' ?
                    <View style={styles.productBox}>
                        <Image source={assets.ProductImage} style={styles.ProductImage} />
                        <View style={styles.productDetails}>
                            <View style={{ width: '50%' }}>
                                <Text style={styles.cardTitle}>Uploaded by</Text>
                                <Text style={styles.cardText}>Suresh Yadav</Text>
                            </View>
                            <View style={{ width: '50%' }}>
                                <Text style={styles.cardTitle}>Uploaded on</Text>
                                <Text style={styles.cardText}>11th Jan 2023</Text>
                            </View>
                        </View>
                        <View style={styles.productDetails}>
                            <View style={{ width: '50%' }}>
                                <Text style={styles.cardTitle}>Status</Text>
                                <Text style={styles.cardText}>Approved</Text>
                            </View>
                            <View style={{ width: '50%' }}>
                                <Text style={styles.cardTitle}>Pts</Text>
                                <Text style={styles.cardText}>5</Text>
                            </View>
                        </View>
                    </View>
                    :
                    null
                }

                {isScreenName === 'Menu' ?

                    <>
                        <ImageBackground style={styles.cardSection} source={assets.cardBgRed} resizeMode="cover">
                            <View style={{
                                padding: 10,
                                flex: 1
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <View style={{ width: '100%', padding: 10 }}>
                                        <Text style={[styles.cardText, { fontSize: SIZES.medium }]}>Coke</Text>
                                    </View>
                                </View>

                            </View>

                            <View style={[styles.cardPointBox]}>
                                <SvgXml xml={CokeIconWhite} width={43} height={46} />
                            </View>
                        </ImageBackground>

                        <ImageBackground style={styles.cardSection} source={assets.cardBgBlack} resizeMode="cover">
                            <View style={{
                                padding: 10,
                                flex: 1
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <View style={{ width: '100%', padding: 10 }}>
                                        <Text style={[styles.cardText, { fontSize: SIZES.medium }]}>Coke Zero</Text>
                                    </View>
                                </View>

                            </View>

                            <View style={[styles.cardPointBox]}>
                                <SvgXml xml={CokeIconRed} width={43} height={46} />
                            </View>
                        </ImageBackground>
                    </>
                    :
                    null
                }
                {/* <View style={styles.productBox}>
                    <Image source={assets.ProductImage} style={styles.ProductImage} />
                    <View style={styles.productDetails}>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.cardTitle}>Uploaded by</Text>
                            <Text style={styles.cardText}>Suresh Yadav</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.cardTitle}>Uploaded on</Text>
                            <Text style={styles.cardText}>11th Jan 2023</Text>
                        </View>
                    </View>
                    <View style={styles.productDetails}>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.cardTitle}>Status</Text>
                            <Text style={styles.cardText}>Approved</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.cardTitle}>Pts</Text>
                            <Text style={styles.cardText}>5</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.productBox}>
                    <Image source={assets.ProductImage} style={styles.ProductImage} />
                    <View style={styles.productDetails}>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.cardTitle}>Uploaded by</Text>
                            <Text style={styles.cardText}>Suresh Yadav</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.cardTitle}>Uploaded on</Text>
                            <Text style={styles.cardText}>11th Jan 2023</Text>
                        </View>
                    </View>
                    <View style={styles.productDetails}>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.cardTitle}>Status</Text>
                            <Text style={styles.cardText}>Approved</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.cardTitle}>Pts</Text>
                            <Text style={styles.cardText}>5</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.productBox}>
                    <Image source={assets.ProductImage} style={styles.ProductImage} />
                    <View style={styles.productDetails}>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.cardTitle}>Uploaded by</Text>
                            <Text style={styles.cardText}>Suresh Yadav</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.cardTitle}>Uploaded on</Text>
                            <Text style={styles.cardText}>11th Jan 2023</Text>
                        </View>
                    </View>
                    <View style={styles.productDetails}>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.cardTitle}>Status</Text>
                            <Text style={styles.cardText}>Approved</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.cardTitle}>Pts</Text>
                            <Text style={styles.cardText}>5</Text>
                        </View>
                    </View>
                </View> */}
            </ScrollView>

        </SafeAreaView>
    )
}

export default UploadPictures

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.brand.background
    },
    pageTitle: {
        textAlign: 'left',
        fontSize: SIZES.mediumLarge,
        fontFamily: FONT.InterBold,
        fontWeight: 700,
        color: COLORS.brand.textColor,
    },
    btnTextGroup: {
        marginTop: 20,
        width: windowWidth - 30,
        marginBottom: 14,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btnView: {
        borderWidth: 1,
        borderColor: COLORS.brand.primary,
        backgroundColor: COLORS.brand.background,
        ...SHADOWS.light,
        marginTop: 6,
        borderRadius: 40 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: 126,
        height: 40,
    },
    btnText: {
        fontFamily: FONT.InterBold,
        color: COLORS.brand.primary,
        fontSize: SIZES.medium,
        fontWeight: 800
    },
    productBox: {
        width: windowWidth - 30,
        alignSelf: 'center',
        marginVertical: 10
    },
    ProductImage: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        width: windowWidth - 30,
    },
    productDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
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
        margin: 6
    },
    cardPointBox: {
        width: '30%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})