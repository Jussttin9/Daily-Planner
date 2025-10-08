import React, { ReactNode, useEffect, useRef } from "react";
import { Animated, Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

type PopUpViewProps = {
    children?: ReactNode;
    yPos: Animated.Value;
    onClose: () => void;
    style?: any;
};

export default function PopUpView({ children, yPos, onClose, style }: PopUpViewProps) {
    return (
        <Animated.View style={[
            styles.container, 
            style, 
            {
                transform: [{translateY: yPos}]
            }
        ]}>
            <Pressable onPress={onClose}>
                <Text>X</Text>
            </Pressable>
            {children}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "aqua",
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 5
    }
})