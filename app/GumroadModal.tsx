// GumroadModal.tsx
import React from 'react';
import { Modal, View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

export default function GumroadModal({ visible, onClose }) {
  const gumroadUrl = 'https://profaceapp.gumroad.com/l/mnnyg';

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1 }}>
        <WebView
          source={{ uri: gumroadUrl }}
          startInLoadingState
          renderLoading={() => (
            <ActivityIndicator size="large" color="#3278c6" style={styles.loader} />
          )}
          onNavigationStateChange={(navState) => {
            const url = navState.url;
            if (url.includes('thank_you') || url.includes('success') || url.includes('receipt')) {
              onClose(); // Fermer la WebView après paiement
            }
          }}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
