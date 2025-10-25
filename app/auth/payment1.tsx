// components/payment1.tsx
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import {router} from "expo-router";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const INPUT_PLACEHOLDERS = [
    "First Name",
    "Last Name",
    "Email Address",
    "Address",
    "Post Code",
    "Country",
    "Mobile Phone",
];

export default function ReservationScreen() {
    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.flex}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            >
                <View style={styles.headerRow}>
                    <TouchableOpacity
                        style={styles.backTouch}
                        onPress={() => router.back()}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="chevron-back" size={26} color="#333" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
                        <Text style={styles.headerTitle}>Reservation</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.progressRow}>
                        <StepIndicator step={1} />
                        <View style={styles.progressLine} />
                        <StepIndicator step={2} inactive />
                        <View style={styles.progressLine} />
                        <StepIndicator step={3} inactive />
                    </View>

                    <View style={styles.formContainer}>
                        {INPUT_PLACEHOLDERS.map((ph) => (
                            <TextInput
                                key={ph}
                                placeholder={ph}
                                placeholderTextColor="#9b9b9b"
                                style={styles.input}
                                keyboardType={
                                    ph === "Mobile Phone" ? "phone-pad" : ph.includes("Email") ? "email-address" : "default"
                                }
                                returnKeyType="next"
                            />
                        ))}
                    </View>

                    {/* spacer so the gradient button doesn't overlap content */}
                    <View style={{ height: 90 }} />
                </ScrollView>

                <View style={styles.footer}>
                    <LinearGradient
                        colors={["#3aa06a", "#b4f78a"]}
                        start={[0, 0]}
                        end={[1, 1]}
                        style={styles.gradientButton}
                    >

                        <TouchableOpacity
                            style={styles.gradientInner}
                            activeOpacity={0.85}
                            onPress={() => router.push("/payment2")}
                        >
                            <Text style={styles.buttonText}>Go to Payment</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

/* Small step indicator component */
function StepIndicator({ step, inactive }: { step: number; inactive?: boolean }) {
    const filled = !inactive;
    const circleSize = 36;
    return (
        <View style={{ alignItems: "center" }}>
            <View
                style={[
                    styles.stepCircle,
                    {
                        width: circleSize,
                        height: circleSize,
                        borderRadius: circleSize / 2,
                        backgroundColor: filled ? "#3aa06a" : "#ececec",
                        borderWidth: filled ? 0 : 1,
                        borderColor: "#dddddd",
                    },
                ]}
            >
                <Text style={[styles.stepText, { color: filled ? "#fff" : "#aaa" }]}>{step}</Text>
            </View>
        </View>
    );
}

/* Styles */
const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    flex: { flex: 1 },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 6,
    },
    backTouch: {
        padding: 6,
        marginRight: 6,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#333333",
        marginLeft: 6,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 14,
        paddingBottom: 10,
    },
    progressRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24,
        paddingHorizontal: 6,
    },
    progressLine: {
        height: 2,
        width: (SCREEN_WIDTH - 160) / 3, // flexible line length between steps
        backgroundColor: "#ececec",
        marginHorizontal: 10,
        borderRadius: 2,
    },
    stepCircle: {
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 1,
    },
    stepText: {
        fontSize: 16,
        fontWeight: "700",
    },
    formContainer: {
        marginTop: 6,
    },
    input: {
        height: 52,
        backgroundColor: "#f3f3f3",
        borderRadius: 12,
        paddingHorizontal: 16,
        marginBottom: 14,
        fontSize: 15,
        color: "#222",
        // subtle inner shadow on iOS is not straightforward; we make it look soft with elevation and border
        borderWidth: 0.3,
        borderColor: "#e6e6e6",
    },
    footer: {
        position: "absolute",
        left: 16,
        right: 16,
        bottom: 18,
        alignItems: "center",
    },
    gradientButton: {
        width: "100%",
        borderRadius: 12,
        shadowColor: "#3aa06a",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 3,
    },
    gradientInner: {
        paddingVertical: 18,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "800",
        fontSize: 18,
    },
});
