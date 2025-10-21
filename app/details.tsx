import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker, Polyline } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

// ✅ Reusable component for Attraction Card
const AttractionCard = ({ item, onPress }: any) => (
    <TouchableOpacity onPress={() => onPress(item)} style={styles.cardContainer}>
        <Image source={item.image} style={styles.cardImage} />
        <View style={styles.cardContent}>
            <Text style={styles.categoryText}>{item.category}</Text>
            <Text style={styles.titleText} numberOfLines={2}>
                {item.title}
            </Text>
            <View style={styles.cardFooter}>
                <Text style={styles.distanceText}>{item.distance}</Text>
                <View style={styles.ratingBadge}>
                    <Text style={styles.ratingText}>⭐ {item.rating}</Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>
);

// ✅ Reusable component for Hotel Card
const HotelCard = ({ hotel, onPress }: any) => (
    <TouchableOpacity onPress={() => onPress(hotel)} style={styles.hotelCard}>
        <Image source={hotel.image} style={styles.hotelImage} />
        <View style={styles.hotelInfo}>
            <Text style={styles.hotelName}>{hotel.name}</Text>
            <Text style={styles.hotelLocation}>{hotel.location}</Text>
            <View style={styles.hotelFooter}>
                <Text style={styles.hotelPrice}>{hotel.price}</Text>
                <Text style={styles.hotelRating}>⭐ {hotel.rating}</Text>
            </View>
        </View>
    </TouchableOpacity>
);

