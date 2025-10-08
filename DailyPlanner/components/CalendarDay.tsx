import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  Dimensions,
  findNodeHandle,
} from "react-native";
import TaskView from "./PopUpView";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function CalendarDay({ day }: { day: number }) {

  const animTop = useRef(new Animated.Value(0)).current;
  const animLeft = useRef(new Animated.Value(0)).current;
  const animWidth = useRef(new Animated.Value(0)).current;
  const animHeight = useRef(new Animated.Value(0)).current;

  return (
    <Pressable>

    </Pressable>
  );
}
