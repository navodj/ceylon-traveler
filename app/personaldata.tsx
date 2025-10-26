
import { Ionicons } from '@expo/vector-icons'; // For back button icon
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert // Using Alert for feedback
    ,

    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Define the structure of the user data
type UserProfile = {
    first_name: string;
    last_name: string;
    email: string;
    address: string | null;
    post_code: string | null;
    country: string | null;
    mobile_phone: string | null;
    passport_number: string | null;
};

// Define which fields are editable
const editableFields: (keyof UserProfile)[] = [
    'first_name', 'last_name', 'address', 'post_code', 'country', 'mobile_phone', 'passport_number'
];

// Dummy data to display initially
const dummyProfile: UserProfile = {
    first_name: "Chamika", // Changed to a local example
    last_name: "Bandara",
    email: "contact.chalaka@example.com", // Example email
    address: "123 Galle Road",
    post_code: "00100",
    country: "Sri Lanka",
    mobile_phone: "0701234567",
    passport_number: "N12345678",
};

export default function PersonalDataForm() {
    const router = useRouter();

    // State for the form data, initialized with dummy data
    const [profileData, setProfileData] = useState<Partial<UserProfile>>(dummyProfile);
    // State to store the original data to check for changes
    const [originalData, setOriginalData] = useState<Partial<UserProfile>>(dummyProfile);
    // State to track if data has changed
    const [hasChanged, setHasChanged] = useState(false);

    // Handle Input Changes
    const handleInputChange = (field: keyof UserProfile, value: string) => {
        const newData = { ...profileData, [field]: value };
        setProfileData(newData);
        // Check if the new data is different from the original data
        setHasChanged(JSON.stringify(newData) !== JSON.stringify(originalData));
    };

    // Handle Save (Simulated - Local Only)
    const handleSave = () => {
        if (!hasChanged) {
            Alert.alert("No Changes", "You haven't made any changes to save.");
            return;
        }

        // --- Simulate Saving Locally ---
        console.log("Simulating save with data:", profileData);
        // Update originalData to reflect the "saved" state locally for this session
        setOriginalData(profileData);
        setHasChanged(false); // Reset the changed state, disabling the button
        Alert.alert(
            "Saved Locally",
            "Profile changes saved for this session only. Backend connection needed for permanent save.",
            [ // Add alert button to confirm dismissal
                { text: "OK", onPress: () => router.back() } // <-- NAVIGATE BACK HERE
            ]
        )
        // --- End Simulation ---
    };

    // --- Render Main Form ---
    return (
        <SafeAreaView style={styles.safeContainer} edges={['top', 'left', 'right']}>
             {/* Header with Back Button */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#007bff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Personal Data</Text>
                 <View style={{ width: 30 }} /> {/* Spacer */}
            </View>

            <ScrollView contentContainerStyle={styles.container}>

                {/* Display Non-Editable Email (from dummy data) */}
                <View style={styles.inputContainer}>
                     <Text style={styles.label}>Email (Read-only)</Text>
                     <TextInput
                        style={[styles.input, styles.readOnlyInput]}
                        value={profileData.email || 'Not available'}
                        editable={false}
                    />
                </View>

                {/* Map over editable fields */}
                {editableFields.map((field) => (
                    <View key={field} style={styles.inputContainer}>
                        <Text style={styles.label}>
                            {/* Simple way to format label */}
                            {field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={profileData[field] || ''} // Handle null values from dummy data
                            onChangeText={(text) => handleInputChange(field, text)}
                            keyboardType={
                                ["mobile_phone", "post_code"].includes(field) ? "numeric" : "default"
                            }
                            placeholder={`Enter your ${field.replace('_', ' ')}`}
                            placeholderTextColor="#999"
                        />
                    </View>
                ))}

                {/* Save Button */}
                <TouchableOpacity
                    style={[styles.button, !hasChanged && styles.buttonDisabled]}
                    onPress={handleSave}
                    disabled={!hasChanged} // Only disable if no changes
                >
                     <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

// --- Styles ---
const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: "#f8f9fa",
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#fff',
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    container: {
        padding: 20,
        paddingBottom: 40, // Extra padding at the bottom
    },
    inputContainer: {
        marginBottom: 18,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#555',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        backgroundColor: "#fff",
    },
    readOnlyInput: {
        backgroundColor: '#eee', // Gray background for read-only
        color: '#666', // Dimmer text color
    },
    button: {
        backgroundColor: "#007bff", // Blue button
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
    },
    buttonDisabled: {
         backgroundColor: "#a0cfff", // Lighter blue when disabled
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});