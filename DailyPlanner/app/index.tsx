import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Index() {
  const insets = useSafeAreaInsets();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<{ day: number; monthOffset: number } | null>(
    null
  );

  const getDaysInMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const generateCalendar = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = getDaysInMonth(date);
    const prevMonth = new Date(year, month - 1, 1);
    const daysInPrevMonth = getDaysInMonth(prevMonth);

    const weeks: { day: number; inMonth: boolean }[][] = [];
    let week: { day: number; inMonth: boolean }[] = [];

    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      week.push({ day: daysInPrevMonth - i, inMonth: false });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      week.push({ day, inMonth: true });
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }

    let nextDay = 1;
    while (week.length > 0 && week.length < 7) {
      week.push({ day: nextDay++, inMonth: false });
    }
    if (week.length) weeks.push(week);

    return weeks;
  };

  const weeks = generateCalendar(currentDate);

  const screenHeight = Dimensions.get("window").height;
  const headerHeight = 80;
  const weekdayHeaderHeight = 30;
  const tabBarHeight = 50;
  const availableHeight =
    screenHeight - insets.top - insets.bottom - headerHeight - weekdayHeaderHeight - tabBarHeight;
  const rowHeight = availableHeight / weeks.length;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        {/* Month navigation */}
        <View style={styles.nav}>
          <Text style={styles.navText}>◀</Text>
          <Text style={styles.monthText}>
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
            {currentDate.getFullYear()}
          </Text>
          <Text style={styles.navText}>▶</Text>
        </View>

        {/* Days of week header */}
        <View style={styles.weekHeader}>
          {daysOfWeek.map((day) => (
            <Text key={day} style={styles.weekDay}>
              {day}
            </Text>
          ))}
        </View>

        {/* Calendar grid */}
        {weeks.map((week, i) => (
          <View key={i} style={[styles.weekRow, { height: rowHeight }]}>
            {week.map((d, j) => {
              const isSelected =
                selectedDay &&
                selectedDay.day === d.day &&
                selectedDay.monthOffset === (d.inMonth ? 0 : d.inMonth ? 0 : -1); // -1 for prev month, 0 for current, 1 for next
              return (
                <Pressable
                  key={j}
                  style={[
                    styles.dayCell,
                    !d.inMonth && styles.outsideMonth,
                    isSelected && styles.selectedDay,
                  ]}
                  onPress={() => setSelectedDay({ day: d.day, monthOffset: d.inMonth ? 0 : -1 })}
                >
                  <Text
                    style={[
                      styles.dayText,
                      !d.inMonth && styles.outsideMonthText,
                      isSelected && styles.selectedDayText,
                    ]}
                  >
                    {d.day}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  nav: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  navText: { fontSize: 20, fontWeight: "bold" },
  monthText: { fontSize: 18, fontWeight: "600" },
  weekHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  weekDay: { flex: 1, textAlign: "center", fontWeight: "600" },
  weekRow: { flexDirection: "row" },
  dayCell: {
    flex: 1,
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#eee",
    margin: 1,
    paddingTop: 10,
  },
  dayText: { fontSize: 16 },
  outsideMonth: { backgroundColor: "#f0f0f0" },
  outsideMonthText: { color: "#aaa" },
  selectedDay: { backgroundColor: "black", borderRadius: 6 },
  selectedDayText: { color: "white", fontWeight: "bold" },
});
