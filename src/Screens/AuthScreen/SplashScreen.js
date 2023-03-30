import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { COLORS } from '../../Constants';
import { SvgXml } from 'react-native-svg';
import Logo from '../../../assets/images/Logo';

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar
                barStyle='light-content'
                backgroundColor={COLORS.brand.background}
            />
            <SvgXml xml={Logo} width={123} height={40} />
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.brand.background
    }
})    