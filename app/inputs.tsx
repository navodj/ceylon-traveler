import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { Button, Chip, Switch } from "react-native-paper";
import { useRouter } from "expo-router";

const interestsList = [
    "history",
    "nature",
    "culture",
    "archaeology",
    "scenic",
    "wildlife",
    "beach",
    "religious",
    "surfing",
    "hiking",
    "adventure",
    "elephants",
    "waterfall",
    "botanical",
    "colonial",
    "marine",
    "pilgrimage",
    "birds",
    "tea",
    "art"
    ];

export default function TravelGuideScreen() {
    const router = useRouter();
    const [people, setPeople] = useState(1);
    const [days, setDays] = useState(1);
    const [budget, setBudget] = useState("");
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const toggleInterest = (interest: string) => {
        setSelectedInterests((prev) =>
            prev.includes(interest)
                ? prev.filter((i) => i !== interest)
                : [...prev, interest]
        );
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch("http://10.241.210.243:8000/api/v1/trips/generate-plan", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
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
            // You might want to navigate to a different screen or display the data
            router.push({
                pathname: "/location",
                params: {
                    people: people.toString(),
                    days: days.toString(),
                    budget,
                    interests: selectedInterests.join(","),
                    // Pass the response data if needed
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

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Generate personalized{"\n"}travel guide</Text>

            {/* Number of People */}
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

            {/* Days */}
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

            {/* Budget */}
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



            {/* Interests */}
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

            {/* Button */}
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
    );
}

const styles = StyleSheet.create({
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
    preferenceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: 10,
    },
    prefLabel: { fontSize: 16 },
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
});
