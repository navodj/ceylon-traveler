//
// import React, { useState } from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     TextInput,
//     ScrollView,
//     TouchableOpacity,
//     Modal, // 1. Import Modal
//     ActivityIndicator // 2. Import ActivityIndicator
// } from "react-native";
// import { Button, Chip } from "react-native-paper";
// import { useRouter } from "expo-router";
// import { SafeAreaView } from "react-native-safe-area-context";
//
// // --- (Interests list is the same) ---
// const interestsList = [
//     "history", "nature", "culture", "archaeology", "scenic", "wildlife",
//     "beach", "religious", "surfing", "hiking", "adventure", "elephants",
//     "waterfall", "botanical", "colonial", "marine", "pilgrimage",
//     "birds", "tea", "art"
// ];
//
// export default function TravelGuideScreen() {
//     const router = useRouter();
//     const [people, setPeople] = useState(1);
//     const [days, setDays] = useState(1);
//     const [budget, setBudget] = useState("");
//     const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//
//     const toggleInterest = (interest: string) => {
//         setSelectedInterests((prev) =>
//             prev.includes(interest)
//                 ? prev.filter((i) => i !== interest)
//                 : [...prev, interest]
//         );
//     };
//
//     const handleSubmit = async () => {
//         setIsLoading(true); // <-- This will now show the Modal
//         setError(null);
//         try {
//             const response = await fetch("http://10.29.28.34:8000/api/v1/trips/generate-plan", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     num_people: people,
//                     num_days: days,
//                     budget: budget,
//                     interests: selectedInterests,
//                 }),
//             });
//
//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.detail || "Something went wrong!");
//             }
//
//             const data = await response.json();
//             console.log("Backend response:", data);
//
//             router.push({
//                 // 3. Make sure this path is correct for your 'app' folder
//                 pathname: "/location",
//                 params: {
//                     // You don't need to pass 'days' if the backend sends it
//                     responseData: JSON.stringify(data),
//                 },
//             });
//         } catch (e: any) {
//             console.error("Error sending data to backend:", e);
//             setError(e.message || "Failed to connect to the backend.");
//         } finally {
//             setIsLoading(false); // <-- This will hide the Modal
//         }
//     };
//
//     return (
//         <SafeAreaView style={styles.safeContainer}>
//
//             {/* 4. ADD THE MODAL COMPONENT */}
//             <Modal
//                 transparent={true}
//                 animationType="fade"
//                 visible={isLoading}
//             >
//                 <View style={styles.modalContainer}>
//                     <View style={styles.modalContent}>
//                         <ActivityIndicator size="large" color="#4CAF50" />
//                         <Text style={styles.loadingText}>Generating your plan...</Text>
//                     </View>
//                 </View>
//             </Modal>
//
//             <ScrollView contentContainerStyle={styles.container}>
//                 <Text style={styles.title}>Generate personalized{"\n"}travel guide</Text>
//
//                 {/* --- (Rest of your form is the same) --- */}
//                 {/* Number of People */}
//                 <View style={styles.section}>
//                     <Text style={styles.label}>Select number of people</Text>
//                     <View style={styles.stepperContainer}>
//                         <Button mode="outlined" onPress={() => setPeople(Math.max(1, people - 1))}>
//                             -
//                         </Button>
//                         <Text style={styles.stepperText}>{people}</Text>
//                         <Button mode="outlined" onPress={() => setPeople(people + 1)}>
//                             +
//                         </Button>
//                     </View>
//                 </View>
//
//                 {/* Days */}
//                 <View style={styles.section}>
//                     <Text style={styles.label}>Select number of days</Text>
//                     <View style={styles.stepperContainer}>
//                         <Button mode="outlined" onPress={() => setDays(Math.max(1, days - 1))}>
//                             -
//                         </Button>
//                         <Text style={styles.stepperText}>{days}</Text>
//                         <Button mode="outlined" onPress={() => setDays(days + 1)}>
//                             +
//                         </Button>
//                     </View>
//                 </View>
//
//                 {/* Budget */}
//                 <View style={styles.section}>
//                     <Text style={styles.label}>Enter your budget here</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Enter budget (USD)"
//                         keyboardType="numeric"
//                         value={budget}
//                         onChangeText={setBudget}
//                     />
//                 </View>
//
//                 {/* Interests */}
//                 <View style={styles.section}>
//                     <Text style={styles.label}>Select your interests</Text>
//                     <View style={styles.chipContainer}>
//                         {interestsList.map((interest) => (
//                             <Chip
//                                 key={interest}
//                                 selected={selectedInterests.includes(interest)}
//                                 onPress={() => toggleInterest(interest)}
//                                 style={styles.chip}
//                             >
//                                 {interest}
//                             </Chip>
//                         ))}
//                     </View>
//                 </View>
//
//                 {/* Button */}
//                 {error && <Text style={styles.errorText}>{error}</Text>}
//                 <TouchableOpacity
//                     style={styles.button}
//                     onPress={handleSubmit}
//                     disabled={isLoading}
//                 >
//                     <Text style={styles.buttonText}>
//                         {isLoading ? "Generating..." : "Surprise me!"}
//                     </Text>
//                 </TouchableOpacity>
//             </ScrollView>
//         </SafeAreaView>
//     );
// }
//
// const styles = StyleSheet.create({
//     safeContainer: {
//         flex: 1,
//         backgroundColor: "#fff",
//     },
//     container: { padding: 20, alignItems: "center" },
//     title: { fontSize: 28, fontWeight: "700", textAlign: "center", marginBottom: 24 },
//     // ... (rest of your styles are the same)
//     section: { width: "100%", marginBottom: 20 },
//     label: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
//     stepperContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//         borderWidth: 1,
//         borderRadius: 10,
//         borderColor: "#ccc",
//         padding: 8,
//     },
//     stepperText: { fontSize: 18, fontWeight: "600" },
//     input: {
//         borderWidth: 1,
//         borderColor: "#ccc",
//         borderRadius: 10,
//         padding: 10,
//         fontSize: 16,
//     },
//     chipContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
//     chip: { marginBottom: 8 },
//     button: {
//         backgroundColor: "#4CAF50",
//         paddingVertical: 14,
//         borderRadius: 50,
//         marginTop: 30,
//         width: "100%",
//     },
//     buttonText: {
//         color: "white",
//         fontSize: 18,
//         textAlign: "center",
//         fontWeight: "700",
//     },
//     errorText: {
//         color: "red",
//         textAlign: "center",
//         marginTop: 10,
//         marginBottom: 10,
//         fontSize: 14,
//     },
//
//     // --- 5. ADD STYLES FOR THE MODAL ---
//     modalContainer: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
//     },
//     modalContent: {
//         backgroundColor: "white",
//         borderRadius: 10,
//         padding: 20,
//         alignItems: "center",
//         elevation: 5,
//     },
//     loadingText: {
//         marginTop: 10,
//         fontSize: 16,
//         fontWeight: "600",
//     },
// });
//


