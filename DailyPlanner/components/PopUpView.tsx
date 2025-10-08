import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { Calendar } from 'react-native-calendars'
import RNPickerSelect from 'react-native-picker-select';


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

type PopUpViewProps = {
    children?: ReactNode;
    selectedDate?: string;
    yPos: Animated.Value;
    onClose: () => void;
    style?: any;
};

export default function PopUpView({ children, selectedDate, yPos, onClose, style }: PopUpViewProps) {
    const [selected, setSelected] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <Animated.View style={[
            styles.container, 
            style, 
            {
                transform: [{translateY: yPos}]
            }
        ]}>
            <Text>New Task</Text>
            <View style={styles.section}>
                <View style={styles.row}>
                    <Text>All day</Text>
                    <Switch 
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <View style={styles.row}>
                    <Text>Start Date</Text>
                    <Text>
                        {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text>End Date</Text>
                    <Text>{selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}</Text>
                </View>
                <View style={styles.row}>
                    <Text>Frequency</Text>
                    <RNPickerSelect
                        onValueChange={(value) => console.log(value)}
                        items={[
                            { color: 'black', label: 'Every Day', value: 'every-day' },
                            { color: 'black', label: 'Weekdays', value: 'weekdays' },
                            { color: 'black', label: 'Weekends', value: 'weekends' },
                            { color: 'black', label: 'Every Week', value: 'every-week' },
                            { color: 'black', label: 'Every 2 Weeks', value: 'every-2-weeks' },
                            { color: 'black', label: 'Every Month', value: 'every-month' },
                            { color: 'black', label: 'Every 2 Months', value: 'every-2-months' },
                            { color: 'black', label: 'Every 3 Months', value: 'every-3-months' },
                            { color: 'black', label: 'Every 6 Months', value: 'every-6-months' },
                            { color: 'black', label: 'Every Year', value: 'every-year' },
                        ]}
                        placeholder={{ color: 'black', label: 'Select frequency...', value: null }}
                        style={{
                            inputIOSContainer: {
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                                borderWidth: 1,
                                borderColor: 'gray',
                                borderRadius: 8,
                                paddingRight: 30,
                                overflow: 'hidden',
                            },
                            inputIOS: {
                                color: "black",
                                fontSize: 16,
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                            },
                            placeholder: { 
                                color: 'black'
                            }
                        }}
                    />
                </View>
            </View>
            <Pressable onPress={onClose}>
                <Text>X</Text>
            </Pressable>
            <Calendar
                style={{
                    borderWidth: 1,
                    borderColor: 'gray',
                    height: 350,
                }}
                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#00adf5',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#dd99ee'
                }}
                onDayPress={day => {
                    setSelected(day.dateString);
                    console.log(day.dateString);
                }}
                markedDates={{
                    [selected]: {selected: true, disableTouchEvent: true, selectedColor: 'orange'}
                }}
                />
            {children}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 5
    },
    section: {
        flexDirection: "column",
        backgroundColor: "gray",
        width: "90%",
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    row: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        padding: 10,
        alignItems: "center",
    }
})