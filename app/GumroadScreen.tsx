import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRouter } from 'expo-router';

export default function GumroadScreen() {
  const router = useRouter();

  const gumroadUrl = 'https://profaceapp.gumroad.com/l/mnnyg'; // URL Gumroad

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: gumroadUrl }}
        startInLoadingState
        renderLoading={() => (
          <ActivityIndicator
            color="#3278c6"
            size="large"
            style={styles.loader}
          />
        )}
        onNavigationStateChange={(navState) => {
          const url = navState.url;
          if (
            url.includes('thank_you') || // URL classique Gumroad après paiement
            url.includes('success') || // sécurité supplémentaire
            url.includes('receipt') // parfois utilisé après paiement
          ) {
            router.replace('/generate'); // retour à la génération
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
