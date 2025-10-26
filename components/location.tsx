import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LocationScreen() {
    const params = useLocalSearchParams();
    const router = useRouter();

    console.log("Params received on location screen:", params.responseData);

    let responseData = {};
    try {
        responseData = JSON.parse((params.responseData as string) || "{}");
    } catch (e) {
        console.error("Failed to parse responseData:", e);
    }

    // --- (START) THIS IS THE FIX ---
    // Added '(responseData as any)' to fix the TypeScript error
    const itinerary = (responseData && Array.isArray((responseData as any).itinerary))
        ? (responseData as any).itinerary
        : [];
    // --- (END) THIS IS THE FIX ---

    const dayCount = itinerary.length;

    const routeCoords: { latitude: number; longitude: number }[] = [];
    const markers: { latitude: number; longitude: number; title: string }[] = [];

    itinerary.forEach((day: any) => {
        // Add safety check for 'locations'
        if (day.locations && Array.isArray(day.locations)) {
            day.locations.forEach((loc: any) => {
                markers.push({
                    latitude: loc.coordinates.latitude,
                    longitude: loc.coordinates.longitude,
                    title: loc.name,
                });
            });
        }

        // Add safety check for 'route_geometries'
        if (day.route_geometries && Array.isArray(day.route_geometries)) {
            day.route_geometries.forEach((route: any) => {
                route.coordinates.forEach((coord: [number, number]) => {
                    routeCoords.push({
                        latitude: coord[1],
                        longitude: coord[0],
                    });
                });
            });
        }
    });

    // Use markers for the initial region, not routeCoords
    const initialMapRegion = markers.length > 0
        ? {
            latitude: markers[0].latitude,
            longitude: markers[0].longitude,
            latitudeDelta: 2.5,
            longitudeDelta: 2.5,
        }
        : { // Default to center of Sri Lanka
            latitude: 7.2,
            longitude: 80.6,
            latitudeDelta: 2.5,
            longitudeDelta: 2.5,
        };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={styles.backText}>Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Your {dayCount}-Day Plan</Text>
                    <Text style={styles.filterText}></Text>
                </View>

                <Text style={styles.subTitle}>Location List</Text>

                {/* Map */}
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={initialMapRegion}
                    >
                        {routeCoords.length > 0 && (
                            <Polyline
                                coordinates={routeCoords}
                                strokeColor="#007AFF"
                                strokeWidth={4}
                            />
                        )}
                        {/* Make sure to render markers */}
                        {markers.length > 0 && markers.map((marker, index) => (
                            <Marker
                                key={index}
                                coordinate={marker}
                                title={marker.title}
                            />
                        ))}
                    </MapView>
                </View>

                {/* Map over the REAL itinerary data */}
                {itinerary.map((dayItem: any, index: number) => (
                    <TouchableOpacity
                        key={dayItem.day_number}
                        style={styles.card}
                        onPress={() =>
                            router.push({
                                pathname: "/details",
                                params: {
                                    // We now pass the 'itinerary' as a string
                                    itineraryData: JSON.stringify(itinerary),
                                    currentDayIndex: index
                                },
                            })
                        }
                    >
                        <Image
                            // Added safety check for 'locations' array not being empty
                            source={{ uri: dayItem.locations[0]?.image_url }}
                            style={styles.cardImage}
                        />
                        <Text style={styles.cardText}>
                            {/* Added safety check for 'locations' array not being empty */}
                            Day {dayItem.day_number}: {dayItem.locations[0]?.name || 'Plan Details'}
                        </Text>
                    </TouchableOpacity>
                ))}

                Purchase Button
                <TouchableOpacity
                    style={styles.purchaseButton}
                    onPress={() => router.push("/payment1")}
                >
                    <Text style={styles.purchaseText}>Make a purchase</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

// (Styles are the same)
const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    backText: {
        color: "#4CAF50",
        fontSize: 16,
    },
    filterText: {
        color: "#4CAF50",
        fontSize: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
    },
    subTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginTop: 20,
        marginLeft: 20,
    },
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
    cardText: {
        textAlign: "center",
        padding: 10,
        fontWeight: "600",
    },
    purchaseButton: {
        backgroundColor: "#4CAF50",
        borderRadius: 50,
        paddingVertical: 14,
        paddingHorizontal: 30,
        alignSelf: "center",
        marginTop: 30,
    },
    purchaseText: {
        color: "white",
        fontSize: 18,
        fontWeight: "700",
    },
});