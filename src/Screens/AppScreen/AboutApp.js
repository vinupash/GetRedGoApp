import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import Header from '../../Components/Header'
import { COLORS, FONT, SHADOWS, SIZES } from '../../Constants'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { WebView } from 'react-native-webview';
import { baseUrl } from '../../Constants/Api';
import { SvgXml } from 'react-native-svg';
import Menu from '../../../assets/images/Menu';
import Logo from '../../../assets/images/Logo';

const AboutApp = ({ navigation }) => {
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
            <WebView source={{ uri: 'https://demo.crayoninfotech.com/cocacola/register/about' }} style={{ flex: 1, paddingTop: 50 }} />
            {/* <Text style={styles.pageTitle}>About App</Text> */}

            {/* <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.inputSection}>
                    <Text style={styles.pageText}>Lorem ipsum dolor sit amet consectetur. Porttitor aenean quis sem et vitae posuere arcu. Proin aliquet egestas odio sed pharetra porttitor. In nisl phasellus mi tristique sed diam diam magnis aenean. Leo nunc at est sem nibh. In ipsum dictum id quam ultrices purus quis. Adipiscing risus tellus pellentesque amet malesuada ac congue massa. Mi viverra diam mi velit est. Amet purus ultrices elit mattis sit massa magna in. Cursus suscipit morbi posuere quis sit dictumst. Quam arcu quis et id massa vitae praesent in bibendum. Augue ipsum est massa eu etiam eget ligula varius ut. Sit ipsum lectus commodo lacinia semper donec sit commodo.</Text>
                    <Text style={styles.pageSubTitle}>Services Provided by TractorPaisa</Text>

                    <View style={styles.pageList}>
                        <View style={styles.pointBox}>
                            <View style={styles.point}></View>
                        </View>
                        <View style={styles.textBox}>
                            <Text style={styles.pageText}>Lorem ipsum dolor sit amet consectetur. Porttitor aenean quis sem et vitae posuere arcu. Proin aliquet egestas odio sed pharetra porttitor. In nisl phasellus mi tristique sed diam diam magnis aenean. Leo nunc at est sem nibh. In ipsum dictum id quam ultrices purus quis.</Text>
                        </View>
                    </View>

                    <View style={styles.pageList}>
                        <View style={styles.pointBox}>
                            <View style={styles.point}></View>
                        </View>
                        <View style={styles.textBox}>
                            <Text style={styles.pageText}>Lorem ipsum dolor sit amet consectetur. Porttitor aenean quis sem et vitae posuere arcu. Proin aliquet egestas odio sed pharetra porttitor. In nisl phasellus mi tristique sed diam diam magnis aenean. Leo nunc at est sem nibh. In ipsum dictum id quam ultrices purus quis.</Text>
                        </View>
                    </View>

                    <View style={styles.pageList}>
                        <View style={styles.pointBox}>
                            <View style={styles.point}></View>
                        </View>
                        <View style={styles.textBox}>
                            <Text style={styles.pageText}>Lorem ipsum dolor sit amet consectetur. Porttitor aenean quis sem et vitae posuere arcu. Proin aliquet egestas odio sed pharetra porttitor. In nisl phasellus mi tristique sed diam diam magnis aenean. Leo nunc at est sem nibh. In ipsum dictum id quam ultrices purus quis.</Text>
                        </View>
                    </View>

                    <View style={styles.pageList}>
                        <View style={styles.pointBox}>
                            <View style={styles.point}></View>
                        </View>
                        <View style={styles.textBox}>
                            <Text style={styles.pageText}>Lorem ipsum dolor sit amet consectetur. Porttitor aenean quis sem et vitae posuere arcu. Proin aliquet egestas odio sed pharetra porttitor. In nisl phasellus mi tristique sed diam diam magnis aenean. Leo nunc at est sem nibh. In ipsum dictum id quam ultrices purus quis.</Text>
                        </View>
                    </View>
                </View>
            </ScrollView> */}
        </SafeAreaView>
    )
}

export default AboutApp

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
    pageText: {
        fontFamily: FONT.InterRegular,
        fontSize: SIZES.medium,
        color: COLORS.brand.textColor,
        lineHeight: 22
    },
    pageSubTitle: {
        textAlign: 'left',
        fontSize: SIZES.mediumLarge,
        fontFamily: FONT.InterBold,
        fontWeight: 700,
        color: COLORS.brand.textColor,
        paddingTop: 20,
        paddingBottom: 10
    },
    pageList: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10
    },
    pointBox: {
        width: 25,
        alignItems: 'center'
    },
    textBox: {
        flex: 1,
    },
    point: {
        width: 6,
        height: 6,
        borderRadius: 6 / 2,
        backgroundColor: COLORS.brand.black,
        marginTop: 6
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