

// import { Ionicons } from "@expo/vector-icons";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import React, { useState } from "react";
// import {
//     Image,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from "react-native";
// import MapView, { Marker, Polyline } from "react-native-maps";
// import { SafeAreaView } from "react-native-safe-area-context";

// // (AttractionCard and HotelCard components remain the same)
// const AttractionCard = ({ item, onPress }: any) => (
//     <TouchableOpacity onPress={() => onPress(item)} style={styles.cardContainer}>
//         <Image 
//             source={{ uri: item.image_url }} 
//             style={styles.cardImage} 
//             // Add a fallback for missing images if necessary
//             // defaultSource={require('../assets/images/placeholder.png')} 
//         />
//         <View style={styles.cardContent}>
//             <Text style={styles.categoryText} numberOfLines={1}>{item.description}</Text> 
//             <Text style={styles.titleText} numberOfLines={2}>
//                 {item.name}
//             </Text>
//             <View style={styles.cardFooter}>
//                 <Text style={styles.distanceText}>Details</Text> 
//                 <View style={styles.ratingBadge}>
//                     <Text style={styles.ratingText}>⭐ 4.5</Text> 
//                     {/* Consider fetching real rating later */}
//                 </View>
//             </View>
//         </View>
//     </TouchableOpacity>
// );

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


// export default function TravelUIScreen() {
//     const params = useLocalSearchParams();
//     const router = useRouter();

//     console.log("Data received on details screen:", params.itineraryData);

//     // Navigation logic
//     const itinerary = JSON.parse((params.itineraryData as string) || "[]");
//     const currentDayIndex = Number(params.currentDayIndex || 0);
//     // Add safety check for itinerary structure
//     const dayData = (itinerary && itinerary[currentDayIndex]) 
//                    ? itinerary[currentDayIndex] 
//                    : { day_number: 1, locations: [], route_geometries: [] }; // Fallback
    
//     const prevDayIndex = currentDayIndex - 1;
//     const nextDayIndex = currentDayIndex + 1;
//     const hasPrevDay = prevDayIndex >= 0;
//     const hasNextDay = nextDayIndex < itinerary.length;

//     const goToDay = (index: number) => {
//         router.replace({
//             pathname: "/details",
//             params: {
//                 itineraryData: params.itineraryData, // Pass the full list along
//                 currentDayIndex: index
//             }
//         });
//     };
    
//     // Data processing
//     const attractions = dayData.locations || [];
//     const dayNumber = dayData.day_number || (currentDayIndex + 1); // Use index as fallback

//     const routeCoordinates: { latitude: number; longitude: number }[] = [];
//     // Safety check before accessing route_geometries
//     if (dayData.route_geometries && Array.isArray(dayData.route_geometries)) {
//         dayData.route_geometries.forEach((route: any) => {
//              // Safety check for route.coordinates
//             if (route.coordinates && Array.isArray(route.coordinates)) {
//                 route.coordinates.forEach((coord: [number, number]) => {
//                     // Safety check for coord format
//                     if (Array.isArray(coord) && coord.length === 2) {
//                         routeCoordinates.push({ latitude: coord[1], longitude: coord[0] });
//                     }
//                 });
//             }
//         });
//     }

//     // Determine initial region based on attractions, then route, then fallback
//      const initialMapRegion = attractions.length > 0 && attractions[0].coordinates
//         ? {
//             latitude: attractions[0].coordinates.latitude,
//             longitude: attractions[0].coordinates.longitude,
//             latitudeDelta: 0.09, // Zoom level
//             longitudeDelta: 0.09, // Zoom level
//         }
//         : routeCoordinates.length > 0 // Fallback to first route point if no attractions
//         ? {
//             latitude: routeCoordinates[0].latitude,
//             longitude: routeCoordinates[0].longitude,
//             latitudeDelta: 0.09, 
//             longitudeDelta: 0.09, 
//           }
//         : { // Absolute fallback
//             latitude: 7.275, longitude: 80.62, latitudeDelta: 0.09, longitudeDelta: 0.09 
//         };


//     // Dummy hotel data (remains the same)
//     const hotels = [
//         { name: "SKYLOFT KANDY", location: "Kandy", price: "8,000 LKR", rating: 4.5, image: require("../assets/images/skyloft.jpg") },
//         { name: "Mountain Villa", location: "Hanthana", price: "7,500 LKR", rating: 4.4, image: require("../assets/images/Mount_Lavinia_Hotel_in_Sri_Lanka.jpg") },
//     ];
    
//     // State for categories/search (remains the same)
//     const [selectedCategory, setSelectedCategory] = useState("Attractions"); // Default to Attractions
//     const [searchQuery, setSearchQuery] = useState("");

//     // Handlers (remain the same)
//     const handleAttractionPress = (place: any) => console.log("Go to map location:", place.name);
//     const handleHotelPress = (hotel: any) => console.log("Hotel clicked:", hotel.name);
//     const handleSearch = () => console.log("Searching on map for:", searchQuery);
//     const handleBackPress = () => {
//         console.log("Back button pressed"); 
//         router.back();
//     };

