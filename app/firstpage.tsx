// firstpage.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FirstPage() {
    const router = useRouter();

    const handleGetStarted = () => {
        router.push('/signUp');
    };

    const handleSkip = () => {
        router.push('/LandingPage');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Main Title */}
                <Text style={styles.title}>Book a Local</Text>

                {/* Description */}
                <Text style={styles.description}>
                    You can book private city tours with{'\n'}
                    locals on-the-go and experience a new{'\n'}
                    place like never before
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