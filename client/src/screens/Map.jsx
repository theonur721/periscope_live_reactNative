import { StyleSheet, View } from 'react-native';
import React from 'react';
import MapsView from '../components/map/MapsView';

const Map = () => {
  return (
    <View style={styles.container}>
      <MapsView />
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
