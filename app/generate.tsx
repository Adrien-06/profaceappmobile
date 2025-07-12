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
  ProgressBarAndroid, // Android progress bar
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

export default function GenerateScreen() {
  const [photo, setPhoto] = useState(null);
  const [licenseKey, setLicenseKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUri, setResultUri] = useState(null);
  const [status, setStatus] = useState('');
  const router = useRouter();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0]);
      setResultUri(null);
      setStatus('');
      setProgress(0);
    }
  };

  const handleGenerate = async () => {
    if (!photo || !licenseKey) {
      setStatus('📷 Please upload a photo and enter your license key.');
      return;
    }

    setLoading(true);
    setStatus('🧠 Generating your AI headshot...');
    setProgress(0.2);

    try {
      const formData = new FormData();
      formData.append('file', {
        uri: photo.uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
      formData.append('license_key', licenseKey);

      setProgress(0.4);

      const response = await fetch('https://profaceapp.onrender.com/api/generate', {
        method: 'POST',
        body: formData,
      });

      setProgress(0.7);

      const data = await response.json();

      if (data?.result_url) {
        setResultUri(data.result_url);
        setStatus('✅ Your AI headshot is ready!');
        setProgress(1);
      } else {
        setStatus('❌ Failed to generate headshot. Please check your license key or try again.');
        setProgress(0);
      }
    } catch (error) {
      setStatus('❌ Server error. Please try again later.');
      setProgress(0);
    }

    setLoading(false);
  };

  const handleReset = () => {
    setPhoto(null);
    setResultUri(null);
    setStatus('');
    setProgress(0);
  };

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

        {!resultUri && (
          <>
            <TouchableOpacity onPress={pickImage} style={styles.uploadBtn}>
              <Text style={styles.btnText}> Upload your photo</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/GumroadScreen')}>
              <Text style={styles.licenseLink}>🔑 Get your license key</Text>
            </TouchableOpacity>

            <TextInput
              placeholder="Paste your license key"
              style={styles.input}
              value={licenseKey}
              onChangeText={setLicenseKey}
            />

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
          </>
        )}

        {loading && Platform.OS === 'android' && (
          <ProgressBarAndroid styleAttr="Horizontal" color="#00c49a" indeterminate={false} progress={progress} />
        )}

        {status !== '' && <Text style={styles.status}>{status}</Text>}

        {resultUri && (
          <>
            <Image source={{ uri: resultUri }} style={styles.result} />
            <TouchableOpacity onPress={handleReset} style={styles.againBtn}>
              <Text style={styles.btnText}>🔁 Generate another photo</Text>
            </TouchableOpacity>
          </>
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
    width: 200,
    height: 200,
    marginBottom: 12,
    resizeMode: 'contain',
  },
  slogan: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 30,
    textAlign: 'center',
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
    borderColor: '#ccc',
    borderWidth: 1,
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
    marginBottom: 20,
  },
  againBtn: {
    backgroundColor: '#2e64e5',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  status: {
    color: '#333',
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
