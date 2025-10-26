import React from "react";
import {
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    // Removed SafeAreaView from 'react-native'
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
// 1. Import SafeAreaView from the correct package
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

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

// 2. Ensure the component is exported as default
export default function ReservationScreen() { 
    return (
        // Use the correct SafeAreaView. Add edges prop if needed, e.g., edges={['top', 'left', 'right']}
        <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}> 
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.flex}
                // Removed keyboardVerticalOffset, SafeAreaView usually handles this better
            >
                {/* Header */}
                <View style={styles.headerRow}>
                    <TouchableOpacity
                        style={styles.backTouch}
                        onPress={() => router.back()}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="chevron-back" size={26} color="#333" />
                    </TouchableOpacity>
                    {/* Removed duplicate back navigation on title */}
                    <Text style={styles.headerTitle}>Reservation</Text> 
                    <View style={{width: 38}} /> {/* Spacer to balance header */}
                </View>

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled" // Helps dismiss keyboard
                >
                    {/* Progress Indicator */}
                    <View style={styles.progressRow}>
                        <StepIndicator step={1} />
                        <View style={styles.progressLine} />
                        <StepIndicator step={2} inactive />
                        <View style={styles.progressLine} />
                        <StepIndicator step={3} inactive />
                    </View>

                    {/* Form Inputs */}
                    <View style={styles.formContainer}>
                        {INPUT_PLACEHOLDERS.map((ph, index) => ( // Added index
                            <TextInput
                                key={ph}
                                placeholder={ph}
                                placeholderTextColor="#9b9b9b"
                                style={styles.input}
                                keyboardType={
                                    ph === "Mobile Phone" ? "phone-pad" : 
                                    ph.includes("Email") ? "email-address" : 
                                    ph === "Post Code" ? "numeric" : // Added numeric for post code
                                    "default"
                                }
                                // Submit moves to next field, last one is 'done'
                                returnKeyType={index === INPUT_PLACEHOLDERS.length - 1 ? "done" : "next"} 
                                // Add autoCapitalize, autoCompleteType etc. for better UX
                                autoCapitalize={ph.includes("Name") ? "words" : "none"}
                                autoComplete={
                                    ph === "Email Address" ? "email" :
                                    ph === "Mobile Phone" ? "tel" :
                                    ph === "Country" ? "country" :
                                    ph === "Post Code" ? "postal-code" :
                                    "off" // Default off
                                }
                                textContentType={ // Helps with autofill on iOS
                                     ph === "First Name" ? "givenName" :
                                     ph === "Last Name" ? "familyName" :
                                     ph === "Email Address" ? "emailAddress" :
                                     ph === "Address" ? "fullStreetAddress" : // Or streetAddressLine1 etc.
                                     ph === "Post Code" ? "postalCode" :
                                     ph === "Country" ? "countryName" :
                                     ph === "Mobile Phone" ? "telephoneNumber" :
                                     "none"
                                }
                            />
                        ))}
                    </View>

                    {/* Spacer */}
                    <View style={{ height: 90 }} />
                </ScrollView>

                {/* Footer Button */}
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
                            // Navigate to the correct path based on your file structure
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

// (StepIndicator component remains the same)
function StepIndicator({ step, inactive }: { step: number; inactive?: boolean }) {
    const filled = !inactive;
    const circleSize = 36;
    return (
        <View style={{ alignItems: "center" }}>
            <View
                style={[
                    styles.stepCircle,
                    {
                        width: circleSize, height: circleSize, borderRadius: circleSize / 2,
                        backgroundColor: filled ? "#3aa06a" : "#ececec",
                        borderWidth: filled ? 0 : 1, borderColor: "#dddddd",
                    },
                ]}
            >
                <Text style={[styles.stepText, { color: filled ? "#fff" : "#aaa" }]}>{step}</Text>
            </View>
        </View>
    );
}

// (Styles remain mostly the same, adjusted header padding)
const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    flex: { flex: 1 },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between', // Center title properly
        paddingHorizontal: 16,
        paddingTop: 10, // Reduced top padding (SafeAreaView handles top space)
        paddingBottom: 10, // Added bottom padding
        borderBottomWidth: 1, // Optional: Add a subtle separator
        borderBottomColor: '#f0f0f0', // Light separator color
    },
    backTouch: {
        padding: 6, // Increase tap area
    },
    headerTitle: {
        fontSize: 20, // Slightly smaller title
        fontWeight: "600", // Adjusted weight
        color: "#333333",
        textAlign: 'center',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20, // Increased top padding
        paddingBottom: 100, // Ensure space for button at the bottom
    },
    progressRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center', // Center the progress indicator
        marginBottom: 30, // Increased margin
        paddingHorizontal: 6,
    },
    progressLine: {
        height: 2,
        flex: 1, // Use flex to fill space instead of fixed width
        maxWidth: 80, // Set a max width
        backgroundColor: "#ececec",
        marginHorizontal: 8, // Reduced margin
        borderRadius: 2,
    },
    stepCircle: {
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.08, // Increased opacity slightly
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 2, // Increased elevation
    },
    stepText: {
        fontSize: 16,
        fontWeight: "700",
    },
    formContainer: {
        marginTop: 10, // Increased top margin
    },
    input: {
        height: 52,
        backgroundColor: "#f7f7f7", // Slightly different background
        borderRadius: 10, // Slightly less rounded
        paddingHorizontal: 16,
        marginBottom: 16, // Increased spacing
        fontSize: 15,
        color: "#222",
        borderWidth: 1, // Use border instead of shadow for inputs
        borderColor: "#e0e0e0", // Light border
    },
    footer: {
        position: "absolute",
        left: 16,
        right: 16,
        // Adjust bottom based on SafeAreaView, or use padding in ScrollView contentContainerStyle
        bottom: Platform.OS === 'ios' ? 30 : 20, 
        alignItems: "center",
    },
    gradientButton: {
        width: "100%",
        borderRadius: 12,
        shadowColor: "#3aa06a",
        shadowOffset: { width: 0, height: 4 }, // Adjusted shadow
        shadowOpacity: 0.15, // Adjusted opacity
        shadowRadius: 8, // Adjusted radius
        elevation: 4, // Increased elevation
    },
    gradientInner: {
        paddingVertical: 16, // Slightly less padding
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "700", // Adjusted weight
        fontSize: 17, // Adjusted size
    },
});