import React from "react";
import {
    Dimensions,
    ScrollView,
    // Removed SafeAreaView from 'react-native'
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
// 1. Import SafeAreaView from the correct package
import { LinearGradient } from "expo-linear-gradient";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
// 2. Import useRouter
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

// Helper to format today as YYYY-MM-DD
const today = (() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
})();

// 3. Ensure the component is exported as default
export default function ReservationScreen() { 
    // 4. Initialize useRouter
    const router = useRouter();

    // Example static summary values — replace with data as needed
    const people = 2;
    const days = 8;
    const interests = "Cultural, Nature, Hiking";
    const startDate = today;
    const endDate = (() => {
        const d = new Date();
        d.setDate(d.getDate() + 8); // Assuming 8 days duration for example
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
    })();
    const price = 1480;

    // Minimal marked dates example
    const markedDates: any = {
        [today]: { selected: true, selectedColor: "#3aa06a", selectedTextColor: "#fff" },
        // Add logic here to mark the date range if needed
    };

    return (
        // Use the correct SafeAreaView
        <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.headerRow}>
                    {/* 5. Use router.back() */}
                    <TouchableOpacity style={styles.backTouch} onPress={() => router.back()}>
                        <Text style={styles.backChevron}>{"<"}</Text>
                    </TouchableOpacity>
                    {/* Title doesn't need back navigation */}
                    <Text style={styles.headerTitle}>Confirmation</Text>
                     <View style={{width: 38}} /> {/* Spacer */}
                </View>

                {/* Step Indicator */}
                <View style={styles.stepRow}>
                    <View style={styles.stepsInner}>
                        <View style={[styles.stepCircle, styles.stepDone]}>
                            <Text style={styles.stepNumber}>✓</Text> {/* Use checkmark */}
                        </View>
                        <View style={styles.stepLine} />
                        <View style={[styles.stepCircle, styles.stepDone]}>
                            <Text style={styles.stepNumber}>✓</Text> {/* Use checkmark */}
                        </View>
                        <View style={styles.stepLine} />
                        <View style={[styles.stepCircle, styles.stepDone]}> {/* Mark step 3 as done */}
                            <Text style={styles.stepNumber}>✓</Text> {/* Use checkmark */}
                        </View>
                    </View>
                </View>

                {/* Calendar */}
                <View style={styles.calendarWrap}>
                    <Calendar
                        current={today}
                        monthFormat={'MMMM yyyy'}
                        hideExtraDays={false}
                        firstDay={1}
                        markedDates={markedDates}
                        // Disable interactions if this is just a confirmation screen
                        //disableTouchEvent={true}
                        theme={{
                            backgroundColor: "#fff", calendarBackground: "#fff", textSectionTitleColor: "#333",
                            selectedDayBackgroundColor: "#3aa06a", selectedDayTextColor: "#fff", todayTextColor: "#3aa06a",
                            dayTextColor: "#222", textDisabledColor: "#ccc", arrowColor: "#333",
                            monthTextColor: "#222", indicatorColor: "#3aa06a", textDayFontFamily: "System",
                            textMonthFontFamily: "System", textDayHeaderFontFamily: "System", textDayFontSize: 14,
                            textMonthFontSize: 18, textDayHeaderFontSize: 12,
                        }}
                        style={{ borderRadius: 12 }}
                    />
                </View>

                {/* Summary */}
                <View style={styles.summaryCard}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}> {people} People</Text>
                        <Text style={styles.summaryLabel}>{days} Days</Text>
                    </View>
                    <Text style={styles.summaryText}>Interests: {interests}</Text>
                    <Text style={styles.summaryText}>{formatDisplayDate(startDate)} to {formatDisplayDate(endDate)}</Text>
                </View>

                {/* Price & Info */}
                <View style={styles.priceRow}>
                    <View>
                        <Text style={styles.priceLabel}>Total Price</Text> {/* Added label */}
                        <Text style={styles.priceValue}>${price} USD</Text>
                    </View>
                    {/* Info button might not be needed on confirmation */}
                    {/* <TouchableOpacity style={styles.infoButton}>
                        <Text style={styles.infoText}>i</Text>
                    </TouchableOpacity> */}
                </View>

                {/* Complete Button (Navigates Home or to Trips screen) */}
                <View style={{ height: 18 }} />
                <LinearGradient colors={["#3aa06a", "#b4f78a"]} start={[0,0]} end={[1,1]} style={styles.completeGradient}>
                    {/* Navigate to home or a trips list screen */}
                    <TouchableOpacity 
                        style={styles.completeButton} 
                        activeOpacity={0.85} 
                        onPress={() => router.replace('/(tabs)/home')} // Go home and replace history
                    >
                        <Text style={styles.completeText}>Done</Text>
                    </TouchableOpacity>
                </LinearGradient>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

