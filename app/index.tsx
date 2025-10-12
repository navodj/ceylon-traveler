import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { router } from 'expo-router';

export default function StartScreen() {
  const handlePress = () => {
    router.push('/inputs');
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e' }}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <Text style={styles.subtitle}>traviel</Text>
            <Text style={styles.title}>Ceylon Traveler</Text>
            <Text style={styles.description}>
              Discover the wonders of asia, where nature meets culture
            </Text>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '300',
    letterSpacing: 2,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  title: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 1,
  },
  description: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '300',
    maxWidth: 300,
  },
});