import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";

interface ToggleSwitchProps {
    isEnabled: boolean;
    toggleSwitch: () => void;
}

export function ToggleSwitch({ isEnabled, toggleSwitch }: ToggleSwitchProps) {
    const slideAnim = useRef(new Animated.Value(isEnabled ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: isEnabled ? 1 : 0,
            duration: 250,
            useNativeDriver: false,
        }).start();
    }, [isEnabled, slideAnim]);

    const backgroundColor = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["#D1D5DB", "#0047AB"],
    });

    const translateX = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 20],
    });

    return (
        <Pressable onPress={toggleSwitch} style={styles.container}>
            <Animated.View style={[styles.track, { backgroundColor }]}>
                <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]} />
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    track: {
        width: 48,
        height: 28,
        borderRadius: 14,
        padding: 2,
        justifyContent: "center",
    },
    thumb: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "#ffffff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 3,
    },
});
