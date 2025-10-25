import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import { useLocalSearchParams, router } from "expo-router";

interface Coordinates {
    latitude: number;
    longitude: number;
}

interface Location {
    id: string;
    name: string;
    description: string;
    image_url: string;
    coordinates: Coordinates;
    day_number?: number;
}

interface DayItinerary {
    day_number: number;
    locations: Location[];
}

interface ParsedData {
    id: string;
    num_people: number;
    num_days: number;
    total_budget: number;
    itinerary: DayItinerary[];
}

export default function LocationScreen() {
    const params = useLocalSearchParams();
    const rawResponse = (params.responseData || params.response || null) as string | null;

    let parsedData: ParsedData | null = null;
    try {
        if (rawResponse) {
            parsedData = JSON.parse(rawResponse);
        }
    } catch (err) {
        console.error("Failed to parse responseData:", err);
        parsedData = null;
    }

    const itinerary: DayItinerary[] = parsedData?.itinerary || [];
    const dayCount: number =
        parsedData?.num_days || Number(params.days) || 4;
    const totalBudget: number | null = parsedData?.total_budget || null;

    // Flatten coordinates across all days in order
    const routeCoords: Coordinates[] = [];
    const allLocations: Location[] = [];
    itinerary.forEach((dayItem) => {
        if (Array.isArray(dayItem.locations)) {
            dayItem.locations.forEach((loc) => {
                if (
                    loc.coordinates &&
                    typeof loc.coordinates.latitude === "number" &&
                    typeof loc.coordinates.longitude === "number"
                ) {
                    routeCoords.push({
                        latitude: loc.coordinates.latitude,
                        longitude: loc.coordinates.longitude,
                    });
                    allLocations.push({
                        day_number: dayItem.day_number,
                        ...loc,
                    });
                }
            });
        }
    });

    // Fixed starting location
    const fixedStart = {
        latitude: 7.180466344500415,
        longitude: 79.88425447019003,
    };

    // Map should always start from fixed location
    const initialRegion = {
        latitude: fixedStart.latitude,
        longitude: fixedStart.longitude,
        latitudeDelta: 2.5,
        longitudeDelta: 2.5,
    };

    const handleLocationPress = (location: Location) => {
        try {
            router.push({
                pathname: "/details",
                params: {
                    id: location.id,
                    name: location.name,
                    image: location.image_url,
                    description: location.description,
                    latitude: String(location.coordinates.latitude),
                    longitude: String(location.coordinates.longitude),
                },
            });
        } catch (err) {
            console.error("Navigation error:", err);
        }
    };

    const renderDayCard = (dayItem: DayItinerary, index: number) => {
        const firstImage = dayItem?.locations?.[0]?.image_url || null;

        return (
            <TouchableOpacity
                key={`day-${index + 1}`}
                style={styles.card}
                onPress={() => {
                    if (dayItem.locations.length > 0) {
                        handleLocationPress(dayItem.locations[0]);
                    }
                }}
            >
                {firstImage && (
                    <Image source={{ uri: firstImage }} style={styles.cardImage} />
                )}
                <Text style={styles.cardText}>
                    Day {index + 1} —{" "}
                    {dayItem.locations.length > 0
                        ? dayItem.locations[0].name
                        : "No locations"}
                </Text>
            </TouchableOpacity>
        );
    };

    const renderDayLocations = (dayItem: DayItinerary, dayIndex: number) => {
        return dayItem.locations.map((loc, i) => (
            <View key={loc.id || `loc-${i}`} style={styles.locationBlock}>
                {loc.image_url && (
                    <Image source={{ uri: loc.image_url }} style={styles.locationImage} />
                )}
                <View style={styles.locationTextWrap}>
                    <Text style={styles.locationName}>{loc.name}</Text>
                    <Text style={styles.locationDesc}>{loc.description}</Text>
                </View>
                <TouchableOpacity
                    style={styles.detailsButton}
                    onPress={() => handleLocationPress(loc)}
                >
                    <Text style={styles.detailsButtonText}>View details</Text>
                </TouchableOpacity>
            </View>
        ));
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.backText}></Text>
                <Text style={styles.title}>Locations</Text>
                <Text style={styles.filterText}></Text>
            </View>

            {parsedData && (
                <View style={{ paddingHorizontal: 20 }}>
                    <Text style={styles.summaryText}>
                        People: {parsedData.num_people || "-"} • Days: {dayCount}{" "}
                        {totalBudget ? `• Budget: ${totalBudget}` : ""}
                    </Text>
                </View>
            )}

            <Text style={styles.subTitle}>Location List</Text>

            {/* Map */}
            <View style={styles.mapContainer}>
                <MapView style={styles.map} initialRegion={initialRegion}>
                    {/* Start point marker */}
                    <Marker
                        coordinate={fixedStart}
                        title="Start Location"
                        description="Your journey begins here"
                        pinColor="green"
                    />

                    {/* Polyline path */}
                    {routeCoords.length > 1 && (
                        <Polyline coordinates={[fixedStart, ...routeCoords]} strokeColor="#007AFF" strokeWidth={4} />
                    )}

                    {/* Other location markers */}
                    {allLocations.map((loc, idx) => {
                        const coord = loc.coordinates;
                        return (
                            <Marker
                                key={loc.id || `marker-${idx}`}
                                coordinate={coord}
                                title={loc.name}
                                description={loc.description}
                            />
                        );
                    })}
                </MapView>
            </View>

            {/* Day Cards */}
            {itinerary.map((dayItem, i) => renderDayCard(dayItem, i))}

            {/* Detailed Locations */}
            <View style={{ paddingHorizontal: 12, marginTop: 10 }}>
                {itinerary.map((dayItem, i) => (
                    <View key={`details-day-${i}`} style={{ marginTop: 10 }}>
                        <Text style={styles.dayHeader}>Day {i + 1}</Text>
                        {renderDayLocations(dayItem, i)}
                    </View>
                ))}
            </View>

            {/* Purchase Button */}
            <TouchableOpacity style={styles.purchaseButton}>
                <Text style={styles.purchaseText}>Make a purchase</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 50,
        paddingHorizontal: 20,
    },
    backText: { color: "#4CAF50", fontSize: 16 },
    filterText: { color: "#4CAF50", fontSize: 16 },
    title: { fontSize: 22, fontWeight: "700" },
    subTitle: { fontSize: 16, fontWeight: "600", marginTop: 20, marginLeft: 20 },
    summaryText: { fontSize: 14, marginTop: 12, marginBottom: 6 },
    mapContainer: {
        width: "90%",
        height: 200,
        alignSelf: "center",
        borderRadius: 10,
        overflow: "hidden",
        marginTop: 10,
    },
    map: { width: "100%", height: "100%" },
    card: {
        width: "90%",
        alignSelf: "center",
        backgroundColor: "#fff",
        marginTop: 20,
        borderRadius: 10,
        overflow: "hidden",
        elevation: 2,
    },
    cardImage: { width: "100%", height: 150 },
    cardText: { textAlign: "center", padding: 10, fontWeight: "600" },
    dayHeader: { fontSize: 18, fontWeight: "700", marginLeft: 8, marginTop: 12 },
    locationBlock: {
        flexDirection: "row",
        backgroundColor: "#fff",
        marginTop: 10,
        borderRadius: 8,
        overflow: "hidden",
        elevation: 1,
        alignItems: "center",
    },
    locationImage: { width: 120, height: 90, resizeMode: "cover" },
    locationTextWrap: { flex: 1, padding: 8 },
    locationName: { fontSize: 16, fontWeight: "700" },
    locationDesc: { fontSize: 13, marginTop: 4 },
    detailsButton: { paddingHorizontal: 12, paddingVertical: 8 },
    detailsButtonText: { color: "#007AFF", fontWeight: "700" },
    purchaseButton: {
        backgroundColor: "#4CAF50",
        borderRadius: 50,
        paddingVertical: 14,
        paddingHorizontal: 30,
        alignSelf: "center",
        marginTop: 30,
        marginBottom: 40,
    },
    purchaseText: { color: "white", fontSize: 18, fontWeight: "700" },
});
