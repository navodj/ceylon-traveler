import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

const editableFields: (keyof UserProfile)[] = [
    'first_name', 'last_name', 'address', 'post_code', 'country', 'mobile_phone', 'passport_number'
];

export default function PersonalDataForm() {
    const router = useRouter();
    const { getToken } = useAuth();

    const [profileData, setProfileData] = useState<Partial<UserProfile>>({});
    const [originalData, setOriginalData] = useState<Partial<UserProfile>>({});

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasChanged, setHasChanged] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            setError(null); 
            try {
                const token = await getToken();
                if (!token) throw new Error("Authentication failed. Please sign in again.");

                const url = "http://10.163.3.34:8000/api/v1/users/me"; // Define URL
                
                // --- ADD THESE LOGS ---
                console.log("Attempting to fetch:", url);
                console.log("Using token:", token ? token.substring(0, 10) + "..." : "No Token"); 
                // --- END LOGS ---

                const response = await fetch(url, { // Use the url variable
                    headers: { "Authorization": `Bearer ${token}` }
                });

                // ... rest of the function ...

            } catch (e: any) {
                setError(e.message || "An error occurred while fetching data."); 
                console.error("Fetch User Data Error:", e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [getToken]);

    const handleInputChange = (field: keyof UserProfile, value: string) => {
        const newData = { ...profileData, [field]: value };
        setProfileData(newData);
        setHasChanged(JSON.stringify(newData) !== JSON.stringify(originalData));
    };

    const handleSave = async () => {
        if (!hasChanged) {
            Alert.alert("No Changes", "You haven't made any changes to save.");
            return;
        }

        setIsSaving(true);
        setError(null); // Clear previous errors before saving
        try {
            const token = await getToken();
            if (!token) throw new Error("Authentication failed. Please sign in again.");

            const updatePayload: Partial<UserProfile> = {};
            editableFields.forEach(field => {
                if (profileData[field] !== originalData[field]) {
                    // Ensure `field` is a valid key before assigning
                    (updatePayload as any)[field] = profileData[field] ?? null;
                }
            });

            if (Object.keys(updatePayload).length === 0) {
                Alert.alert("No Changes", "You haven't made any changes to save.");
                setIsSaving(false);
                return;
            }

            const response = await fetch("http://10.163.3.34:8000/api/v1/users/me", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updatePayload)
            });

            if (!response.ok) {
                let errorDetail = "Failed to update profile.";
                try {
                    const errorData = await response.json();
                    errorDetail = errorData.detail || errorDetail;
                } catch (jsonError) {
                    errorDetail = response.statusText || errorDetail;
                }
                throw new Error(errorDetail);
            }

            const updatedData = await response.json();
            setOriginalData(updatedData);
            setProfileData(updatedData);
            setHasChanged(false);

            Alert.alert("Success", "Profile updated successfully!");

        } catch (e: any) {
            // Set the error state here for saving errors
            setError(e.message || "An error occurred during save.");
            console.error("Save Profile Error:", e);
        } finally {
            setIsSaving(false);
        }
    };

    // --- Render Loading State ---
    if (isLoading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text style={styles.loadingText}>Loading Profile...</Text>
                {/* Ensure loading text is wrapped */}
            </SafeAreaView>
        );
    }

    // --- Render Error State (if loading failed) ---
    // Added this block to handle initial fetch error more clearly
    if (error && !profileData.email) { // Show full screen error if initial load failed
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <Ionicons name="warning-outline" size={40} color="red" />
                <Text style={styles.errorTextLarge}>Error Loading Profile</Text>
                <Text style={styles.errorText}>{error}</Text>
                {/* Ensure error text is wrapped */}
                <TouchableOpacity onPress={() => {/* Add retry logic here? */}} style={styles.button}>
                    <Text style={styles.buttonText}>Retry</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }


    // --- Render Main Form ---
    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#007bff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Personal Data</Text>
                <View style={{ width: 30 }} />
            </View>

            <ScrollView contentContainerStyle={styles.container}>

                {/* Display Error Message Inline (for save errors) */}
                {/* Ensure error text is wrapped here too */}
                {error && <Text style={styles.errorText}>{error}</Text>}

                {/* Display Non-Editable Email */}
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
                            {field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={profileData[field] || ''}
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
                    disabled={isSaving || !hasChanged}
                >
                    {isSaving ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Save Changes</Text>
                        // Ensure button text is wrapped
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

// --- Styles ---
const styles = StyleSheet.create({
    safeContainer: { flex: 1, backgroundColor: "#f8f9fa" },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#f8f9fa", padding: 20 },
    loadingText: { marginTop: 10 }, 
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee', backgroundColor: '#fff' },
    backButton: { padding: 5 },
    headerTitle: { fontSize: 18, fontWeight: '600' },
    container: { padding: 20, paddingBottom: 40 },
    inputContainer: { marginBottom: 18 },
    label: { fontSize: 14, fontWeight: '500', color: '#555', marginBottom: 8 },
    input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 16, backgroundColor: "#fff" },
    readOnlyInput: { backgroundColor: '#eee', color: '#666' },
    errorText: { color: "red", fontSize: 14, textAlign: 'center', marginTop: 15, marginBottom: 5 },
    errorTextLarge: { fontSize: 18, fontWeight: '600', color: 'red', marginBottom: 10 }, // Style for larger error title
    button: { backgroundColor: "#007bff", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 20 },
    buttonDisabled: { backgroundColor: "#a0cfff" },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});