//     return (
//         // 2. Applied style={styles.container} to SafeAreaView for flex: 1
//         <SafeAreaView style={styles.container} edges={['top']}> 
//             <MapView
//                 style={StyleSheet.absoluteFillObject}
//                 initialRegion={initialMapRegion}
//                 // Ensure map interaction is enabled (these are defaults but good to be explicit)
//                 scrollEnabled={true}
//                 zoomEnabled={true}
//                 pitchEnabled={false} // Optional: disable tilting
//                 rotateEnabled={true} // Optional: allow rotation
//             >
//                 {/* Render Markers for attractions */}
//                 {attractions.map((place: any, index: number) => (
//                     // Add safety check for coordinates
//                     place.coordinates && (
//                         <Marker
//                             key={`attraction-${index}`} // More specific key
//                             coordinate={{
//                                 latitude: place.coordinates.latitude,
//                                 longitude: place.coordinates.longitude,
//                             }}
//                             title={place.name}
//                             description={place.description} // Add description
//                         />
//                     )
//                 ))}
//                 {/* Render Polyline if coordinates exist */}
//                 {routeCoordinates.length > 0 && (
//                      <Polyline coordinates={routeCoordinates} strokeColor="#007AFF" strokeWidth={4} />
//                 )}
//             </MapView>

//             {/* Top Header */}
//             <View style={styles.header}>
//                 <TouchableOpacity style={styles.iconButton} onPress={handleBackPress}> 
//                     <Ionicons name="arrow-back" size={22} color="black" />
//                 </TouchableOpacity>

//                 <View style={styles.searchBar}>
//                      <Ionicons name="search" size={18} color="gray" />
//                     <TextInput
//                         placeholder="Search Attractions" 
//                         placeholderTextColor="gray"
//                         style={styles.searchInput}
//                         value={searchQuery}
//                         onChangeText={setSearchQuery}
//                         onSubmitEditing={handleSearch} // Trigger search on submit
//                         returnKeyType="search" // Show 'Search' on keyboard
//                     />
//                 </View>
//                  <View style={{ width: 40 }} /> {/* Spacer */}
//             </View>

//             {/* Scrollable Content */}
//             <ScrollView 
//                 style={styles.contentScroll} 
//                 showsVerticalScrollIndicator={false}
//                 // Optional: Try these if map interaction is still tricky
//                 // scrollEventThrottle={16} // More frequent scroll events
//                 // stickyHeaderIndices={[1]} // Make DayNav stick (needs adjustment)
//             >
//                 {/* --- FIX 2: Reduced Spacer Height --- */}
//                 <View style={{ height: 80 }} /> 
//                 {/* Significantly reduced from 150 to show more map */}

//                 {/* --- The White Sheet --- */}
//                 <View style={styles.sheet}>
//                     {/* Day Navigation Buttons */}
//                     <View style={styles.dayNavContainer}>
//                         {/* Previous Day Button */}
//                         <View style={styles.dayNavButtonPlaceholder}> 
//                             {hasPrevDay && (
//                                 <TouchableOpacity 
//                                     style={styles.dayNavButton} 
//                                     onPress={() => goToDay(prevDayIndex)}
//                                 >
//                                     <Ionicons name="chevron-back" size={18} color="#007AFF" />
//                                     <Text style={styles.dayNavText}>Day {dayNumber - 1}</Text>
//                                 </TouchableOpacity>
//                             )}
//                         </View>

//                         {/* Current Day Text */}
//                         <Text style={styles.currentDayText}>Day {dayNumber}</Text> 

//                         {/* Next Day Button */}
//                         <View style={styles.dayNavButtonPlaceholder}>
//                              {hasNextDay && (
//                                 <TouchableOpacity 
//                                     style={[styles.dayNavButton, styles.dayNavButtonRight]} 
//                                     onPress={() => goToDay(nextDayIndex)}
//                                 >
//                                     <Text style={styles.dayNavText}>Day {dayNumber + 1}</Text>
//                                     <Ionicons name="chevron-forward" size={18} color="#007AFF" />
//                                 </TouchableOpacity>
//                             )}
//                         </View>
//                     </View>
                
//                     {/* Categories */}
//                     <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
//                         {["Attractions", "Food", "Views"].map((item) => ( 
//                             <TouchableOpacity
//                                 key={item}
//                                 onPress={() => setSelectedCategory(item)}
//                                 style={[
//                                     styles.categoryButton,
//                                     { backgroundColor: item === selectedCategory ? "#E3F2FD" : "#F1F1F1" }, // Example blue selection
//                                     { borderColor: item === selectedCategory ? "#90CAF9" : "#eee" }, // Border changes on selection
//                                 ]}
//                             >
//                                 <Text style={[
//                                     styles.categoryTextMain,
//                                     { color: item === selectedCategory ? "#1976D2" : "#555" } // Text color changes
//                                 ]}> {item} </Text>
//                             </TouchableOpacity>
//                         ))}
//                     </ScrollView>

