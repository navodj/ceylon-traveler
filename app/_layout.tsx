// I've cleaned up the imports to be more standard
import { Slot } from "expo-router";
import { ThemeProvider } from "@/hooks/UseTheme";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout() {
    return (
        // This is the correct place for ClerkProvider
        <ClerkProvider
            tokenCache={tokenCache}
            publishableKey={CLERK_PUBLISHABLE_KEY} // Pass the variable here
        >
            <ThemeProvider>
                <Slot />
            </ThemeProvider>
            {/* ^ This was the syntax error. It must be a closing tag. */}
        </ClerkProvider>
    );
}