export default function TravelUIScreen() {
    const [selectedCategory, setSelectedCategory] = useState("Coffee");
    const [searchQuery, setSearchQuery] = useState("");

    const attractions = [
        {
            title: "Sri Dalada Maligawa (Temple of Tooth)",
            category: "Cultural values",
            distance: "2.5km",
            rating: 4.5,
            image: require("../assets/temple.jpeg"),
            latitude: 7.2936,
            longitude: 80.6414,
        },
        {
            title: "Hanthana Mountain Range",
            category: "Nature lovers",
            distance: "2.5km",
            rating: 4.5,
            image: require("../assets/hanthana.jpg"),
            latitude: 7.2633,
            longitude: 80.6214,
        },
    ];

    const hotels = [
        {
            name: "SKYLOFT KANDY",
            location: "Kandy",
            price: "8,000 LKR",
            rating: 4.5,
            image: require("../assets/skyloft.jpg"),
        },
        {
            name: "Mountain Villa",
            location: "Hanthana",
            price: "7,500 LKR",
            rating: 4.4,
            image: require("../assets/mountainvilla.jpg"),
        },
    ];

    const routeCoordinates = [
        { latitude: 7.2914, longitude: 80.6365 },
        { latitude: 7.292, longitude: 80.638 },
        { latitude: 7.2885, longitude: 80.64 },
        { latitude: 7.284, longitude: 80.631 },
    ];

    // On attraction click
    const handleAttractionPress = (place: any) => {
        console.log("Go to map location:", place.title);
        // navigation.navigate('MapScreen', { location: place })
    };

    // On hotel click
    const handleHotelPress = (hotel: any) => {
        console.log("Hotel clicked:", hotel.name);
    };

    // Search (filter on map, not override paths)
    const handleSearch = () => {
        console.log("Searching on map for:", searchQuery);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* 🗺️ Map Background */}
            <MapView
                style={StyleSheet.absoluteFillObject}
                initialRegion={{
                    latitude: 7.275,
                    longitude: 80.62,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.09,
                }}
            >
                {attractions.map((place, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: place.latitude,
                            longitude: place.longitude,
                        }}
                        title={place.title}
                    />
                ))}
                <Polyline coordinates={routeCoordinates} strokeColor="#007AFF" strokeWidth={4} />
            </MapView>

            {/* 🔝 Top Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="arrow-back" size={22} color="black" />
                </TouchableOpacity>

                <View style={styles.searchBar}>
                    <Ionicons name="search" size={18} color="gray" />
                    <TextInput
                        placeholder="Search"
                        placeholderTextColor="gray"
                        style={styles.searchInput}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onSubmitEditing={handleSearch}
                    />
                </View>

                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="filter" size={22} color="black" />
                </TouchableOpacity>
            </View>

            {/* 🌍 Scrollable content */}
            <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>
                <View style={{ height: 260 }} />

                <View style={styles.sheet}>
                    {/* Categories */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
                        {["Coffee", "Breakfast", "Museum", "Sound"].map((item) => (
                            <TouchableOpacity
                                key={item}
                                onPress={() => setSelectedCategory(item)}
                                style={[
                                    styles.categoryButton,
                                    { backgroundColor: item === selectedCategory ? "#FFD54F" : "#F1F1F1" },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.categoryTextMain,
                                        { fontWeight: item === selectedCategory ? "600" : "400" },
                                    ]}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Nearby Attractions */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ paddingHorizontal: 16, marginTop: 16 }}
                    >
                        {attractions.map((item, index) => (
                            <AttractionCard key={index} item={item} onPress={handleAttractionPress} />
                        ))}
                    </ScrollView>

                    {/* Recommended Hotels */}
                    <Text style={styles.sectionTitle}>Recommended best{"\n"}Places to stay</Text>
                    <Text style={styles.subTitle}>Recommended</Text>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 16, marginTop: 8 }}>
                        {hotels.map((hotel, index) => (
                            <HotelCard key={index} hotel={hotel} onPress={handleHotelPress} />
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>

            {/* ⚙️ Bottom Navigation */}
            <View style={styles.bottomNav}>
                <Ionicons name="home-outline" size={24} color="gray" />
                <Ionicons name="search-outline" size={24} color="gray" />
                <TouchableOpacity style={styles.notificationButton}>
                    <Ionicons name="notifications-outline" size={24} color="green" />
                </TouchableOpacity>
                <Ionicons name="person-outline" size={24} color="gray" />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "white" },
    header: {
        position: "absolute",
        top: 20,
        left: 0,
        right: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
    },
    iconButton: {
        backgroundColor: "white",
        padding: 8,
        borderRadius: 100,
        elevation: 3,
    },
    searchBar: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "white",
        marginHorizontal: 8,
        borderRadius: 50,
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 6,
        elevation: 2,
    },
    searchInput: { flex: 1, marginLeft: 6, color: "#333" },
    contentScroll: { flex: 1 },
    sheet: {
        backgroundColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingBottom: 80,
        paddingTop: 12,
    },
    categoryScroll: { paddingHorizontal: 16, marginTop: 8 },
    categoryButton: {
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 25,
        marginRight: 10,
    },
    categoryTextMain: { fontSize: 14, color: "#333" },
    cardContainer: {
        width: 220,
        marginRight: 14,
        borderRadius: 20,
        backgroundColor: "white",
        elevation: 3,
        overflow: "hidden",
    },
    cardImage: { width: "100%", height: 120 },
    cardContent: { padding: 10 },
    categoryText: { fontSize: 12, color: "#777" },
    titleText: { fontSize: 14, fontWeight: "600", marginTop: 4 },
    cardFooter: { flexDirection: "row", justifyContent: "space-between", marginTop: 6 },
    distanceText: { fontSize: 12, color: "#666" },
    ratingBadge: { backgroundColor: "#E8F5E9", borderRadius: 12, paddingHorizontal: 6, paddingVertical: 2 },
    ratingText: { fontSize: 12, color: "green" },
    sectionTitle: {
        fontSize: 22,
        fontWeight: "700",
        textAlign: "center",
        marginTop: 40,
        color: "#333",
    },
    subTitle: { fontSize: 16, fontWeight: "600", paddingHorizontal: 16, marginTop: 10 },
    hotelCard: {
        width: 250,
        marginRight: 14,
        borderRadius: 20,
        backgroundColor: "white",
        elevation: 3,
        overflow: "hidden",
    },
    hotelImage: { width: "100%", height: 150 },
    hotelInfo: { padding: 10 },
    hotelName: { fontSize: 16, fontWeight: "600" },
    hotelLocation: { fontSize: 14, color: "#666" },
    hotelFooter: { flexDirection: "row", justifyContent: "space-between", marginTop: 4 },
    hotelPrice: { fontSize: 14, color: "#333" },
    hotelRating: { fontSize: 14, color: "#FFB300" },
    bottomNav: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: 10,
        backgroundColor: "white",
        borderTopWidth: 1,
        borderColor: "#eee",
    },
    notificationButton: {
        backgroundColor: "#C8E6C9",
        padding: 10,
        borderRadius: 30,
        marginTop: -20,
        elevation: 3,
    },
});
