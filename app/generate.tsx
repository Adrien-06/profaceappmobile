import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { WebView } from 'react-native-webview';

export default function GenerateScreen() {
  const [photo, setPhoto] = useState(null);
  const [licenseKey, setLicenseKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultUri, setResultUri] = useState(null);
  const [status, setStatus] = useState('');
  const [showPayment, setShowPayment] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0]);
      setResultUri(null);
    }
  };

  const handleGenerate = async () => {
    if (!photo || !licenseKey) {
      setStatus('📷 Upload a photo and paste your license key.');
      return;
    }

    setLoading(true);
    setStatus('🧠 Generating your AI headshot...');

    try {
      const formData = new FormData();
      formData.append('file', {
        uri: photo.uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
      formData.append('license_key', licenseKey);

      const response = await fetch('https://profaceapp.onrender.com/api/generate', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data?.result_url) {
        setResultUri(data.result_url);
        setStatus('✅ Your AI headshot is ready!');
      } else {
        setStatus('❌ Error generating headshot.');
      }
    } catch (error) {
      setStatus('❌ Server error.');
    }

    setLoading(false);
  };

  if (showPayment) {
    return (
      <WebView
        source={{ uri: 'https://profaceapp.gumroad.com/l/proface' }}
        style={{ flex: 1 }}
        onNavigationStateChange={(navState) => {
          if (navState.url.includes('thank_you')) {
            setShowPayment(false);
          }
        }}
      />
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Image
          source={{ uri: 'https://i.ibb.co/sprNhQtn/PROFACEAPP.png' }}
          style={styles.logo}
        />

        <Text style={styles.slogan}>AI professional headshots</Text>

        <Text style={styles.step}>1. Upload your photo</Text>
        <TouchableOpacity onPress={pickImage} style={styles.uploadBtn}>
          <Text style={styles.btnText}>Upload your photo</Text>
        </TouchableOpacity>

        <Text style={styles.step}>2. Get your license key</Text>
        <TouchableOpacity onPress={() => setShowPayment(true)}>
          <Text style={styles.licenseLink}>🔑 Get your license key</Text>
        </TouchableOpacity>

        <TextInput
          placeholder="Paste your license key"
          style={styles.input}
          value={licenseKey}
          onChangeText={setLicenseKey}
        />

        <Text style={styles.step}>3. Generate</Text>
        <TouchableOpacity
          onPress={handleGenerate}
          style={styles.generateBtn}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>🚀 Generate</Text>
          )}
        </TouchableOpacity>

        {status !== '' && <Text style={styles.status}>{status}</Text>}

        {resultUri && (
          <Image source={{ uri: resultUri }} style={styles.result} />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
  scroll: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 12,
    resizeMode: 'contain',
  },
  slogan: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 30,
    textAlign: 'center',
  },
  step: {
    fontSize: 16,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  uploadBtn: {
    backgroundColor: '#477aefff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 10,
    width: '100%',
    marginBottom: 16,
  },
  licenseLink: {
    color: '#070707ff',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  generateBtn: {
    backgroundColor: '#00c49a',
    padding: 14,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  status: {
    color: '#ccc',
    marginBottom: 10,
    textAlign: 'center',
  },
  result: {
    width: 250,
    height: 250,
    borderRadius: 8,
    marginTop: 10,
  },
});