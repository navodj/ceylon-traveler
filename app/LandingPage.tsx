import { useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

// Sample data
const favoritesData = [
    { id: 1, type: 'History', name: 'Sigiriya', price: '$10.99', image: '🏰' },
    { id: 2, type: 'BeachSide', name: 'Mirissa', price: '$10.99', image: '🏖' },
    { id: 3, type: 'Brand', name: 'Sripad', price: '$10.9', image: '🏛' },
];

const sriLankanFoods = [
    { id: 1, name: 'Rice and Curry', image: '🍛' },
    { id: 2, name: 'Hoppers', image: '🥞' },
    { id: 3, name: 'Kottu', image: '🥘' },
    { id: 4, name: 'Halape', image: '🎋' },
    { id: 5, name: 'String Hoppers', image: '🍝' },
    { id: 6, name: 'Lamprais', image: '🎯' },
];

const destinationsData = [
    { id: 1, name: 'Sigiriya', type: 'History', image: '🏰' },
    { id: 2, name: 'Galle Fort', type: 'History', image: '🏯' },
    { id: 3, name: 'Ella', type: 'Mountain', image: '⛰' },
    { id: 4, name: 'Mirissa', type: 'BeachSide', image: '🏖' },
    { id: 5, name: 'Kandy', type: 'Cultural', image: '🙏' },
];

const LandingPage = () => {
    const router = useRouter();

    const handleSignUp = () => {
        router.push('/signUp');
    };

    const handleSearch = () => {
        router.push('/userInputs');
    };

    const handleNotification = () => {
        router.push('/locationList');
    };

    const handleProfile = () => {
        router.push('/profilePage');
    };

    const renderFavoriteCard = (item: any) => (
        <View key={item.id} style={styles.favoriteCard}>
            <View style={styles.favoriteHeader}>
                <Text style={styles.favoriteType}>{item.type}</Text>
                <Text style={styles.favoritePrice}>{item.price}</Text>
            </View>
            <Text style={styles.favoriteIcon}>{item.image}</Text>
            <Text style={styles.favoriteName}>{item.name}</Text>
        </View>
    );

    const renderFoodCard = (item: any) => (
        <View key={item.id} style={styles.foodCard}>
            <Text style={styles.foodIcon}>{item.image}</Text>
            <Text style={styles.foodName}>{item.name}</Text>
        </View>
    );

    const renderDestinationCard = (item: any) => (
        <View key={item.id} style={styles.destinationCard}>
            <Text style={styles.destinationIcon}>{item.image}</Text>
            <Text style={styles.destinationName}>{item.name}</Text>
            <Text style={styles.destinationType}>{item.type}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.headerTitle}>Explore Sri Lanka</Text>
                </View>
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.iconButton} onPress={handleNotification}>
                        <Text style={styles.icon}>🔔</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={handleProfile}>
                        <Text style={styles.icon}>👤</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Main Content */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Hero Section */}
                <View style={styles.heroSection}>
                    <Text style={styles.heroTitle}>
                        Plan your journey and experience{'\n'}Sri Lanka.
                    </Text>
                    <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                        <Text style={styles.signUpText}>Click Here</Text>
                    </TouchableOpacity>
                </View>

                {/* Favorites Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Favorites</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.horizontalScroll}
                        contentContainerStyle={styles.horizontalScrollContent}
                    >
                        {favoritesData.map(renderFavoriteCard)}
                    </ScrollView>
                </View>

                {/* Categories Section */}
                <View style={styles.categoriesSection}>
                    <View style={styles.categoryRow}>
                        <View style={styles.categoryItem}>
                            <Text style={styles.categoryIcon}>🏖</Text>
                            <Text style={styles.categoryText}>Beach side</Text>
                        </View>
                        <View style={styles.categoryItem}>
                            <Text style={styles.categoryIcon}>🍛</Text>
                            <Text style={styles.categoryText}>Srilankan Foods</Text>
                        </View>
                    </View>
                </View>

                {/* Sri Lankan Foods Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Sri Lankan Foods</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.horizontalScroll}
                        contentContainerStyle={styles.horizontalScrollContent}
                    >
                        {sriLankanFoods.map(renderFoodCard)}
                    </ScrollView>
                </View>

                {/* Destinations Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Rice and Destinations</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.horizontalScroll}
                        contentContainerStyle={styles.horizontalScrollContent}
                    >
                        {destinationsData.map(renderDestinationCard)}
                    </ScrollView>
                </View>
            </ScrollView>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navButton} onPress={handleSearch}>
                    <Text style={styles.navIcon}>🔍</Text>
                    <Text style={styles.navText}>Search</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    headerLeft: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    headerIcons: {
        flexDirection: 'row',
    },
    iconButton: {
        marginLeft: 15,
        padding: 5,
    },
    icon: {
        fontSize: 22,
    },
    content: {
        flex: 1,
    },
    heroSection: {
        padding: 25,
        backgroundColor: '#f8f9fa',
        margin: 15,
        borderRadius: 16,
        alignItems: 'center',
    },
    heroTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
        textAlign: 'center',
        lineHeight: 32,
        marginBottom: 20,
    },
    signUpButton: {
        backgroundColor: '#3498db',
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 25,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    signUpText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    section: {
        marginVertical: 15,
        paddingHorizontal: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 15,
        marginLeft: 5,
    },
    horizontalScroll: {
        paddingHorizontal: 5,
    },
    horizontalScrollContent: {
        paddingRight: 10,
    },
    favoriteCard: {
        backgroundColor: '#fff',
        width: 140,
        padding: 15,
        borderRadius: 12,
        marginHorizontal: 5,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    favoriteHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    favoriteType: {
        fontSize: 12,
        color: '#7f8c8d',
        fontWeight: '500',
    },
    favoritePrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#27ae60',
    },
    favoriteIcon: {
        fontSize: 32,
        textAlign: 'center',
        marginVertical: 10,
    },
    favoriteName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c3e50',
        textAlign: 'center',
    },
    categoriesSection: {
        paddingHorizontal: 15,
        marginVertical: 10,
    },
    categoryRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    categoryItem: {
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 15,
        borderRadius: 12,
        width: (width - 60) / 2,
    },
    categoryIcon: {
        fontSize: 28,
        marginBottom: 8,
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#2c3e50',
        textAlign: 'center',
    },
    foodCard: {
        backgroundColor: '#fff',
        width: 100,
        padding: 15,
        borderRadius: 12,
        marginHorizontal: 5,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    foodIcon: {
        fontSize: 28,
        marginBottom: 8,
    },
    foodName: {
        fontSize: 12,
        fontWeight: '500',
        color: '#2c3e50',
        textAlign: 'center',
    },
    destinationCard: {
        backgroundColor: '#fff',
        width: 120,
        padding: 15,
        borderRadius: 12,
        marginHorizontal: 5,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    destinationIcon: {
        fontSize: 28,
        marginBottom: 8,
    },
    destinationName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: 4,
    },
    destinationType: {
        fontSize: 11,
        color: '#7f8c8d',
        textAlign: 'center',
    },
    bottomNav: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    navButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3498db',
        paddingVertical: 12,
        borderRadius: 25,
        elevation: 3,
    },
    navIcon: {
        fontSize: 18,
        color: '#fff',
        marginRight: 8,
    },
    navText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default LandingPage;