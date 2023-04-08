import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { SvgXml } from 'react-native-svg';
import CardIcon from '../../assets/images/CardIcon';
import { COLORS, FONT, SHADOWS, SIZES } from '../Constants';
import Coke from '../../assets/images/Coke';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Card = ({
    userPoints,
    registerd,
    unregisterd
}) => {
    return (
        <View style={styles.cardBox}>
            <View style={{ width: '35%', minHeight: 112, justifyContent: 'center', padding: 20 }}>
                <Text style={styles.cardTitle}>Points</Text>
                <Text
                    style={styles.CardPoint}
                >
                    {userPoints}
                </Text>
            </View>
            <View style={{ width: '35%', minHeight: 112, justifyContent: 'center', padding: 20 }}>
                <Text style={styles.cardTitle}>Customers</Text>
                <Text
                    style={styles.CardPoint}
                >
                    {registerd}
                </Text>
            </View>
            <View style={{ width: '30%', height: '100%', alignItems: 'center', position: 'relative' }}>
                <SvgXml xml={Coke} height={124} width={38} style={{ position: 'absolute', top: -25 }} />
            </View>
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    cardBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: windowWidth - 30,
        alignSelf: 'center',
        minHeight: 112,
        backgroundColor: COLORS.brand.primary,
        borderRadius: 10,
        marginBottom: 5,
        ...SHADOWS.light,
        marginTop: 10
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
        fontWeight: '700',
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