import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Btn({
    bgColor = 'cornflowerblue',
    label,
    disabled,
    onPress,
    style,
    color = 'white',
    fontSize,
}) {
    return (
        <TouchableOpacity
            style={[styles.btnBox, style, { backgroundColor: bgColor }]}
            disabled={disabled}
            onPress={onPress}>
            <Text style={{ color: color, fontSize: fontSize }}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btnBox: {
        padding: 12,
        alignItems: 'center',
        borderRadius: 12,
        marginTop: 40,
    },
});
