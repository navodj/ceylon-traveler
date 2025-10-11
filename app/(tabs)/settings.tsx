import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TripsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Account Page!</Text>
    </View>
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