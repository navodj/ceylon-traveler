import { Stack } from "expo-router";
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Slot } from 'expo-router'
import Constants from 'expo-constants';

const PUBLISHABLE_KEY = Constants.expoConfig?.extra?.clerkPublishableKey;

export default function Layout() {
    return (
        <ClerkProvider tokenCache={tokenCache}>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="inputs" options={{ title: "Travel Guide" }} />
                <Stack.Screen name="location" options={{ title: "Your Trip" }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            </Stack>
        </ClerkProvider>
    );
}




