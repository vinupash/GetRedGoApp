import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { FONT, SIZES, SHADOWS, COLORS } from '../Constants';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const PrimaryBtn = ({
    onPress,
    btnText
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.85}
            style={styles.primaryBtn}
            onPress={onPress}
        >
            <Text style={styles.primaryBtnText}>{btnText}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    primaryBtn: {
        width: windowWidth - 30,
        paddingVertical: 14,
        borderRadius: 5,
        marginBottom: 5,
        ...SHADOWS.lightPrimary,
        backgroundColor: COLORS.brand.primary,
    },
    primaryBtnText: {
        textAlign: 'center',
        fontFamily: FONT.InterMedium,
        fontSize: SIZES.medium,
        color: COLORS.brand.white,
        lineHeight: 22,
        fontWeight: '600'
    },
})