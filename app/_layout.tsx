import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="inputs" options={{ title: "Travel Guide" }} />
            <Stack.Screen name="location" options={{ title: "Your Trip" }} />
        </Stack>
    );
}
