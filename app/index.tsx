import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png' )}
        style={styles.logo}
      />

      <Image
        source={{ uri: 'https://i.ibb.co/qfBXprq/Design-sans-titre-10.png' }}
        style={styles.banner}
      />

      <Text style={styles.title}>AI professional headshots</Text>

      <TouchableOpacity onPress={() => router.push('/generate')} style={styles.button}>
        <Text style={styles.buttonText}>START</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  logo: {
    width: 240,
    height: 240,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  banner: {
    width: 320,
    height: 320,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    color: '#aaa',
    marginBottom: 30,
    textAlign: 'center',
    
  },
  button: {
    backgroundColor: '#2e64e5',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },
});


