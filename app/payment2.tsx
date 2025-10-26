import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    // Removed SafeAreaView from 'react-native'
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
// 1. Import SafeAreaView from the correct package
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
// 2. Import useRouter
import { useRouter } from "expo-router";

// 3. Ensure the component is exported as default
export default function PaymentScreen() {
    // 4. Initialize useRouter
    const router = useRouter();

    const [saveCard, setSaveCard] = useState(false);

    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCVV, setCardCVV] = useState("");

    /* ------------ Helpers ------------ */
    const formatCardNumber = (raw: string) => {
        const digits = raw.replace(/\D/g, "").slice(0, 16);
        return digits.replace(/(.{4})/g, "$1 ").trim();
    };

    const formatExpiry = (raw: string) => {
        const digits = raw.replace(/\D/g, "").slice(0, 4);
        if (digits.length <= 2) { return digits; }
        return digits.slice(0, 2) + "/" + digits.slice(2);
    };

    const formatCVV = (raw: string) => raw.replace(/\D/g, "").slice(0, 4);

    /* ------------ Handlers ------------ */
    const handleCardNumberChange = (text: string) => {
        setCardNumber(formatCardNumber(text));
    };

    const handleExpiryChange = (text: string) => {
        const formatted = formatExpiry(text);
        if (formatted.length >= 2 && !formatted.includes("/")) {
            const mm = parseInt(formatted.slice(0, 2), 10);
            if (mm > 12) {
                setCardExpiry("12" + (formatted.length > 2 ? "/" + formatted.slice(2) : ""));
                return;
            } else if (mm === 0) { // Prevent month from being 00
                 setCardExpiry("01" + (formatted.length > 2 ? "/" + formatted.slice(2) : ""));
                 return;
            }
        }
        setCardExpiry(formatted);
    };

    const handleCVVChange = (text: string) => {
        setCardCVV(formatCVV(text));
    };

    /* ------------ Render ------------ */
    return (
        // Use the correct SafeAreaView
        <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.flex}
            >
                {/* Header */}
                <View style={styles.headerRow}>
                    {/* 5. Use router.back() */}
                    <TouchableOpacity onPress={() => router.back()} style={styles.backTouch}>
                        <Ionicons name="chevron-back" size={26} color="#333" />
                    </TouchableOpacity>
                    {/* Title doesn't need back navigation */}
                    <Text style={styles.headerTitle}>Payment</Text>
                    <View style={{width: 38}} /> {/* Spacer */}
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Step Indicator */}
                    <View style={styles.progressRow}>
                        <StepIndicator step={1} completed />
                        <View style={styles.progressLine} />
                        <StepIndicator step={2} />
                        <View style={styles.progressLine} />
                        <StepIndicator step={3} inactive />
                    </View>

                    {/* Credit Card Mock */}
                    <LinearGradient colors={["#3f3f3f", "#2c2c2c"]} start={[0, 0]} end={[1, 1]} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View style={styles.cardChip} />
                            <Text style={styles.cardBrand}>VISA</Text> {/* Or detect dynamically */}
                        </View>
                        <Text style={styles.cardNumber}>
                            {cardNumber ? cardNumber : "**** **** **** ****"} {/* Placeholder */}
                        </Text>
                        <View style={styles.cardFooter}>
                            <Text style={styles.cardName}>{cardName ? cardName.toUpperCase() : "CARDHOLDER NAME"}</Text>
                            <Text style={styles.cardExpiry}>{cardExpiry ? cardExpiry : "MM/YY"}</Text>
                        </View>
                    </LinearGradient>

                    {/* Payment Form */}
                    <View style={styles.form}>
                        <TextInput
                            placeholder="Card Number"
                            placeholderTextColor="#9b9b9b"
                            style={styles.input}
                            keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
                            value={cardNumber}
                            onChangeText={handleCardNumberChange}
                            maxLength={19} // 16 digits + 3 spaces
                            returnKeyType="next"
                            accessibilityLabel="Card number input"
                        />
                        <View style={styles.row}>
                            <TextInput
                                placeholder="Expiry (MM/YY)"
                                placeholderTextColor="#9b9b9b"
                                style={[styles.input, styles.halfInput, { marginRight: 10 }]}
                                keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
                                value={cardExpiry}
                                onChangeText={handleExpiryChange}
                                maxLength={5}
                                returnKeyType="next"
                                accessibilityLabel="Expiry date input"
                            />
                            <TextInput
                                placeholder="CVV"
                                placeholderTextColor="#9b9b9b"
                                style={[styles.input, styles.halfInput]}
                                keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
                                value={cardCVV}
                                onChangeText={handleCVVChange}
                                maxLength={4}
                                secureTextEntry={true}
                                returnKeyType="next"
                                accessibilityLabel="CVV input"
                            />
                        </View>
                        <TextInput
                            placeholder="Name on card"
                            placeholderTextColor="#9b9b9b"
                            style={styles.input}
                            value={cardName}
                            onChangeText={(t) => setCardName(t)}
                            autoCapitalize="words"
                            returnKeyType="done"
                            accessibilityLabel="Name on card input"
                            textContentType="name" // Autofill hint
                        />

                        {/* Checkbox */}
                        <TouchableOpacity
                            onPress={() => setSaveCard(!saveCard)}
                            style={styles.checkboxRow}
                            activeOpacity={0.8}
                        >
                            <View style={[styles.checkbox, saveCard && styles.checkboxChecked]}>
                                {saveCard && <Ionicons name="checkmark" size={16} color="#3aa06a" />}
                            </View>
                            <Text style={styles.checkboxLabel}>Save this credit card</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Spacer */}
                    <View style={{ height: 120 }} />
                </ScrollView>

                {/* Bottom Button */}
                <View style={styles.footer}>
                    <LinearGradient
                        colors={["#3aa06a", "#b4f78a"]}
                        start={[0, 0]} end={[1, 1]}
                        style={styles.gradientButton}
                    >
                        <TouchableOpacity
                            style={styles.gradientInner}
                            activeOpacity={0.85}
                            // Navigate to the correct path
                            onPress={() => router.push("/payment3")}
                            accessibilityLabel="Go to confirmation screen" // More descriptive label
                        >
                            <Text style={styles.buttonText}>Confirm Payment</Text> {/* Updated text */}
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

