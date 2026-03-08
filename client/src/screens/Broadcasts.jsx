import React, { useEffect, useState, useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Geolocation from 'react-native-geolocation-service';
import { useDispatch } from 'react-redux';

// Data & UI
import { BROADCASTS } from '../constant/Broadcasts';
import BroadcastsCard from '../components/broadcasts/BroadcastsCard';

// Navigation & theme
import { ROUTES } from '../router/Routes';
import { normalize } from '../utils/Normalize';
import { COLORS } from '../theme/Colors';

// Redux (canlı yayın konumu için)
import { setLastLiveLocation } from '../store/slice/LiveSlice';

const Broadcasts = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    setData(BROADCASTS);
    if (BROADCASTS.length > 0) setActiveId(BROADCASTS[0].id);
  }, []);

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems?.length > 0) setActiveId(viewableItems[0].item.id);
  }, []);

  /**
   * 🎥 GO LIVE sırayla..
   * - Kullanıcı canlı yayına bastığında çalışır
   * - Önce konum izni kontrol edilir
   * - Konum alınabilirse Redux'a kaydedilir
   * - Alınamazsa yayın konumsuz başlatılır
   */
  const handleGoLive = async () => {
    const go = liveLocation => {
      // 📍 Son yayın konumunu Redux'ta sakla
      // (Map ekranında göstermek için)
      dispatch(setLastLiveLocation(liveLocation));

      // 🎬 Canlı yayın ekranına her durumda geç
      navigation.navigate(ROUTES.HostLiveRoom, { liveLocation });
    };

    try {
      // 📍 ANDROID: runtime location permission
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Konum',
            'Konum izni verilmedi. Yayın konumsuz başlatıldı.',
          );
          return go(null);
        }
      }

      // 📍 iOS: "Uygulamayı kullanırken" izni
      if (Platform.OS === 'ios') {
        const auth = await Geolocation.requestAuthorization('whenInUse');

        if (auth !== 'granted') {
          Alert.alert(
            'Konum',
            'Konum izni verilmedi. Yayın konumsuz başlatıldı.',
          );
          return go(null);
        }
      }

      // 📍 Kullanıcının mevcut konumunu al
      Geolocation.getCurrentPosition(
        pos => {
          const { latitude, longitude } = pos.coords;
          console.log('📍 LIVE LOCATION:', latitude, longitude);

          go({ latitude, longitude });
        },
        err => {
          Alert.alert(
            'Konum',
            err?.message || 'Konum alınamadı. Yayın konumsuz başlatıldı.',
          );
          go(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 5000,
        },
      );
    } catch (e) {
      Alert.alert(
        'Konum',
        e?.message || 'Konum alınamadı. Yayın konumsuz başlatıldı.',
      );
      go(null);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        extraData={activeId}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <BroadcastsCard item={item} isActive={item.id === activeId} />
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={6}
        removeClippedSubviews={false}
      />

      {/* 🎥 GO LIVE BUTTON */}
      <TouchableOpacity style={styles.goLiveBtn} onPress={handleGoLive}>
        <Icon name="video-camera" size={normalize(22)} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Broadcasts;

const BTN_SIZE = normalize(56);
const BTN_RADIUS = normalize(28);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  goLiveBtn: {
    position: 'absolute',
    right: normalize(16),
    bottom: normalize(60),
    width: BTN_SIZE,
    height: BTN_SIZE,
    borderRadius: BTN_RADIUS,
    backgroundColor: COLORS.live,
    alignItems: 'center',
    justifyContent: 'center',

    // shadow (iOS)
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: normalize(6),
    shadowOffset: { width: 0, height: normalize(4) },

    // shadow (Android)
    elevation: 6,
  },
});
