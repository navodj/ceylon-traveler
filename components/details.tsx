// import React, { useState } from "react";
// import {
//     View,
//     Text,
//     ScrollView,
//     Image,
//     TouchableOpacity,
//     TextInput,
//     StyleSheet,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import MapView, { Marker, Polyline } from "react-native-maps";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useLocalSearchParams, useRouter } from "expo-router";
//
// // (AttractionCard and HotelCard components are the same)
// const AttractionCard = ({ item, onPress }: any) => (
//     <TouchableOpacity onPress={() => onPress(item)} style={styles.cardContainer}>
//         <Image source={{ uri: item.image_url }} style={styles.cardImage} />
//         <View style={styles.cardContent}>
//             <Text style={styles.categoryText}>{item.description}</Text>
//             <Text style={styles.titleText} numberOfLines={2}>
//                 {item.name}
//             </Text>
//             <View style={styles.cardFooter}>
//                 <Text style={styles.distanceText}>2.5km</Text>
//                 <View style={styles.ratingBadge}>
//                     <Text style={styles.ratingText}>⭐ 4.5</Text>
//                 </View>
//             </View>
//         </View>
//     </TouchableOpacity>
// );
//
// const HotelCard = ({ hotel, onPress }: any) => (
//     <TouchableOpacity onPress={() => onPress(hotel)} style={styles.hotelCard}>
//         <Image source={hotel.image} style={styles.hotelImage} />
//         <View style={styles.hotelInfo}>
//             <Text style={styles.hotelName}>{hotel.name}</Text>
//             <Text style={styles.hotelLocation}>{hotel.location}</Text>
//             <View style={styles.hotelFooter}>
//                 <Text style={styles.hotelPrice}>{hotel.price}</Text>
//                 <Text style={styles.hotelRating}>⭐ {hotel.rating}</Text>
//             </View>
//         </View>
//     </TouchableOpacity>
// );
//
//
// export default function TravelUIScreen() {
//     const params = useLocalSearchParams();
//     const router = useRouter();
//
//     // --- (START) NEW DEBUGGING LOG ---
//     console.log("Data received on details screen:", params.itineraryData);
//     // --- (END) NEW DEBUGGING LOG ---
//
//     // (Navigation logic)
//     const itinerary = JSON.parse((params.itineraryData as string) || "[]");
//     const currentDayIndex = Number(params.currentDayIndex || 0);
//     const dayData = itinerary[currentDayIndex] || { locations: [], route_geometries: [] };
//
//     const prevDayIndex = currentDayIndex - 1;
//     const nextDayIndex = currentDayIndex + 1;
//     const hasPrevDay = prevDayIndex >= 0;
//     const hasNextDay = nextDayIndex < itinerary.length;
//
//     const goToDay = (index: number) => {
//         router.replace({
//             pathname: "/details",
//             params: {
//                 itineraryData: params.itineraryData,
//                 currentDayIndex: index
//             }
//         });
//     };
//
//     // (Data processing)
//     const attractions = dayData.locations || [];
//     const dayNumber = dayData.day_number || 1;
//
//     const routeCoordinates: { latitude: number; longitude: number }[] = [];
//
//     // This 'if' block is safe, but it's not running because
//     // dayData.route_geometries is missing from your backend response
//     if (dayData.route_geometries && Array.isArray(dayData.route_geometries)) {
//         dayData.route_geometries.forEach((route: any) => {
//             route.coordinates.forEach((coord: [number, number]) => {
//                 routeCoordinates.push({
//                     latitude: coord[1],
//                     longitude: coord[0],
//                 });
//             });
//         });
//     }
//
//     const initialMapRegion = attractions.length > 0
//         ? {
//             latitude: attractions[0].coordinates.latitude,
//             longitude: attractions[0].coordinates.longitude,
//             latitudeDelta: 0.09,
//             longitudeDelta: 0.09,
//         }
//         : {
//             latitude: 7.275,
//             longitude: 80.62,
//             latitudeDelta: 0.09,
//             longitudeDelta: 0.09,
//         };
//
//     // (Dummy hotel data)
//     const hotels = [
//         { name: "SKYLOFT KANDY", location: "Kandy", price: "8,000 LKR", rating: 4.5, image: require("../assets/images/skyloft.jpg") },
//         { name: "Mountain Villa", location: "Hanthana", price: "7,500 LKR", rating: 4.4, image: require("../assets/images/Mount_Lavinia_Hotel_in_Sri_Lanka.jpg") },
//     ];
//
//     const [selectedCategory, setSelectedCategory] = useState("Coffee");
//     const [searchQuery, setSearchQuery] = useState("");
//
//     const handleAttractionPress = (place: any) => console.log("Go to map location:", place.name);
//     const handleHotelPress = (hotel: any) => console.log("Hotel clicked:", hotel.name);
//     const handleSearch = () => console.log("Searching on map for:", searchQuery);
//
//     return (
//         <SafeAreaView style={styles.container}>
//             <MapView
//                 style={StyleSheet.absoluteFillObject}
//                 initialRegion={initialMapRegion}
//             >
//                 {attractions.map((place: any, index: number) => (
//                     <Marker
//                         key={index}
//                         coordinate={{
//                             latitude: place.coordinates.latitude,
//                             longitude: place.coordinates.longitude,
//                         }}
//                         title={place.name}
//                     />
//                 ))}
//                 <Polyline coordinates={routeCoordinates} strokeColor="#007AFF" strokeWidth={4} />
//             </MapView>
//
//             {/* Top Header */}
//             <View style={styles.header}>
//                 <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
//                     <Ionicons name="arrow-back" size={22} color="black" />
//                 </TouchableOpacity>
//                 <View style={styles.searchBar}>
//                     <Ionicons name="search" size={18} color="gray" />
//                     <TextInput
//                         placeholder="Search"
//                         placeholderTextColor="gray"
//                         style={styles.searchInput}
//                         value={searchQuery}
//                         onChangeText={setSearchQuery}
//                         onSubmitEditing={handleSearch}
//                     />
//                 </View>
//                 <TouchableOpacity style={styles.iconButton}>
//                     <Ionicons name="filter" size={22} color="black" />
//                 </TouchableOpacity>
//             </View>
//
//             <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>
//                 <View style={{ height: 260 }} />
//
//                 <View style={styles.sheet}>
//                     {/* Day Navigation Buttons */}
//                     <View style={styles.dayNavContainer}>
//                         {hasPrevDay ? (
//                             <TouchableOpacity
//                                 style={styles.dayNavButton}
//                                 onPress={() => goToDay(prevDayIndex)}
//                             >
//                                 <Ionicons name="chevron-back" size={18} color="#007AFF" />
//                                 <Text style={styles.dayNavText}>Day {dayNumber - 1}</Text>
//                             </TouchableOpacity>
//                         ) : (
//                             <View style={{flex: 1}} />
//                         )}
//
//                         {hasNextDay && (
//                             <TouchableOpacity
//                                 style={styles.dayNavButton}
//                                 onPress={() => goToDay(nextDayIndex)}
//                             >
//                                 <Text style={styles.dayNavText}>Day {dayNumber + 1}</Text>
//                                 <Ionicons name="chevron-forward" size={18} color="#007AFF" />
//                             </TouchableOpacity>
//                         )}
//                     </View>
//
//                     {/* Categories */}
//                     <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
//                         {["Coffee", "Breakfast", "Museum", "Sound"].map((item) => (
//                             <TouchableOpacity
//                                 key={item}
//                                 onPress={() => setSelectedCategory(item)}
//                                 style={[
//                                     styles.categoryButton,
//                                     { backgroundColor: item === selectedCategory ? "#FFD54F" : "#F1F1F1" },
//                                 ]}
//                             >
//                                 <Text
//                                     style={[
//                                         styles.categoryTextMain,
//                                         { fontWeight: item === selectedCategory ? "600" : "400" },
//                                     ]}
//                                 >
//                                     {item}
//                                 </Text>
//                             </TouchableOpacity>
//                         ))}
//                     </ScrollView>
//
//                     {/* Nearby Attractions */}
//                     <ScrollView
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         style={{ paddingHorizontal: 16, marginTop: 16 }}
//                     >
//                         {attractions.map((item: any, index: number) => (
//                             <AttractionCard key={index} item={item} onPress={handleAttractionPress} />
//                         ))}
//                     </ScrollView>
//
//                     {/* Recommended Hotels */}
//                     <Text style={styles.sectionTitle}>Recommended best{"\n"}Places to stay</Text>
//                     <Text style={styles.subTitle}>Recommended</Text>
//
//                     <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 16, marginTop: 8 }}>
//                         {hotels.map((hotel, index) => (
//                             <HotelCard key={index} hotel={hotel} onPress={handleHotelPress} />
//                         ))}
//                     </ScrollView>
//                 </View>
//             </ScrollView>
//
//             {/* Bottom Navigation */}
//             <View style={styles.bottomNav}>
//                 <Ionicons name="home-outline" size={24} color="gray" />
//                 <Ionicons name="search-outline" size={24} color="gray" />
//                 <TouchableOpacity style={styles.notificationButton}>
//                     <Ionicons name="notifications-outline" size={24} color="green" />
//                 </TouchableOpacity>
//                 <Ionicons name="person-outline" size={24} color="gray" />
//             </View>
//         </SafeAreaView>
//     );
// }
//
// // (Styles are all the same)
// const styles = StyleSheet.create({
//     dayNavContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         paddingHorizontal: 20,
//         paddingVertical: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#eee',
//     },
//     dayNavButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 8,
//     },
//     dayNavText: {
//         fontSize: 16,
//         fontWeight: '600',
//         color: '#007AFF',
//         marginHorizontal: 5,
//     },
//     container: { flex: 1, backgroundColor: "white" },
//     header: {
//         position: "absolute",
//         top: 20,
//         left: 0,
//         right: 0,
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//         paddingHorizontal: 16,
//     },
//     iconButton: {
//         backgroundColor: "white",
//         padding: 8,
//         borderRadius: 100,
//         elevation: 3,
//     },
//     searchBar: {
//         flex: 1,
//         flexDirection: "row",
//         backgroundColor: "white",
//         marginHorizontal: 8,
//         borderRadius: 50,
//         alignItems: "center",
//         paddingHorizontal: 12,
//         paddingVertical: 6,
//         elevation: 2,
//     },
//     searchInput: { flex: 1, marginLeft: 6, color: "#333" },
//     contentScroll: { flex: 1 },
//     sheet: {
//         backgroundColor: "white",
//         borderTopLeftRadius: 30,
//         borderTopRightRadius: 30,
//         paddingBottom: 80,
//         paddingTop: 12,
//     },
//     categoryScroll: { paddingHorizontal: 16, marginTop: 8 },
//     categoryButton: {
//         paddingHorizontal: 18,
//         paddingVertical: 8,
//         borderRadius: 25,
//         marginRight: 10,
//     },
//     categoryTextMain: { fontSize: 14, color: "#333" },
//     cardContainer: {
//         width: 220,
//         marginRight: 14,
//         borderRadius: 20,
//         backgroundColor: "white",
//         elevation: 3,
//         overflow: "hidden",
//     },
//     cardImage: { width: "100%", height: 120 },
//     cardContent: { padding: 10 },
//     categoryText: { fontSize: 12, color: "#777" },
//     titleText: { fontSize: 14, fontWeight: "600", marginTop: 4 },
//     cardFooter: { flexDirection: "row", justifyContent: "space-between", marginTop: 6 },
//     distanceText: { fontSize: 12, color: "#666" },
//     ratingBadge: { backgroundColor: "#E8F5E9", borderRadius: 12, paddingHorizontal: 6, paddingVertical: 2 },
//     ratingText: { fontSize: 12, color: "green" },
//     sectionTitle: {
//         fontSize: 22,
//         fontWeight: "700",
//         textAlign: "center",
//         marginTop: 40,
//         color: "#333",
//     },
//     subTitle: { fontSize: 16, fontWeight: "600", paddingHorizontal: 16, marginTop: 10 },
//     hotelCard: {
//         width: 250,
//         marginRight: 14,
//         borderRadius: 20,
//         backgroundColor: "white",
//         elevation: 3,
//         overflow: "hidden",
//     },
//     hotelImage: { width: "100%", height: 150 },
//     hotelInfo: { padding: 10 },
//     hotelName: { fontSize: 16, fontWeight: "600" },
//     hotelLocation: { fontSize: 14, color: "#666" },
//     hotelFooter: { flexDirection: "row", justifyContent: "space-between", marginTop: 4 },
//     hotelPrice: { fontSize: 14, color: "#333" },
//     hotelRating: { fontSize: 14, color: "#FFB300" },
//     bottomNav: {
//         position: "absolute",
//         bottom: 0,
//         left: 0,
//         right: 0,
//         flexDirection: "row",
//         justifyContent: "space-around",
//         alignItems: "center",
//         paddingVertical: 10,
//         backgroundColor: "white",
//         borderTopWidth: 1,
//         borderColor: "#eee",
//     },
//     notificationButton: {
//         backgroundColor: "#C8E6C9",
//         padding: 10,
//         borderRadius: 30,
//         marginTop: -20,
//         elevation: 3,
//     },
// });



