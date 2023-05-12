import React, { useState } from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function SelectPicker({
    label,
    placeholder = 'Please Select',
    selected,
    handleValueChange,
    options,
    style,
}) {
    const [showPicker, setShowPicker] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState(selected || placeholder);
    
    const handlePickerClick = () => {
        if (!showPicker) {
            setShowPicker(true);
        }
    };
    
    const handlePickerChange = (value, index) => {
        handleValueChange(value);
        setSelectedLabel(options[index].label);
        setShowPicker(false);
    };

    return (
        <View style={[{ flexDirection: 'column' }, style]}>
            <Text
                style={{
                    color: 'black',
                    zIndex: 10,
                    marginLeft: 7,
                    marginBottom: 7,
                    marginTop: 15,
                    fontSize: 14,
                }}>
                {label}
            </Text>
            <View
                style={{
                    borderRadius: 12,
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: '#00000066',
                    flexDirection: 'column',
                }}
                onStartShouldSetResponder={handlePickerClick}
            >
                <Text style={styles.selectedValue}>{selectedLabel}</Text>
                {showPicker && (
                    <Picker
                        selectedValue={selected}
                        onValueChange={handlePickerChange}
                    >
                        {options &&
                            options.length > 0 &&
                            options.map(option => (
                                <Picker.Item
                                    key={option.value}
                                    label={option.label}
                                    value={option.value}
                                />
                            ))}
                    </Picker>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    selectedValue: {
        paddingVertical: 10,
        paddingHorizontal: 5, // changed from 5
        fontSize: 14,
        color: 'black',
    },
});