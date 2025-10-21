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
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";


export default function LocationScreen() {
    const { days } = useLocalSearchParams();
    const dayCount = Number(days) || 4; // fallback for testing

    // Dummy coordinates (replace with backend route later)
    const routeCoords = [
        { latitude: 6.9271, longitude: 79.8612 }, // Colombo
        { latitude: 7.2906, longitude: 80.6337 }, // Kandy
        { latitude: 6.9731, longitude: 80.7650 }, // Nuwara Eliya
        { latitude: 6.8667, longitude: 81.0472 }, // Ella
        { latitude: 6.0535, longitude: 80.2210 }, // Galle
        { latitude: 6.9271, longitude: 79.8612 }, // back to Colombo
    ];

    const tripImages = [
        "https://upload.wikimedia.org/wikipedia/commons/5/55/Temple_of_the_Tooth%2C_Kandy%2C_Sri_Lanka_02.JPG",
        "https://upload.wikimedia.org/wikipedia/commons/8/84/Blue_train_Sri_Lanka.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/d/d7/Horton_Plains_Sri_Lanka_3.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/0/0f/Galle_Fort_Lighthouse_2018.jpg",
    ];

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.backText}></Text>
                <Text style={styles.title}>Locations</Text>
                <Text style={styles.filterText}></Text>
            </View>

            <Text style={styles.subTitle}>Location List</Text>

            {/* Map */}
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 7.2,
                        longitude: 80.6,
                        latitudeDelta: 2.5,
                        longitudeDelta: 2.5,
                    }}
                >
                    <Polyline
                        coordinates={routeCoords}
                        strokeColor="#007AFF"
                        strokeWidth={4}
                    />
                    {routeCoords.map((coord, index) => (
                        <Marker key={index} coordinate={coord} />
                    ))}
                </MapView>
            </View>
          {/* Trip Plan Cards */}
          {Array.from({ length: dayCount }).map((_, i) => (
            <TouchableOpacity
              key={i}
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: "/details",
                  params: {
                    day: i + 1,
                    image: tripImages[i % tripImages.length],
                  },
                })
              }
            >
              <Image
                source={{ uri: tripImages[i % tripImages.length] }}
                style={styles.cardImage}
              />
              <Text style={styles.cardText}>
                Your day {i + 1} trip plan and details
              </Text>
            </TouchableOpacity>
          ))}

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
