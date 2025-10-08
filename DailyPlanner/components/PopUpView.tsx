import React, { ReactNode, use, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { Calendar } from 'react-native-calendars'
import RNPickerSelect from 'react-native-picker-select';
import { SafeAreaView } from "react-native-safe-area-context";


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

type PopUpViewProps = {
    children?: ReactNode;
    selectedDate: string;
    yPos: Animated.Value;
    onClose: () => void;
    style?: any;
};

export default function PopUpView({ children, selectedDate, yPos, onClose, style }: PopUpViewProps) {
    const [selected, setSelected] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const [openCalendar, setOpenCalendar] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const opacity = useRef(new Animated.Value(0)).current;
    const calendarViewHeight = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        setSelected(selectedDate);
    }, [selectedDate]);

    function toggleCalendarView() {
        const nextOpen = !openCalendar;
        
        Animated.timing(opacity, {
            toValue: nextOpen ? 1 : 0, // use nextOpen instead of openCalendar
            useNativeDriver: false,
            duration: 700,
        }).start();
        
        Animated.timing(calendarViewHeight, {
            toValue: nextOpen ? 350 : 0,
            useNativeDriver: false,
            duration: 500,
        }).start();

        setOpenCalendar(nextOpen);
    }      

    function getDateDisplay(dateString: string) {
        return new Date(dateString + "T00:00").toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    return (
        <Animated.View style={[
            styles.container, 
            style, 
            {
                transform: [{translateY: yPos}]
            }
        ]}>
            <SafeAreaView>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                >
                    <Text>Task for {getDateDisplay(selectedDate)}</Text>
                    <Animated.View style={styles.section}>
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
                            <Pressable onPress={() => toggleCalendarView()}>
                                <Text>
                                    {getDateDisplay(selected)}
                                </Text>
                            </Pressable>
                        </View>
                        {
                            <Animated.View style={[
                                styles.row, 
                                styles.calendarContainer,
                                { height: calendarViewHeight, padding: openCalendar ? 10 : 0}
                            ]}>
                                <Animated.View style={{ opacity: opacity }}>
                                    <Calendar
                                        style={[styles.calendar, { display: openCalendar ? 'flex' : 'none' }]}
                                        theme={{
                                            backgroundColor: 'gray',
                                            calendarBackground: 'gray',
                                            textSectionTitleColor: 'black',
                                            selectedDayTextColor: 'white',
                                            selectedDayBackgroundColor: 'black',
                                            dayTextColor: 'black',
                                            textDisabledColor: '#c9c7c9',
                                            arrowColor: 'black',
                                            monthTextColor: 'black',
                                            textMonthFontWeight: 'bold',
                                            todayTextColor: 'black',
                                            todayBackgroundColor: 'gray',
                                        }}
                                        onDayPress={day => {
                                            setSelected(day.dateString);
                                            console.log(day.dateString);
                                        }}
                                        markedDates={{
                                            [selected]: {selected: true, disableTouchEvent: true, selectedColor: 'black'}
                                        }}
                                    />
                                </Animated.View>
                            </Animated.View>
                        }
                        <View style={styles.row}>
                            <Text>End Date</Text>
                            <Text>{selectedDate ? new Date(selectedDate + "T00:00").toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}</Text>
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
                                    { color: 'black', label: 'Custom', value: 'custom' },
                                ]}
                                placeholder={{ color: 'black', label: 'Select frequency...', value: 'none' }}
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
                    </Animated.View>
                    <Pressable onPress={onClose}>
                        <Text>X</Text>
                    </Pressable>
                    {children}
                </ScrollView>
            </SafeAreaView>
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
    scrollContent: {
        flexGrow: 1,
        padding: 10,
        justifyContent: "center",
        alignItems: "center"
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
    },
    calendarContainer: {
        justifyContent: 'center',
    },
    calendar: {
        width: SCREEN_WIDTH * 0.8,
    }
})