//                     {/* Nearby Attractions */}
//                     <Text style={styles.subTitle}>Places to Visit</Text> 
//                      {/* Added a subtitle */}
//                     <ScrollView
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         contentContainerStyle={styles.horizontalScrollContent} // Use style for padding
//                     >
//                         {attractions.length > 0 ? (
//                              attractions.map((item: any, index: number) => (
//                                 <AttractionCard key={`attraction-card-${index}`} item={item} onPress={handleAttractionPress} />
//                             ))
//                         ) : (
//                              <Text style={styles.noDataText}>No attractions listed for this day.</Text> // Fallback text
//                         )}
//                     </ScrollView>

//                     {/* Recommended Hotels */}
//                     <Text style={styles.sectionTitle}>Recommended Places to Stay</Text>
//                     <Text style={styles.subTitle}>Nearby Options</Text>

//                     <ScrollView 
//                         horizontal 
//                         showsHorizontalScrollIndicator={false} 
//                         contentContainerStyle={styles.horizontalScrollContent} // Use style for padding
//                     >
//                         {hotels.map((hotel, index) => (
//                             <HotelCard key={`hotel-${index}`} hotel={hotel} onPress={handleHotelPress} />
//                         ))}
//                     </ScrollView>
//                 </View>
//             </ScrollView>

//             {/* Custom Bottom Navigation Removed */}
            
//         </SafeAreaView>
//     );
// }

// // --- Styles Update ---
// const styles = StyleSheet.create({
//     // Make container flex: 1
//     container: { 
//         flex: 1, 
//         backgroundColor: "transparent" // Make SafeAreaView transparent to see map behind
//     },
//     header: {
//         position: "absolute",
//         top: 10, 
//         left: 0, right: 0, zIndex: 10, 
//         flexDirection: "row", alignItems: "center", justifyContent: "space-between",
//         paddingHorizontal: 16, height: 50, 
//     },
//     iconButton: {
//         backgroundColor: "rgba(255, 255, 255, 0.9)", 
//         padding: 8, borderRadius: 20, 
//         elevation: 3, shadowColor: "#000",
//         shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41,
//     },
//     searchBar: {
//         flex: 1, flexDirection: "row", backgroundColor: "rgba(255, 255, 255, 0.9)",
//         marginHorizontal: 8, borderRadius: 20, alignItems: "center",
//         paddingHorizontal: 12, paddingVertical: 8, elevation: 2,
//         shadowColor: "#000", shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.1, shadowRadius: 1.00,
//     },
//     searchInput: { flex: 1, marginLeft: 8, fontSize: 14, color: "#333" },
//     // Make contentScroll transparent too, but pointerEvents control interaction
//     contentScroll: { 
//         flex: 1, 
//         backgroundColor: 'transparent',
//         // pointerEvents: 'box-none' // Allows touches to pass through ScrollView to MapView below
//     }, 
//     sheet: {
//         backgroundColor: "white", borderTopLeftRadius: 30, borderTopRightRadius: 30,
//         paddingBottom: 20, paddingTop: 5, 
//         minHeight: '70%', // Adjust minimum height if needed
//         marginTop: 0, // Remove margin if spacer controls position
//         // pointerEvents: 'auto' // Re-enable touch events for the sheet content
//     },
//     dayNavContainer: {
//         flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
//         paddingHorizontal: 15, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee',
//     },
//      dayNavButtonPlaceholder: { flex: 1, minWidth: 80 },
//     dayNavButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 5 },
//     dayNavButtonRight: { justifyContent: 'flex-end' },
//     dayNavText: { fontSize: 15, fontWeight: '600', color: '#007AFF', marginHorizontal: 3 },
//      currentDayText: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
//     categoryScroll: { paddingHorizontal: 16, marginTop: 12, marginBottom: 5 }, // Added margin bottom
//     categoryButton: {
//         paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, 
//         marginRight: 8, borderWidth: 1, 
//     },
//     categoryTextMain: { fontSize: 13, fontWeight: '500' }, // Adjusted weight
//      horizontalScrollContent: { // Added style for horizontal padding
//         paddingLeft: 16,
//         paddingRight: 16, // Ensure last item has padding
//     },
//     cardContainer: {
//         width: 200, marginRight: 12, borderRadius: 15, backgroundColor: "white",
//         elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.15, shadowRadius: 2.0, overflow: "hidden", marginBottom: 5,
//     },
//     cardImage: { width: "100%", height: 110, backgroundColor: '#eee' }, // Added bg color
//     cardContent: { padding: 12 },
//     categoryText: { fontSize: 11, color: "#777", marginBottom: 3 }, 
//     titleText: { fontSize: 13, fontWeight: "600", color: "#333"}, 
//     cardFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: 'center', marginTop: 8 }, 
//     distanceText: { fontSize: 11, color: "#666" },
//     ratingBadge: { backgroundColor: "#E8F5E9", borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2 },
//     ratingText: { fontSize: 11, color: "green", fontWeight: '600' },
//      noDataText: { // Style for fallback text
//         paddingHorizontal: 16,
//         paddingVertical: 20,
//         color: '#888',
//         fontStyle: 'italic',
//     },
//     sectionTitle: {
//         fontSize: 20, fontWeight: "700", textAlign: "center",
//         marginTop: 30, color: "#333", marginBottom: 5,
//     },
//     subTitle: { 
//         fontSize: 15, fontWeight: "600", paddingHorizontal: 16, 
//         marginTop: 10, // Added back margin top for separation
//         marginBottom: 10, color: '#555' 
//     },
//     hotelCard: {
//         width: 230, marginRight: 12, borderRadius: 15, backgroundColor: "white",
//         elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.15, shadowRadius: 2.0, overflow: "hidden", marginBottom: 5,
//     },
//     hotelImage: { width: "100%", height: 130, backgroundColor: '#eee' }, // Added bg color
//     hotelInfo: { padding: 12 },
//     hotelName: { fontSize: 15, fontWeight: "600", color: "#333" },
//     hotelLocation: { fontSize: 13, color: "#666", marginTop: 2 },
//     hotelFooter: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
//     hotelPrice: { fontSize: 13, fontWeight: '600', color: "#333" },
//     hotelRating: { fontSize: 13, color: "#E67E22", fontWeight: '600' }, 
// });


