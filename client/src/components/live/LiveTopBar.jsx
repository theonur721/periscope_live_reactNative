import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../theme/Colors';
import { normalize } from '../../utils/Normalize';

export default function LiveTopBar({ status, onClose }) {
  return (
    <View style={styles.topBar}>
      <Text style={styles.title}>CANLI • {status}</Text>

      <TouchableOpacity style={styles.endBtn} onPress={onClose}>
        <Text style={{ color: 'white', fontWeight: '700' }}>Bitir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    position: 'absolute',
    top: normalize(50),
    left: normalize(12),
    right: normalize(12),

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    zIndex: 10,
  },

  title: {
    color: 'white',
    fontSize: normalize(15),
    fontWeight: '800',
  },

  endBtn: {
    backgroundColor: COLORS.live,
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(8),
    borderRadius: normalize(12),
  },
});
