import { createSettingsStyles } from "@/assets/style/setting_style";
import useTheme from "@/hooks/UseTheme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from "react";
import { Linking, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
type RootStackParamList = {
  PersonData: undefined;
  Auth: undefined;
  // Add other routes here as needed
};

const SettingsScreen = () => {
  const { colors, toggleDarkMode } = useTheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const settingsStyles = createSettingsStyles(colors);

  // Mock user data
  const user = {
    name: "Ross Adkins",
    isVerified: true,
    countryFlag: "🇺🇸",
  };

  const handlePersonalInfo = () => navigation.navigate("PersonData");
  const handleChangePassword = () => navigation.navigate("Auth");
  const handleToggleDarkMode = () => toggleDarkMode();

  const handleRateUs = () => {
    const url =
      Platform.OS === "ios"
        ? "https://apps.apple.com/app/idYOUR_APP_ID" // Replace with your app's iOS App Store link
        : "https://play.google.com/store/apps/details?id=com.yourcompany.yourapp"; // Replace with your app's Play Store link

    Linking.openURL(url).catch(() => alert("Unable to open app store"));
  };

  const [isPushEnabled, setIsPushEnabled] = useState(false);
  const [isEmailEnabled, setIsEmailEnabled] = useState(false);

  return (
    <SafeAreaView style={[settingsStyles.container, { flex: 1 }]}>
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

        <TouchableOpacity style={settingsStyles.listItem} onPress={handlePersonalInfo}>
          <Text style={settingsStyles.listItemText}>Personal Information</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity style={settingsStyles.listItem} onPress={handleChangePassword}>
          <Text style={settingsStyles.listItemText}>Change Password</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity style={settingsStyles.listItem} onPress={handleRateUs}>
          <Text style={settingsStyles.listItemText}>Rate Us</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity style={settingsStyles.listItem} onPress={handleToggleDarkMode}>
          <Text style={settingsStyles.listItemText}>Switch to Dark Mode</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.text} />
        </TouchableOpacity>

        {/* Notifications Section */}
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