// // TravelUIScreen.tsx
// import { Ionicons } from "@expo/vector-icons";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import React, { useMemo, useRef, useState } from "react";
// import {
//   Dimensions,
//   Image,
//   SafeAreaView as RN_SAFE_AREA_VIEW,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import MapView, { Marker, Polyline } from "react-native-maps";

// // IMPORTANT: GestureHandlerRootView must wrap the app/screen
// import { GestureHandlerRootView } from "react-native-gesture-handler";

// import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

// const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// const AttractionCard = ({ item, onPress }: any) => (
//   <TouchableOpacity onPress={() => onPress(item)} style={styles.cardContainer}>
//     <Image source={{ uri: item.image_url }} style={styles.cardImage} />
//     <View style={styles.cardContent}>
//       <Text style={styles.categoryText}>{item.description}</Text>
//       <Text style={styles.titleText} numberOfLines={2}>
//         {item.name}
//       </Text>
//       <View style={styles.cardFooter}>
//         <Text style={styles.distanceText}>2.5km</Text>
//         <View style={styles.ratingBadge}>
//           <Text style={styles.ratingText}>⭐ 4.5</Text>
//         </View>
//       </View>
//     </View>
//   </TouchableOpacity>
// );

// const HotelCard = ({ hotel, onPress }: any) => (
//   <TouchableOpacity onPress={() => onPress(hotel)} style={styles.hotelCard}>
//     <Image source={hotel.image} style={styles.hotelImage} />
//     <View style={styles.hotelInfo}>
//       <Text style={styles.hotelName}>{hotel.name}</Text>
//       <Text style={styles.hotelLocation}>{hotel.location}</Text>
//       <View style={styles.hotelFooter}>
//         <Text style={styles.hotelPrice}>{hotel.price}</Text>
//         <Text style={styles.hotelRating}>⭐ {hotel.rating}</Text>
//       </View>
//     </View>
//   </TouchableOpacity>
// );

// export default function TravelUIScreen() {
//   const params = useLocalSearchParams();
//   const router = useRouter();

//   // parse itinerary safely
//   let itinerary = [];
//   try {
//     itinerary = JSON.parse((params.itineraryData as string) || "[]");
//   } catch (e) {
//     console.warn("Failed to parse itineraryData", e);
//     itinerary = [];
//   }

//   const currentDayIndex = Number(params.currentDayIndex || 0);
//   const dayData = itinerary[currentDayIndex] || { locations: [], route_geometries: [] };

//   const prevDayIndex = currentDayIndex - 1;
//   const nextDayIndex = currentDayIndex + 1;
//   const hasPrevDay = prevDayIndex >= 0;
//   const hasNextDay = nextDayIndex < itinerary.length;

//   const goToDay = (index: number) => {
//     router.replace({
//       pathname: "/details",
//       params: { itineraryData: params.itineraryData, currentDayIndex: index },
//     });
//   };

//   const attractions = dayData.locations || [];
//   const dayNumber = dayData.day_number || 1;

//   const routeCoordinates: { latitude: number; longitude: number }[] = [];
//   if (dayData.route_geometries && Array.isArray(dayData.route_geometries)) {
//     dayData.route_geometries.forEach((route: any) => {
//       route.coordinates.forEach((coord: [number, number]) =>
//         routeCoordinates.push({ latitude: coord[1], longitude: coord[0] })
//       );
//     });
//   }

//   const initialMapRegion = attractions.length
//     ? {
//         latitude: attractions[0].coordinates.latitude,
//         longitude: attractions[0].coordinates.longitude,
//         latitudeDelta: 0.09,
//         longitudeDelta: 0.09,
//       }
//     : {
//         latitude: 7.275,
//         longitude: 80.62,
//         latitudeDelta: 0.09,
//         longitudeDelta: 0.09,
//       };

//   const hotels = [
//     {
//       name: "SKYLOFT KANDY",
//       location: "Kandy",
//       price: "8,000 LKR",
//       rating: 4.5,
//       image: require("../assets/images/skyloft.jpg"),
//     },
//     {
//       name: "Mountain Villa",
//       location: "Hanthana",
//       price: "7,500 LKR",
//       rating: 4.4,
//       image: require("../assets/images/Mount_Lavinia_Hotel_in_Sri_Lanka.jpg"),
//     },
//   ];

