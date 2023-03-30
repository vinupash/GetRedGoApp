import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { SvgXml } from 'react-native-svg';
import CardIcon from '../../assets/images/CardIcon';
import { COLORS, FONT, SHADOWS, SIZES } from '../Constants';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Card = ({
    userPoints,
    registerd,
    unregisterd
}) => {
    return (
        <LinearGradient
            start={{ x: 0, y: 0.25 }} end={{ x: 0.5, y: 1.8 }}
            colors={['#660C12', '#B83808', '#F5AD1D']}
            style={styles.cardBox}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <View style={{ flex: 1, marginRight: 10 }}>
                    <Text style={styles.cardTitle}>Points</Text>
                    <Text style={styles.CardPoint}>{userPoints}</Text>
                    <Text style={styles.cardSubText}>48 Points more to go</Text>
                </View>
                <SvgXml xml={CardIcon} width={56} height={40} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <View style={{ width: '49%' }}>
                    <Text style={styles.cardTitle}>Registered</Text>
                    <Text style={styles.cardCustomersPoint}>{registerd}</Text>
                </View>
                <View style={{ width: '49%' }}>
                    <Text style={styles.cardTitle}>Unregisterd</Text>
                    <Text style={styles.cardCustomersPoint}>{unregisterd}</Text>
                </View>
                {/* <View style={{ width: '33%' }}>
                    <Text style={styles.cardTitle}>Customers</Text>
                    <Text style={styles.cardCustomersPoint}>60</Text>
                </View> */}
            </View>
        </LinearGradient>
    )
}

export default Card

const styles = StyleSheet.create({
    cardBox: {
        width: windowWidth - 30,
        alignSelf: 'center',
        minHeight: 130,
        paddingHorizontal: 16,
        paddingVertical: 20,
        borderRadius: 8,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginVertical: 10,
        ...SHADOWS.light
    },
    cardTitle: {
        fontSize: SIZES.medium,
        color: COLORS.brand.white,
        fontWeight: '400',
        fontFamily: FONT.InterRegular
    },
    cardCustomersPoint: {
        fontSize: SIZES.mediumLarge,
        color: COLORS.brand.white,
        fontWeight: '800',
        fontFamily: FONT.InterBold
    },
    CardPoint: {
        fontSize: SIZES.extraLarge,
        color: COLORS.brand.white,
        fontWeight: '800',
        fontFamily: FONT.InterBold,
        marginBottom: 5
    },
    cardSubText: {
        fontSize: SIZES.small,
        color: '#FFFFFF',
        fontWeight: '400',
        fontFamily: FONT.InterRegular,
        marginBottom: 30
    }
})