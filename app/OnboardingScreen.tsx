// OnboardingScreen.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OnboardingScreen() {
    const router = useRouter();

    const handleGetStarted = () => {
        router.push('/login');
    };

    const handleSkip = () => {
        router.push('/LandingPage');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Optional: You can add an image here if you have one */}
                {/* <Image
          source={require('./assets/onboarding-image.png')}
          style={styles.image}
          resizeMode="contain"
        /> */}

                {/* Main Title */}
                <Text style={styles.title}>Share Your Adventures</Text>

                {/* Description */}
                <Text style={styles.description}>
                    Enjoy your holiday! don&#39;t forget{'\n'}
                    to take a photo and share to the{'\n'}
                    world
                </Text>

                {/* Get Started Button */}
                <TouchableOpacity
                    style={styles.getStartedButton}
                    onPress={handleGetStarted}
                >
                    <Text style={styles.getStartedText}>Get Started</Text>
                </TouchableOpacity>

                {/* Skip Button */}
                <TouchableOpacity
                    style={styles.skipButton}
                    onPress={handleSkip}
                >
                    <Text style={styles.skipText}>Skip for now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    image: {
        width: 300,
        height: 300,
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#000',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 50,
        color: '#666',
    },
    getStartedButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    getStartedText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    skipButton: {
        paddingVertical: 15,
        paddingHorizontal: 40,
    },
    skipText: {
        color: '#007AFF',
        fontSize: 16,
        fontWeight: '500',
    },
});