//   const [selectedCategory, setSelectedCategory] = useState("Coffee");
//   const [searchQuery, setSearchQuery] = useState("");
//   const handleAttractionPress = (p: any) => console.log("Go to map location:", p.name);
//   const handleHotelPress = (h: any) => console.log("Hotel clicked:", h.name);
//   const handleSearch = () => console.log("Searching on map for:", searchQuery);

//   // Bottom sheet config
//   const bottomSheetRef = useRef<BottomSheet>(null);
//   const snapPoints = useMemo(() => [SCREEN_HEIGHT * 0.15, SCREEN_HEIGHT * 0.5, SCREEN_HEIGHT * 0.95], []);

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <RN_SAFE_AREA_VIEW style={styles.container}>
//         {/* Map background */}
//         <MapView style={StyleSheet.absoluteFillObject} initialRegion={initialMapRegion}>
//           {attractions.map((place: any, index: number) => (
//             <Marker
//               key={index}
//               coordinate={{
//                 latitude: place.coordinates.latitude,
//                 longitude: place.coordinates.longitude,
//               }}
//               title={place.name}
//             />
//           ))}
//           <Polyline coordinates={routeCoordinates} strokeColor="#007AFF" strokeWidth={4} />
//         </MapView>

//         {/* Top Header (fixed) */}
//         <View style={styles.header}>
//           <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
//             <Ionicons name="arrow-back" size={22} color="black" />
//           </TouchableOpacity>
//           <View style={styles.searchBar}>
//             <Ionicons name="search" size={18} color="gray" />
//             <TextInput
//               placeholder="Search"
//               placeholderTextColor="gray"
//               style={styles.searchInput}
//               value={searchQuery}
//               onChangeText={setSearchQuery}
//               onSubmitEditing={handleSearch}
//             />
//           </View>
//           <TouchableOpacity style={styles.iconButton}>
//             <Ionicons name="filter" size={22} color="black" />
//           </TouchableOpacity>
//         </View>

//         {/* Bottom Sheet */}
//         <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints} enablePanDownToClose={false}>
//           {/* Use BottomSheetScrollView so sheet + inner scrolling play nicely */}
//           <BottomSheetScrollView contentContainerStyle={{ paddingBottom: 40 }}>
//             {/* Back inside sheet (icon + text) */}
//             <TouchableOpacity style={styles.sheetBackButton} onPress={() => router.back()}>
//               <Ionicons name="arrow-back" size={20} color="#007AFF" />
//               <Text style={styles.sheetBackText}>Back</Text>
//             </TouchableOpacity>

//             {/* Day navigation */}
//             <View style={styles.dayNavContainer}>
//               {hasPrevDay ? (
//                 <TouchableOpacity style={styles.dayNavButton} onPress={() => goToDay(prevDayIndex)}>
//                   <Ionicons name="chevron-back" size={18} color="#007AFF" />
//                   <Text style={styles.dayNavText}>Day {dayNumber - 1}</Text>
//                 </TouchableOpacity>
//               ) : (
//                 <View style={{ flex: 1 }} />
//               )}
//               {hasNextDay && (
//                 <TouchableOpacity style={styles.dayNavButton} onPress={() => goToDay(nextDayIndex)}>
//                   <Text style={styles.dayNavText}>Day {dayNumber + 1}</Text>
//                   <Ionicons name="chevron-forward" size={18} color="#007AFF" />
//                 </TouchableOpacity>
//               )}
//             </View>

//             {/* Categories - vertical list (but still compact) */}
//             <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
//               <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 8 }}>Categories</Text>
//               <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
//                 {["Coffee", "Breakfast", "Museum", "Sound"].map((item) => (
//                   <TouchableOpacity
//                     key={item}
//                     onPress={() => setSelectedCategory(item)}
//                     style={[
//                       styles.categoryButton,
//                       { backgroundColor: item === selectedCategory ? "#FFD54F" : "#F1F1F1", marginBottom: 8 },
//                     ]}
//                   >
//                     <Text style={[styles.categoryTextMain, { fontWeight: item === selectedCategory ? "600" : "400" }]}>
//                       {item}
//                     </Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             </View>

//             {/* Attractions - HORIZONTAL carousel */}
//             <View style={{ marginTop: 16 }}>
//               <Text style={[styles.sectionTitle, { marginTop: 0, fontSize: 20, textAlign: "left", paddingLeft: 16 }]}>
//                 Nearby Attractions
//               </Text>
//               <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 16, marginTop: 12 }}>
//                 {attractions.map((item: any, index: number) => (
//                   <AttractionCard key={index} item={item} onPress={handleAttractionPress} />
//                 ))}
//               </ScrollView>
//             </View>