// (formatDisplayDate function remains the same)
function formatDisplayDate(ymd: string) {
    const d = new Date(ymd);
    const monthNames = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];
    return `${monthNames[d.getMonth()]} ${d.getDate()} ${d.getFullYear()}`;
}

// (Styles remain mostly the same, adjusted header padding and step indicator)
const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: "#fff" },
    container: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 40 }, // Reduced top padding
    headerRow: {
        flexDirection: "row", alignItems: "center", marginBottom: 15, // Increased margin
        justifyContent: 'space-between', paddingHorizontal: 0 // Adjust padding if needed
    },
    backTouch: { padding: 8 }, // Slightly larger tap area
    backChevron: { fontSize: 24, color: "#333", fontWeight: 'bold' }, // Use bold chevron for visibility
    headerTitle: { fontSize: 20, fontWeight: "600", color: "#333", textAlign: 'center' },

    stepRow: { alignItems: "center", marginVertical: 15 }, // Adjusted margin
    stepsInner: { flexDirection: "row", alignItems: "center" , justifyContent: 'center'},
    stepCircle: {
        width: 36, height: 36, borderRadius: 18, backgroundColor: '#ececec',
        alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#e0e0e0',
    },
    stepDone: { backgroundColor: '#3aa06a', borderColor: '#3aa06a' },
    stepNumber: { fontWeight: 'bold', fontSize: 16, color: '#fff' }, // Adjusted size
    stepLine: {
        width: 40, height: 2, backgroundColor: '#e0e0e0', // Thinner line
        marginHorizontal: 8, borderRadius: 1,
    },

    calendarWrap: { marginTop: 15, marginBottom: 25, borderRadius: 12, overflow: 'hidden', elevation: 2, shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.1, shadowRadius: 3}, // Added shadow

    summaryCard: {
        paddingVertical: 18, paddingHorizontal: 15, // Add horizontal padding
        borderBottomWidth: 1, borderBottomColor: '#eee', backgroundColor: '#f9f9f9', // Light bg
        borderRadius: 10, marginBottom: 20, // Add border radius and margin
    },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    summaryLabel: { color: '#555', fontSize: 15, fontWeight: '500' }, // Adjusted style
    summaryText: { color: '#444', marginBottom: 6, fontSize: 14 }, // Adjusted style

    priceRow: {
        flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', // Changed alignment
        marginTop: 10, paddingHorizontal: 5, // Add padding
    },
    priceLabel: { fontSize: 14, color: '#666', marginBottom: 4 }, // Style for label
    priceValue: { fontSize: 26, fontWeight: 'bold', color: '#111' }, // Bolder price
    infoButton: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: '#eef', borderWidth: 1, borderColor: '#ddf'}, // Adjusted style
    infoText: { color: '#55a', fontWeight: 'bold', fontSize: 14 }, // Adjusted style

    completeGradient: {
        width: width - 40, borderRadius: 12, marginTop: 25, // Increased margin
        alignSelf: 'center', elevation: 3, shadowColor: '#3aa06a',
        shadowOffset: {width: 0, height: 3}, shadowOpacity: 0.2, shadowRadius: 5,
    },
    completeButton: { paddingVertical: 16, alignItems: 'center', borderRadius: 12 },
    completeText: { color: '#fff', fontSize: 17, fontWeight: '700' }, // Adjusted style
});