import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />

      <Image
        source={{ uri: 'https://i.ibb.co/3yjPH3Ht/Design-sans-titre-8.png' }}
        style={styles.banner}
      />

      {/* ✅ Deuxième image ajoutée ici */}
      <Image
        source={{ uri: 'https://i.ibb.co/s94hWmzK/Design-sans-titre-9.png' }}
        style={styles.bannerSecondary}
      />

      <Text style={styles.title}>AI professional headshots</Text>

      <TouchableOpacity onPress={() => router.push('/generate')} style={styles.button}>
        <Text style={styles.buttonText}>GET IT</Text>
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
    marginBottom: 20,
    resizeMode: 'contain',
  },
  banner: {
    width: 400,
    height: 150,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  bannerSecondary: {
    width: 400,
    height: 150,
    marginBottom: 50,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    marginBottom: 60,
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
    fontSize: 18,
    fontWeight: '600',
  },
});