//             {/* Hotels - HORIZONTAL carousel */}
//             <View style={{ marginTop: 20 }}>
//               <Text style={[styles.sectionTitle, { marginTop: 0, fontSize: 20, textAlign: "left", paddingLeft: 16 }]}>
//                 Recommended Places to stay
//               </Text>
//               <Text style={styles.subTitle}>Recommended</Text>
//               <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 16, marginTop: 8 }}>
//                 {hotels.map((hotel, index) => (
//                   <HotelCard key={index} hotel={hotel} onPress={handleHotelPress} />
//                 ))}
//               </ScrollView>
//             </View>
//           </BottomSheetScrollView>
//         </BottomSheet>
//       </RN_SAFE_AREA_VIEW>
//     </GestureHandlerRootView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "white" },
//   header: {
//     position: "absolute",
//     top: 20,
//     left: 0,
//     right: 0,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     zIndex: 10,
//   },
//   iconButton: { backgroundColor: "white", padding: 8, borderRadius: 100, elevation: 3 },
//   searchBar: {
//     flex: 1,
//     flexDirection: "row",
//     backgroundColor: "white",
//     marginHorizontal: 8,
//     borderRadius: 50,
//     alignItems: "center",
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     elevation: 2,
//   },
//   searchInput: { flex: 1, marginLeft: 6, color: "#333" },
//   sheetBackButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 12,
//     borderBottomWidth: 1,
//     borderColor: "#eee",
//   },
//   sheetBackText: { color: "#007AFF", fontSize: 16, marginLeft: 8, fontWeight: "600" },
//   dayNavContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   dayNavButton: { flexDirection: "row", alignItems: "center", padding: 8 },
//   dayNavText: { fontSize: 16, fontWeight: "600", color: "#007AFF", marginHorizontal: 5 },
//   categoryButton: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 25, marginRight: 10 },
//   categoryTextMain: { fontSize: 14, color: "#333" },
//   cardContainer: {
//     width: 220,
//     marginRight: 14,
//     borderRadius: 20,
//     backgroundColor: "white",
//     elevation: 3,
//     overflow: "hidden",
//   },
//   cardImage: { width: "100%", height: 120 },
//   cardContent: { padding: 10 },
//   categoryText: { fontSize: 12, color: "#777" },
//   titleText: { fontSize: 14, fontWeight: "600", marginTop: 4 },
//   cardFooter: { flexDirection: "row", justifyContent: "space-between", marginTop: 6 },
//   distanceText: { fontSize: 12, color: "#666" },
//   ratingBadge: {
//     backgroundColor: "#E8F5E9",
//     borderRadius: 12,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//   },
//   ratingText: { fontSize: 12, color: "green" },
//   sectionTitle: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: "#333",
//     marginBottom: 6,
//   },
//   subTitle: { fontSize: 16, fontWeight: "600", paddingHorizontal: 16, marginTop: 2 },
//   hotelCard: {
//     width: 250,
//     marginRight: 14,
//     borderRadius: 20,
//     backgroundColor: "white",
//     elevation: 3,
//     overflow: "hidden",
//   },
//   hotelImage: { width: "100%", height: 150 },
//   hotelInfo: { padding: 10 },
//   hotelName: { fontSize: 16, fontWeight: "600" },
//   hotelLocation: { fontSize: 14, color: "#666" },
//   hotelFooter: { flexDirection: "row", justifyContent: "space-between", marginTop: 4 },
//   hotelPrice: { fontSize: 14, color: "#333" },
//   hotelRating: { fontSize: 14, color: "#FFB300" },
// });


import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  // ScrollView removed (using BottomSheetScrollView)
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { Marker, Polyline } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// --- Reusable Card Components (Unchanged) ---
const AttractionCard = ({ item, onPress }: any) => (
    // Added margin bottom directly to the card container for vertical spacing
    <TouchableOpacity onPress={() => onPress(item)} style={[styles.cardContainer, styles.verticalCardMargin]}>
        <Image source={{ uri: item.image_url }} style={styles.cardImage} />
        <View style={styles.cardContent}>
            <Text style={styles.categoryText} numberOfLines={1}>{item.description}</Text>
            <Text style={styles.titleText} numberOfLines={2}>{item.name}</Text>
            <View style={styles.cardFooter}>
                <Text style={styles.distanceText}>Details</Text>
                <View style={styles.ratingBadge}><Text style={styles.ratingText}>⭐ 4.5</Text></View>
            </View>
        </View>
    </TouchableOpacity>
);

