import { View, Text, Button, Image, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../assets/images/background.png')}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      resizeMode="cover"
    >
      <Image
        source={require('../assets/images/logo.png')}
        style={{ width: 120, height: 120, marginBottom: 20 }}
      />
      <Text style={{ fontSize: 24, marginBottom: 20, color: '#333' }}>
        Bienvenue sur ProfaceApp 👤
      </Text>
      <Button title="Démarrer" onPress={() => router.push('/generate')} />
    </ImageBackground>
  );
}
