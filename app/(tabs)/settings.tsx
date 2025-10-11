import React from "react";
import { StyleSheet, Text, View } from "react-native";

// Update the import path to the correct relative location of Preferences
import Preferences from "@/components/preferences";

export default function TripsScreen() {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to the Account Page!</Text>
        <Text style={styles.text}>Manage your account settings below.</Text>
      </View>
      <View style={{ height: 1, backgroundColor: "#e0e0e0", marginVertical: 10 }}></View>
      <View style={{ padding: 16 }}>
        <Preferences />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});