const HotelCard = ({ hotel, onPress }: any) => (
     // Added margin bottom directly to the card container
    <TouchableOpacity onPress={() => onPress(hotel)} style={[styles.hotelCard, styles.verticalCardMargin]}>
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
// --- End Card Components ---

export default function TravelUIScreen() {
    const params = useLocalSearchParams();
    const router = useRouter();

    // Safely parse itinerary data
    let itinerary = [];
    try {
        itinerary = JSON.parse((params.itineraryData as string) || "[]");
    } catch (e) { console.warn("Failed to parse itineraryData", e); itinerary = []; }

    const currentDayIndex = Number(params.currentDayIndex || 0);
    const dayData = itinerary[currentDayIndex] || { day_number: 1, locations: [], route_geometries: [] };

    // Day navigation logic
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

    // Process data for the current day
    const attractions = dayData.locations || [];
    const dayNumber = dayData.day_number || (currentDayIndex + 1);

    const routeCoordinates: { latitude: number; longitude: number }[] = [];
    if (dayData.route_geometries && Array.isArray(dayData.route_geometries)) {
        dayData.route_geometries.forEach((route: any) => {
            if (route.coordinates && Array.isArray(route.coordinates)) {
                route.coordinates.forEach((coord: [number, number]) => {
                    if (Array.isArray(coord) && coord.length === 2) {
                        routeCoordinates.push({ latitude: coord[1], longitude: coord[0] });
                    }
                });
            }
        });
    }

    // Determine initial map region
    const initialMapRegion = attractions.length && attractions[0].coordinates
        ? { latitude: attractions[0].coordinates.latitude, longitude: attractions[0].coordinates.longitude, latitudeDelta: 0.09, longitudeDelta: 0.09 }
        : routeCoordinates.length ? { latitude: routeCoordinates[0].latitude, longitude: routeCoordinates[0].longitude, latitudeDelta: 0.09, longitudeDelta: 0.09 }
        : { latitude: 7.275, longitude: 80.62, latitudeDelta: 0.09, longitudeDelta: 0.09 };

    // Dummy hotel data
    const hotels = [
        { name: "SKYLOFT KANDY", location: "Kandy", price: "8,000 LKR", rating: 4.5, image: require("../assets/images/skyloft.jpg") },
        { name: "Mountain Villa", location: "Hanthana", price: "7,500 LKR", rating: 4.4, image: require("../assets/images/Mount_Lavinia_Hotel_in_Sri_Lanka.jpg") },
    ];

    // State and Handlers
    const [selectedCategory, setSelectedCategory] = useState("Attractions");
    const handleAttractionPress = (p: any) => console.log("Go to map location:", p.name);
    const handleHotelPress = (h: any) => console.log("Hotel clicked:", h.name);

    // Bottom sheet config
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["25%", "50%", "85%"], []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            {/* SafeAreaView wraps everything */}
            <SafeAreaView style={styles.container} edges={['top']}>
                {/* Map background */}
                <MapView style={StyleSheet.absoluteFillObject} initialRegion={initialMapRegion}>
                    {attractions.map((place: any, index: number) => (
                        place.coordinates && (
                            <Marker
                                key={`attraction-${index}`}
                                coordinate={{ latitude: place.coordinates.latitude, longitude: place.coordinates.longitude }}
                                title={place.name}
                                description={place.description}
                            />
                        )
                    ))}
                    {routeCoordinates.length > 0 && (
                        <Polyline coordinates={routeCoordinates} strokeColor="#007AFF" strokeWidth={4} />
                    )}
                </MapView>

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={22} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.purchaseHeaderButton} onPress={() => router.push('/payment1')}>
                        <Text style={styles.purchaseHeaderText}>Make Purchase</Text>
                    </TouchableOpacity>
                     <View style={{ width: 40 }}/>
                </View>

                {/* Bottom Sheet */}
                <BottomSheet
                    ref={bottomSheetRef}
                    index={1} // Start snapped to 50%
                    snapPoints={snapPoints}
                    enablePanDownToClose={false}
                    handleIndicatorStyle={{ backgroundColor: '#ccc' }}
                >
                    {/* Use BottomSheetScrollView for vertical scrolling inside sheet */}
                    <BottomSheetScrollView contentContainerStyle={styles.sheetContentContainer}>

                        {/* Day navigation */}
                        <View style={styles.dayNavContainer}>
                             <View style={styles.dayNavButtonPlaceholder}>
                                {hasPrevDay && (
                                    <TouchableOpacity style={styles.dayNavButton} onPress={() => goToDay(prevDayIndex)}>
                                        <Ionicons name="chevron-back" size={18} color="#007AFF" />
                                        <Text style={styles.dayNavText}>Day {dayNumber - 1}</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                             <Text style={styles.currentDayText}>Day {dayNumber}</Text>
                            <View style={styles.dayNavButtonPlaceholder}>
                                {hasNextDay && (
                                    <TouchableOpacity style={[styles.dayNavButton, styles.dayNavButtonRight]} onPress={() => goToDay(nextDayIndex)}>
                                        <Text style={styles.dayNavText}>Day {dayNumber + 1}</Text>
                                        <Ionicons name="chevron-forward" size={18} color="#007AFF" />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>

                        {/* Categories - Simplified or removed if not needed */}
                         {/* <Text style={styles.subTitle}>Categories</Text> */}
                         {/* Optional: Add categories back if desired */}

                        {/* --- ATTRACTIONS: VERTICAL LIST --- */}
                        <Text style={styles.subTitle}>Places to Visit</Text>
                        <View style={styles.verticalListContainer}>
                            {attractions.length > 0 ? (
                                attractions.map((item: any, index: number) => (
                                    // Render card directly
                                    <AttractionCard key={`attraction-card-${index}`} item={item} onPress={handleAttractionPress} />
                                ))
                            ) : (
                                <Text style={styles.noDataText}>No attractions listed for this day.</Text>
                            )}
                        </View>
                        {/* --- END ATTRACTIONS LIST --- */}


                        {/* --- HOTELS: VERTICAL LIST --- */}
                        <Text style={styles.sectionTitle}>Recommended Places to Stay</Text>
                        <Text style={styles.subTitle}>Nearby Options</Text>
                         <View style={styles.verticalListContainer}>
                            {hotels.map((hotel, index) => (
                                // Render card directly
                                <HotelCard key={`hotel-${index}`} hotel={hotel} onPress={handleHotelPress} />
                            ))}
                        </View>
                        {/* --- END HOTELS LIST --- */}

                    </BottomSheetScrollView>
                </BottomSheet>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}


// --- Styles Update ---
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "transparent" },
    header: {
        position: "absolute", top: Platform.OS === 'ios' ? 50 : 20,
        left: 0, right: 0, zIndex: 10, flexDirection: "row",
        alignItems: "center", justifyContent: "space-between",
        paddingHorizontal: 16, height: 50,
    },
    iconButton: {
        backgroundColor: "rgba(255, 255, 255, 0.95)", padding: 10,
        borderRadius: 20, elevation: 4, shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2,
    },
    purchaseHeaderButton: {
        flexGrow: 1, // Allow button to grow slightly
        maxWidth: '60%', // Prevent it from getting too wide
        backgroundColor: '#4CAF50', paddingVertical: 10, paddingHorizontal: 15,
        borderRadius: 20, marginHorizontal: 10, alignItems: 'center',
        elevation: 3, shadowColor: "#000", shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2, shadowRadius: 1.41,
    },
    purchaseHeaderText: { color: 'white', fontSize: 14, fontWeight: '600' },

    sheetContentContainer: { paddingBottom: 40, paddingHorizontal: 0 }, // Removed horizontal padding here

    dayNavContainer: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingHorizontal: 15, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee',
    },
    dayNavButtonPlaceholder: { flex: 1, minWidth: 80, alignItems: 'center' },
    dayNavButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 5 },
    dayNavButtonRight: { justifyContent: 'flex-end', alignSelf: 'flex-end' },
    dayNavText: { fontSize: 15, fontWeight: '600', color: '#007AFF', marginHorizontal: 3 },
    currentDayText: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },

    // --- Vertical List Container Style ---
    verticalListContainer: {
         paddingHorizontal: 16, // Add padding for items inside the vertical list
    },
     verticalCardMargin: {
        marginBottom: 15, // Add space between vertical cards
    },
    // --- End Vertical List Styles ---

    cardContainer: { // Attractions Card - Adjusted width for vertical
        width: '100%', // Take full width
        marginRight: 0, // No right margin needed
        borderRadius: 15, backgroundColor: "white", elevation: 3,
        shadowColor: "#000", shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.18, shadowRadius: 2.22, overflow: "hidden",
        // marginBottom removed, handled by verticalCardMargin
    },
    cardImage: { width: "100%", height: 120, backgroundColor: '#eee' }, // Increased height slightly
    cardContent: { padding: 12 },
    categoryText: { fontSize: 11, color: "#777", marginBottom: 3 },
    titleText: { fontSize: 14, fontWeight: "600", color: "#333"}, // Increased size slightly
    cardFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: 'center', marginTop: 8 },
    distanceText: { fontSize: 11, color: "#666" },
    ratingBadge: { backgroundColor: "#E8F5E9", borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2 },
    ratingText: { fontSize: 11, color: "green", fontWeight: '600' },
    noDataText: { paddingHorizontal: 16, paddingVertical: 20, color: '#888', fontStyle: 'italic', textAlign: 'center' }, // Centered text

    sectionTitle: { // Hotels section title
        fontSize: 18, fontWeight: "700", paddingHorizontal: 16,
        marginTop: 25, color: "#333", marginBottom: 5, // Reduced bottom margin
    },
    subTitle: { // Subtitles like "Places to Visit", "Nearby Options"
        fontSize: 15, fontWeight: "600", paddingHorizontal: 16,
        marginTop: 20, // Increased top margin
        marginBottom: 12, color: '#555' // Increased bottom margin
    },
    hotelCard: { // Hotels Card - Adjusted width for vertical
        width: '100%', // Take full width
        marginRight: 0, // No right margin needed
        borderRadius: 15, backgroundColor: "white", elevation: 3,
        shadowColor: "#000", shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.18, shadowRadius: 2.22, overflow: "hidden",
        // marginBottom removed, handled by verticalCardMargin
    },
    hotelImage: { width: "100%", height: 140, backgroundColor: '#eee' }, // Increased height slightly
    hotelInfo: { padding: 12 },
    hotelName: { fontSize: 16, fontWeight: "600", color: "#333" }, // Increased size slightly
    hotelLocation: { fontSize: 13, color: "#666", marginTop: 2 },
    hotelFooter: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
    hotelPrice: { fontSize: 14, fontWeight: '600', color: "#333" }, // Increased size slightly
    hotelRating: { fontSize: 14, color: "#E67E22", fontWeight: '600' }, // Increased size slightly
});