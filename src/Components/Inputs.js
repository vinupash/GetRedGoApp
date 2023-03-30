import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Dimensions
} from 'react-native';
import { COLORS, FONT, SIZES } from '../Constants';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Input = ({
    props,
    name,
    maxLength,
    placeholder,
    value,
    setValue,
    keyboardType,
    secureTextEntry = false,
    placeholderTextColor,
    autoCapitalize,
    label
}) => {
    return (
        <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>{label}</Text>
            <View style={styles.inputBox}>
                <TextInput
                    style={styles.inputStyle}
                    placeholder={placeholder}
                    placeholderTextColor='#A3A3A3'
                    onChangeText={(text) => setValue(text)}
                    value={value}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                    autoCapitalize={autoCapitalize}
                />
            </View>
        </View>
    )
}

export const CustomTextArea = ({
    props,
    name,
    maxLength,
    placeholder,
    value,
    setValue,
    keyboardType,
    // secureTextEntry = false,
    editable,
    autoFocus,
    autoCapitalize,
    placeholderTextColor,
    multiline,
    numberOfLines,
    label
}) => {
    return (
        <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>{label}</Text>
            <View style={styles.inputBoxText}>
                <TextInput
                    style={styles.inputStyle}
                    placeholder={placeholder}
                    placeholderTextColor='#A3A3A3'
                    onChangeText={(text) => setValue(text)}
                    value={value}
                    // secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                    editable={editable}
                    autoFocus={autoFocus}
                    autoCapitalize={autoCapitalize}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputSection: {
        width: windowWidth - 30,
    },
    inputLabel: {
        fontFamily: FONT.InterRegular,
        fontSize: SIZES.small,
        textAlign: 'left',
        lineHeight: 18,
        color: COLORS.brand.labelText,
        marginBottom: 5,
    },
    inputBox: {
        height: 45,
        width: '100%',
        borderWidth: 1,
        backgroundColor: COLORS.brand.white,
        borderColor: '#E0E0E0',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 2,
    },
    inputBoxText: {
        width: '100%',
        borderWidth: 1,
        backgroundColor: COLORS.brand.white,
        borderColor: '#E0E0E0',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 2,
    },
    inputStyle: {
        fontFamily: FONT.InterRegular,
        fontSize: SIZES.font,
        color: COLORS.brand.textColor,
        flex: 1,
        textAlignVertical: 'top',
    },
})