import React, { useMemo, useRef, useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StyleSheet,
    Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { Marker, Polyline } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const AttractionCard = ({ item, onPress }: any) => (
    <TouchableOpacity onPress={() => onPress(item)} style={styles.cardContainer}>
        <Image source={{ uri: item.image_url }} style={styles.cardImage} />
        <View style={styles.cardContent}>
            <Text style={styles.categoryText}>{item.description}</Text>
            <Text style={styles.titleText} numberOfLines={2}>
                {item.name}
            </Text>
            <View style={styles.cardFooter}>
                <Text style={styles.distanceText}>2.5km</Text>
                <View style={styles.ratingBadge}>
                    <Text style={styles.ratingText}>⭐ 4.5</Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>
);

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
    const params = useLocalSearchParams();
    const router = useRouter();

    const itinerary = JSON.parse((params.itineraryData as string) || "[]");
    const currentDayIndex = Number(params.currentDayIndex || 0);
    const dayData = itinerary[currentDayIndex] || { locations: [], route_geometries: [] };

    const prevDayIndex = currentDayIndex - 1;
    const nextDayIndex = currentDayIndex + 1;
    const hasPrevDay = prevDayIndex >= 0;
    const hasNextDay = nextDayIndex < itinerary.length;

    const goToDay = (index: number) => {
        router.replace({
            pathname: "/details",
            params: { itineraryData: params.itineraryData, currentDayIndex: index },
        });
    };

    const attractions = dayData.locations || [];
    const dayNumber = dayData.day_number || 1;

    const routeCoordinates: { latitude: number; longitude: number }[] = [];
    if (dayData.route_geometries && Array.isArray(dayData.route_geometries)) {
        dayData.route_geometries.forEach((route: any) => {
            route.coordinates.forEach((coord: [number, number]) =>
                routeCoordinates.push({ latitude: coord[1], longitude: coord[0] })
            );
        });
    }

    const initialMapRegion = attractions.length
        ? {
            latitude: attractions[0].coordinates.latitude,
            longitude: attractions[0].coordinates.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.09,
        }
        : {
            latitude: 7.275,
            longitude: 80.62,
            latitudeDelta: 0.09,
            longitudeDelta: 0.09,
        };

    const hotels = [
        {
            name: "SKYLOFT KANDY",
            location: "Kandy",
            price: "8,000 LKR",
            rating: 4.5,
            image: require("../assets/images/skyloft.jpg"),
        },
        {
            name: "Mountain Villa",
            location: "Hanthana",
            price: "7,500 LKR",
            rating: 4.4,
            image: require("../assets/images/Mount_Lavinia_Hotel_in_Sri_Lanka.jpg"),
        },
    ];

    const [selectedCategory, setSelectedCategory] = useState("Coffee");
    const [searchQuery, setSearchQuery] = useState("");
    const handleAttractionPress = (p: any) => console.log("Go to map location:", p.name);
    const handleHotelPress = (h: any) => console.log("Hotel clicked:", h.name);
    const handleSearch = () => console.log("Searching on map for:", searchQuery);

    // --- Bottom Sheet Setup ---
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => [SCREEN_HEIGHT * 0.15, SCREEN_HEIGHT * 0.5, SCREEN_HEIGHT * 0.95], []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                {/* Map background */}
                <MapView style={StyleSheet.absoluteFillObject} initialRegion={initialMapRegion}>
                    {attractions.map((place: any, index: number) => (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: place.coordinates.latitude,
                                longitude: place.coordinates.longitude,
                            }}
                            title={place.name}
                        />
                    ))}
                    <Polyline coordinates={routeCoordinates} strokeColor="#007AFF" strokeWidth={4} />
                </MapView>

                {/* Top Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
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

                {/* Draggable Bottom Sheet */}
                <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints} enablePanDownToClose={false}>
                    <BottomSheetScrollView showsVerticalScrollIndicator={false}>
                        {/* Back Button */}
                        <TouchableOpacity style={styles.sheetBackButton} onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={20} color="#007AFF" />
                            <Text style={styles.sheetBackText}>Back</Text>
                        </TouchableOpacity>

                        {/* Day Navigation */}
                        <View style={styles.dayNavContainer}>
                            {hasPrevDay ? (
                                <TouchableOpacity style={styles.dayNavButton} onPress={() => goToDay(prevDayIndex)}>
                                    <Ionicons name="chevron-back" size={18} color="#007AFF" />
                                    <Text style={styles.dayNavText}>Day {dayNumber - 1}</Text>
                                </TouchableOpacity>
                            ) : (
                                <View style={{ flex: 1 }} />
                            )}
                            {hasNextDay && (
                                <TouchableOpacity style={styles.dayNavButton} onPress={() => goToDay(nextDayIndex)}>
                                    <Text style={styles.dayNavText}>Day {dayNumber + 1}</Text>
                                    <Ionicons name="chevron-forward" size={18} color="#007AFF" />
                                </TouchableOpacity>
                            )}
                        </View>

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

                        {/* Attractions */}
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 16, marginTop: 16 }}>
                            {attractions.map((item: any, index: number) => (
                                <AttractionCard key={index} item={item} onPress={handleAttractionPress} />
                            ))}
                        </ScrollView>

                        {/* Hotels */}
                        <Text style={styles.sectionTitle}>Recommended best{"\n"}Places to stay</Text>
                        <Text style={styles.subTitle}>Recommended</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 16, marginTop: 8 }}>
                            {hotels.map((hotel, index) => (
                                <HotelCard key={index} hotel={hotel} onPress={handleHotelPress} />
                            ))}
                        </ScrollView>
                    </BottomSheetScrollView>
                </BottomSheet>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}

// --- Styles ---
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
        zIndex: 10,
    },
    iconButton: { backgroundColor: "white", padding: 8, borderRadius: 100, elevation: 3 },
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
    sheetBackButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderBottomWidth: 1,
        borderColor: "#eee",
    },
    sheetBackText: { color: "#007AFF", fontSize: 16, marginLeft: 4, fontWeight: "600" },
    dayNavContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    dayNavButton: { flexDirection: "row", alignItems: "center", padding: 8 },
    dayNavText: { fontSize: 16, fontWeight: "600", color: "#007AFF", marginHorizontal: 5 },
    categoryScroll: { paddingHorizontal: 16, marginTop: 8 },
    categoryButton: { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 25, marginRight: 10 },
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
    ratingBadge: {
        backgroundColor: "#E8F5E9",
        borderRadius: 12,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
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
});
