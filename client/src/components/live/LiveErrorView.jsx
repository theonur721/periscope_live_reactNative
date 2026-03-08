import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { normalize } from '../../utils/Normalize';

const LiveErrorView = ({ err, apiBase, onBack }) => {
  return (
    <View style={styles.center}>
      <Text style={styles.errTitle}>Hata</Text>
      <Text style={styles.errText}>{String(err)}</Text>

      <Text style={styles.errHint}>API_BASE: {apiBase}</Text>
      <Text style={styles.errHint}>
        İpucu: Wi-Fi / DNS / Battery Opt. etkileyebilir.
      </Text>

      <TouchableOpacity
        onPress={onBack}
        style={[styles.btn, { marginTop: 16 }]}
      >
        <Text style={{ color: 'white', fontWeight: '700' }}>Geri</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LiveErrorView;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    padding: normalize(16),
  },

  errTitle: {
    color: 'white',
    fontSize: normalize(18),
    fontWeight: '800',
    marginBottom: normalize(8),
  },

  errText: {
    color: 'tomato',
    textAlign: 'center',
    marginBottom: normalize(12),
    fontSize: normalize(13),
  },

  errHint: {
    color: 'white',
    opacity: 0.8,
    marginTop: normalize(6),
    textAlign: 'center',
    fontSize: normalize(12),
  },

  btn: {
    backgroundColor: 'rgba(255,0,0,0.75)',
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(8),
    borderRadius: normalize(12),
  },
});
