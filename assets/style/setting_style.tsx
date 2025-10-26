// @/assets/style/setting_style.ts
import { ColorScheme } from "@/hooks/UseTheme";
import { StyleSheet } from "react-native";

export const createSettingsStyles = (colors: ColorScheme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.bg || "#ffffff", // Fixed
        },
        safeArea: {
            flex: 1,
        },
        headerCard: {
            backgroundColor: colors.surface || "#f8f9fa", // Fixed
            padding: 20,
            marginHorizontal: 20,
            borderRadius: 16,
            marginTop: 20,
            marginBottom: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 6,
            elevation: 4,
        },
        userSection: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        avatarContainer: {
            marginRight: 12,
        },
        userInfo: {
            flexDirection: "row",
            alignItems: "center",
            marginRight: 6, // Fixed
            flex: 1,
        },
        userName: {
            fontSize: 18,
            fontWeight: "600",
            color: colors.text,
        },
        countryFlag: {
            fontSize: 20,
        },
        sectionTitle: {
            fontSize: 16,
            fontWeight: "700",
            color: colors.text,
            marginHorizontal: 20,
            marginVertical: 12,
        },
        listItem: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 16,
            paddingHorizontal: 20,
            backgroundColor: colors.surface || "#f8f9fa", // Fixed
            borderRadius: 12,
            marginHorizontal: 20,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: colors.border,
        },
        listItemText: {
            fontSize: 16,
            fontWeight: "500",
            color: colors.text,
            flex: 1,
        },
        toggleItem: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 16,
            paddingHorizontal: 20,
            backgroundColor: colors.surface || "#f8f9fa", // Fixed
            borderRadius: 12,
            marginHorizontal: 20,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: colors.border,
        },
        toggleLabel: {
            fontSize: 16,
            fontWeight: "500",
            color: colors.text,
            flex: 1,
        },
        toggleContainer: {
            width: 50,
            height: 28,
            borderRadius: 14,
            backgroundColor: "#4CAF50", // Green = ON
            justifyContent: "center",
            alignItems: "flex-end",
            paddingHorizontal: 4,
        },
        toggleOn: {
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: "#fff",
        },
    });
};