import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Modal,
    ActivityIndicator
} from "react-native";
import { Button, Chip } from "react-native-paper";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@clerk/clerk-expo"; // <-- 1. IMPORT useAuth

// --- (Interests list is the same) ---
const interestsList = [
    "history", "nature", "culture", "archaeology", "scenic", "wildlife",
    "beach", "religious", "surfing", "hiking", "adventure", "elephants",
    "waterfall", "botanical", "colonial", "marine", "pilgrimage",
    "birds", "tea", "art"
];



export default function TravelGuideScreen() {
    const router = useRouter();
    const { getToken } = useAuth(); // <-- 2. GET THE getToken FUNCTION
    const [people, setPeople] = useState(1);
    const [days, setDays] = useState(1);
    const [budget, setBudget] = useState("");
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const messages = [
        "Generating your plan...",
        "Analyzing best routes...",
        "Exploring your interests...",
        "Finding hidden gems...",
        "Almost done! Preparing your trip..."
    ];

    const [messageIndex, setMessageIndex] = useState(0);

// Rotate messages every 2 seconds while loading
    // Rotate messages every 2 seconds while loading
    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;

        if (isLoading) {
            interval = setInterval(() => {
                setMessageIndex((prev) => (prev + 1) % messages.length);
            }, 2000);
        } else {
            setMessageIndex(0); // reset to first message when not loading
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isLoading]);

    const toggleInterest = (interest: string) => {
        setSelectedInterests((prev) =>
            prev.includes(interest)
                ? prev.filter((i) => i !== interest)
                : [...prev, interest]
        );
    };

    // --- (START) UPDATED handleSubmit FUNCTION ---
    const handleSubmit = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // 3. GET THE TOKEN FROM CLERK
            const token = await getToken();
            if (!token) {
                // This happens if the user is not signed in
                setError("You are not authenticated. Please sign in.");
                setIsLoading(false);
                return;
            }

            const response = await fetch("http://10.163.3.243:8000/api/v1/trips/generate-plan", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // <-- 4. ADD THE TOKEN HERE
                },
                body: JSON.stringify({
                    num_people: people,
                    num_days: days,
                    budget: budget,
                    interests: selectedInterests,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Something went wrong!");
            }

            const data = await response.json();
            console.log("Backend response:", data);

            router.push({
                pathname: "/location",
                params: {
                    responseData: JSON.stringify(data),
                },
            });
        } catch (e: any) {
            console.error("Error sending data to backend:", e);
            setError(e.message || "Failed to connect to the backend.");
        } finally {
            setIsLoading(false);
        }
    };
    // --- (END) UPDATED handleSubmit FUNCTION ---

    return (
        <SafeAreaView style={styles.safeContainer}>

            {/* (Modal is the same) */}
            <Modal
                transparent={true}
                animationType="fade"
                visible={isLoading}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <ActivityIndicator size="large" color="#4CAF50" />
                        <Text style={styles.loadingText}>{messages[messageIndex]}</Text>
                    </View>
                </View>
            </Modal>

            {/* (Rest of your form is the same) */}
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Generate personalized{"\n"}travel guide</Text>

                <View style={styles.section}>
                    <Text style={styles.label}>Select number of people</Text>
                    <View style={styles.stepperContainer}>
                        <Button mode="outlined" onPress={() => setPeople(Math.max(1, people - 1))}>
                            -
                        </Button>
                        <Text style={styles.stepperText}>{people}</Text>
                        <Button mode="outlined" onPress={() => setPeople(people + 1)}>
                            +
                        </Button>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Select number of days</Text>
                    <View style={styles.stepperContainer}>
                        <Button mode="outlined" onPress={() => setDays(Math.max(1, days - 1))}>
                            -
                        </Button>
                        <Text style={styles.stepperText}>{days}</Text>
                        <Button mode="outlined" onPress={() => setDays(days + 1)}>
                            +
                        </Button>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Enter your budget here</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter budget (USD)"
                        keyboardType="numeric"
                        value={budget}
                        onChangeText={setBudget}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Select your interests</Text>
                    <View style={styles.chipContainer}>
                        {interestsList.map((interest) => (
                            <Chip
                                key={interest}
                                selected={selectedInterests.includes(interest)}
                                onPress={() => toggleInterest(interest)}
                                style={styles.chip}
                            >
                                {interest}
                            </Chip>
                        ))}
                    </View>
                </View>

                {error && <Text style={styles.errorText}>{error}</Text>}
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                    disabled={isLoading}
                >
                    <Text style={styles.buttonText}>
                        {isLoading ? "Generating..." : "Surprise me!"}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

// --- (Styles are the same) ---
const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: { padding: 20, alignItems: "center" },
    title: { fontSize: 28, fontWeight: "700", textAlign: "center", marginBottom: 24 },
    section: { width: "100%", marginBottom: 20 },
    label: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
    stepperContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#ccc",
        padding: 8,
    },
    stepperText: { fontSize: 18, fontWeight: "600" },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
    },
    chipContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    chip: { marginBottom: 8 },
    button: {
        backgroundColor: "#4CAF50",
        paddingVertical: 14,
        borderRadius: 50,
        marginTop: 30,
        width: "100%",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        textAlign: "center",
        fontWeight: "700",
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginTop: 10,
        marginBottom: 10,
        fontSize: 14,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        elevation: 5,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: "600",
    },
});