// (StepIndicator component remains the same)
function StepIndicator({ step, inactive, completed }: { step: number; inactive?: boolean; completed?: boolean; }) {
    const filled = !inactive;
    const bg = completed ? "#3aa06a" : filled ? "#3aa06a" : "#ececec";
    const textColor = completed || filled ? "#fff" : "#aaa";
    const circleSize = 36;
    return (
        <View style={[styles.stepCircle, { width: circleSize, height: circleSize, borderRadius: circleSize/2, backgroundColor: bg, borderColor: "#e0e0e0", borderWidth: completed || filled ? 0 : 1 }]}>
            {completed ? (
                 <Ionicons name="checkmark-sharp" size={20} color="#fff" />
            ) : (
                 <Text style={[styles.stepText, { color: textColor }]}>{step}</Text>
            )}
        </View>
    );
}


// (Styles remain mostly the same, adjusted header padding and added checkmark style)
const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: "#fff" },
    flex: { flex: 1 },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between', // Center title
        paddingHorizontal: 16,
        paddingTop: 10, // Reduced top padding
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backTouch: { padding: 6 },
    headerTitle: { fontSize: 20, fontWeight: "600", color: "#333", textAlign: 'center' },
    scrollContainer: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 120 }, // Increased bottom padding
    progressRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 30,
    },
    progressLine: {
        height: 2,
        flex: 1, // Use flex
        maxWidth: 80,
        backgroundColor: "#ececec",
        marginHorizontal: 8,
        borderRadius: 2,
    },
    stepCircle: {
        width: 36, height: 36, borderRadius: 18,
        alignItems: "center", justifyContent: "center",
        shadowColor: "#000", shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 2 }, shadowRadius: 5,
        elevation: 2,
    },
    stepText: { fontSize: 16, fontWeight: "700" },
    card: {
        borderRadius: 16, padding: 20, marginBottom: 30, // Increased margin
        shadowColor: "#000", shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1, shadowRadius: 8, elevation: 5,
    },
    cardHeader: {
        flexDirection: "row", justifyContent: "space-between",
        alignItems: "center", marginBottom: 24,
    },
    cardChip: {
        width: 45, height: 32, borderRadius: 6, backgroundColor: "#c0c0c0", // Lighter chip
    },
    cardBrand: { color: "#fff", fontSize: 16, fontWeight: "bold", textTransform: 'uppercase' }, // Adjusted style
    cardNumber: {
        color: "#fff", fontSize: 20, // Slightly larger
        letterSpacing: 3, // Increased spacing
        marginBottom: 20, // Increased margin
        fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace', // Monospace font
    },
    cardFooter: { flexDirection: "row", justifyContent: "space-between" },
    cardName: { color: "#eee", fontSize: 14, fontWeight: "500", letterSpacing: 1 }, // Adjusted style
    cardExpiry: { color: "#eee", fontSize: 14, fontWeight: "500", letterSpacing: 1 }, // Adjusted style
    form: {},
    input: {
        height: 52, backgroundColor: "#f7f7f7", borderRadius: 10,
        paddingHorizontal: 16, marginBottom: 16, fontSize: 15,
        color: "#222", borderWidth: 1, borderColor: "#e0e0e0",
    },
    row: { flexDirection: "row", justifyContent: "space-between" },
    halfInput: { flex: 1 },
    checkboxRow: { flexDirection: "row", alignItems: "center", marginTop: 8, marginBottom: 10 }, // Added margin bottom
    checkbox: {
        width: 20, height: 20, borderRadius: 4, borderWidth: 1.5, // Adjusted size/border
        borderColor: "#ccc", alignItems: "center", justifyContent: "center",
        marginRight: 10, backgroundColor: "#fff",
    },
    checkboxChecked: { borderColor: "#3aa06a", backgroundColor: "#fff" }, // Keep background white
    checkboxLabel: { fontSize: 14, color: "#555" }, // Adjusted size
    footer: {
        position: "absolute", left: 16, right: 16,
        bottom: Platform.OS === 'ios' ? 30 : 20, alignItems: "center",
    },
    gradientButton: {
        width: "100%", borderRadius: 12, shadowColor: "#3aa06a",
        shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15,
        shadowRadius: 8, elevation: 4,
    },
    gradientInner: { paddingVertical: 16, alignItems: "center", borderRadius: 12 },
    buttonText: { color: "#fff", fontWeight: "700", fontSize: 17 },
});