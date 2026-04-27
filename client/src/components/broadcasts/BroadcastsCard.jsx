import React from 'react';
import { Image, StyleSheet, Text, View, ImageBackground } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../theme/Colors';
import { normalize } from '../../utils/Normalize';

const BroadcastsCard = ({ item, isActive }) => {
  return (
    <View style={styles.card}>
      {isActive ? (
        <Video
          source={{ uri: item.videoUrl }}
          style={styles.media}
          resizeMode="cover"
          repeat
          muted
          paused={false}
          onError={e => console.log('VIDEO ERROR:', item.id, e)}
        />
      ) : (
        <ImageBackground
          source={{ uri: item.thumbnail }}
          style={styles.media}
          resizeMode="cover"
        />
      )}

      <View style={styles.topShade} />
      <View style={styles.bottomShade} />

      <View style={styles.liveContainer}>
        <Text style={styles.liveText}>LIVE</Text>
        <Icon name="user" size={16} color={COLORS.white} />
        <Text style={styles.liveNumberText}>{item.viewers}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.location}>location: {item.location}</Text>
      </View>

      <View style={styles.userContainer}>
        <Text style={styles.nameText}>{item.name ?? 'Yayıncı'}</Text>
        <Image style={styles.avatar} source={{ uri: item.publisherAvatar }} />
      </View>
    </View>
  );
};

export default BroadcastsCard;

const styles = StyleSheet.create({
  card: {
    height: normalize(260),
    marginBottom: normalize(10),
    backgroundColor: COLORS.tertiary,
    overflow: 'hidden',
  },

  media: {
    ...StyleSheet.absoluteFillObject,
  },

  topShade: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: normalize(80),
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  bottomShade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: normalize(140),
    backgroundColor: 'rgba(0,0,0,0.45)',
  },

  liveContainer: {
    position: 'absolute',
    top: normalize(10),
    left: normalize(10),
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(6),
  },

  liveText: {
    color: COLORS.white,
    backgroundColor: COLORS.red,
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(6),
    fontWeight: 'bold',
    fontSize: normalize(14),
  },

  liveNumberText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: normalize(14),
  },

  infoContainer: {
    position: 'absolute',
    left: normalize(10),
    right: normalize(10),
    bottom: normalize(70),
  },

  title: {
    fontSize: normalize(22),
    fontWeight: 'bold',
    color: COLORS.white,
  },

  location: {
    fontSize: normalize(16),
    color: COLORS.white,
  },

  userContainer: {
    position: 'absolute',
    left: normalize(10),
    right: normalize(10),
    bottom: normalize(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.3,
    borderTopColor: COLORS.white,
    paddingTop: normalize(8),
  },

  nameText: {
    fontSize: normalize(16),
    fontWeight: 'bold',
    color: COLORS.white,
  },

  avatar: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(20),
    borderWidth: normalize(2),
    borderColor: COLORS.white,
  },
});
