import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTracks, VideoTrack } from '@livekit/react-native';
import { Track } from 'livekit-client';
import { normalize } from '../../utils/Normalize';

const LiveLocalPreview = ({ status }) => {
  const camTracks = useTracks([Track.Source.Camera]);
  const micTracks = useTracks([Track.Source.Microphone]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.debug}>
        <Text style={styles.debugText}>Status: {status}</Text>
        <Text style={styles.debugText}>Cam tracks: {camTracks.length}</Text>
        <Text style={styles.debugText}>Mic tracks: {micTracks.length}</Text>
      </View>

      {camTracks.map(t => (
        <VideoTrack
          key={t.publication.trackSid}
          trackRef={t}
          style={{ flex: 1 }}
        />
      ))}
    </View>
  );
};

export default LiveLocalPreview;

const styles = StyleSheet.create({
  debug: {
    position: 'absolute',
    top: normalize(110),
    left: normalize(12),
    right: normalize(12),
    zIndex: 20,
    backgroundColor: 'rgba(0,0,0,0.35)',
    padding: normalize(10),
    borderRadius: normalize(10),
  },

  debugText: {
    color: 'white',
    fontSize: normalize(12),
  },
});
