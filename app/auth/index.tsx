import React from 'react';
import {
    ImageBackground,

    StyleSheet,
    Text,
    View,
    TouchableOpacity // 1. Import TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router'; // 2. Import useRouter
import { useAuth } from '@clerk/clerk-expo'; // 3. Import useAuth

export default function StartScreen() {
    // 4. Initialize the hooks
    const router = useRouter();
    const { isLoaded, isSignedIn } = useAuth();

    // 5. Create the function to handle the press
    const handlePress = () => {
        // Wait for Clerk to be loaded before doing anything
        if (!isLoaded) {
            return;
        }

        // 6. Check login status and navigate
        if (isSignedIn) {
            // User is already logged in, go to home
            // We use 'replace' so the user can't go "back" to this screen
            router.replace('../(tabs)/home');
        } else {
            // User is not logged in, go to sign in
            router.replace('../(auth)/sign-in');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* 7. Wrap the screen content in TouchableOpacity */}
            <TouchableOpacity
                style={styles.touchableWrapper}
                activeOpacity={0.8} // Makes the fade effect a bit less strong
                onPress={handlePress} // Call your function on press
            >
                <ImageBackground
                    source={{ uri: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e' }}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                >
                    <View style={styles.overlay}>
                        <Text style={styles.subtitle}>traviel</Text>
                        <Text style={styles.title}>Ceylon Traveler</Text>
                        <Text style={styles.description}>
                            Discover the wonders of asia, where nature meets culture
                        </Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

// 8. Add the new style for the wrapper
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    // This style ensures the touchable area fills the whole screen
    touchableWrapper: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Added a slight dark overlay for better text readability
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    subtitle: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    title: {
        fontSize: 48,
        color: '#FFF',
        fontWeight: '900',
        textAlign: 'center',
        marginVertical: 10,
    },
    description: {
        fontSize: 16,
        color: '#EEE',
        textAlign: 'center',
        lineHeight: 24,
    },
});
