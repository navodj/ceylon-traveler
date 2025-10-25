import { createSettingsStyles } from "@/assets/style/setting_style";
import useTheme from "@/hooks/UseTheme";
import { Ionicons } from "@expo/vector-icons";
// 1. Import useRouter from expo-router
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Linking, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// 2. Removed StackNavigationProp import and RootStackParamList type

const SettingsScreen = () => {
    // Added isDarkMode to check current theme state
    const { colors, toggleDarkMode, isDarkMode } = useTheme();
    // 3. Use the useRouter hook
    const router = useRouter();

    const settingsStyles = createSettingsStyles(colors);

    // Mock user data (Replace with real data from useUser() later if needed)
    const user = {
        name: "User Name", // Placeholder
        isVerified: true,
        countryFlag: "🇱🇰", // Example flag
    };

    // 4. Updated navigation paths using router.push
    const handlePersonalInfo = () => router.push('/personaldata');
    // Assuming you want to go to the sign-in screen for auth/password management

    const handleToggleDarkMode = () => toggleDarkMode();

    const handleRateUs = () => {
        // --- IMPORTANT: Replace these placeholders ---
        const APPLE_APP_ID = "YOUR_APPLE_APP_ID"; // e.g., 12345678
        const ANDROID_PACKAGE_NAME = "com.yourcompany.yourapp"; // e.g., com.chalakatttttt.ceylontraveler
        // --- ------------------------------------ ---

        const url =
            Platform.OS === "ios"
                // Link to your app in the App Store
                ? `https://apps.apple.com/app/id${APPLE_APP_ID}`
                // Link to your app in the Google Play Store
                : `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE_NAME}`;

        Linking.openURL(url).catch(() => alert("Unable to open app store"));
    };

    // --- (Notification states remain the same) ---
    const [isPushEnabled, setIsPushEnabled] = useState(false);
    const [isEmailEnabled, setIsEmailEnabled] = useState(false);

    return (
        <SafeAreaView style={[settingsStyles.container, { flex: 1 }]} edges={['top', 'left', 'right']}>
            {/* User Header Card */}
            <View style={settingsStyles.headerCard}>
                <View style={settingsStyles.userSection}>
                    <View style={settingsStyles.avatarContainer}>
                        <Ionicons name="person-circle-outline" size={60} color={colors.text} />
                    </View>
                    <View style={settingsStyles.userInfo}>
                        <Text style={settingsStyles.userName}>{user.name}</Text>
                        {user.isVerified && (
                            <Ionicons name="checkmark-circle" size={16} color="#007AFF" />
                        )}
                    </View>
                    <Text style={settingsStyles.countryFlag}>{user.countryFlag}</Text>
                </View>
            </View>

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 24 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Account Section */}
                <Text style={settingsStyles.sectionTitle}>Account</Text>

                {/* --- Navigation items use updated handlers --- */}
                <TouchableOpacity style={settingsStyles.listItem} onPress={handlePersonalInfo}>
                    <Text style={settingsStyles.listItemText}>Personal Information</Text>
                    <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
                </TouchableOpacity>

                {/*<TouchableOpacity style={settingsStyles.listItem} onPress={handleChangePassword}>*/}
                {/*    <Text style={settingsStyles.listItemText}>Change Password</Text>*/}
                {/*    <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />*/}
                {/*</TouchableOpacity>*/}

                <TouchableOpacity style={settingsStyles.listItem} onPress={handleRateUs}>
                    <Text style={settingsStyles.listItemText}>Rate Us</Text>
                    <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
                </TouchableOpacity>

                {/* --- Dark Mode Toggle --- */}
                <TouchableOpacity style={settingsStyles.listItem} onPress={handleToggleDarkMode}>
                    <Text style={settingsStyles.listItemText}>
                        {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    </Text>
                    <Ionicons name={isDarkMode ? "sunny-outline" : "moon-outline"} size={20} color={colors.textMuted} />
                </TouchableOpacity>

                {/* --- Notifications Section (remains the same) --- */}
                <Text style={settingsStyles.sectionTitle}>Notifications</Text>

                <View style={settingsStyles.toggleItem}>
                    <Text style={settingsStyles.toggleLabel}>Push notifications</Text>
                    <TouchableOpacity
                        style={[
                            settingsStyles.toggleContainer,
                            { backgroundColor: isPushEnabled ? colors.primary : colors.border },
                        ]}
                        onPress={() => setIsPushEnabled(!isPushEnabled)}
                    >
                        <View
                            style={[
                                settingsStyles.toggleOn,
                                { alignSelf: isPushEnabled ? "flex-end" : "flex-start" },
                            ]}
                        />
                    </TouchableOpacity>
                </View>

                <View style={settingsStyles.toggleItem}>
                    <Text style={settingsStyles.toggleLabel}>Email notifications</Text>
                    <TouchableOpacity
                        style={[
                            settingsStyles.toggleContainer,
                            { backgroundColor: isEmailEnabled ? colors.primary : colors.border },
                        ]}
                        onPress={() => setIsEmailEnabled(!isEmailEnabled)}
                    >
                        <View
                            style={[
                                settingsStyles.toggleOn,
                                { alignSelf: isEmailEnabled ? "flex-end" : "flex-start" },
                            ]}
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SettingsScreen;
