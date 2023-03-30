import React from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import { SvgXml } from 'react-native-svg';
import Menu from '../../assets/images/Menu';
import Logo from '../../assets/images/Logo';
import { SHADOWS } from '../Constants';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Header = ({
    onPress
}) => {
    return (
        <View style={styles.headerBar}>
            <TouchableOpacity onPress={onPress} style={{ height: 40, width: 40, justifyContent: 'center' }}>
                <SvgXml xml={Menu} width={28} height={28} />
            </TouchableOpacity>
            <SvgXml xml={Logo} width={75} height={24} />
            <View style={{ height: 40, width: 40 }}>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
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