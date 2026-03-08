import React, { useMemo, useRef, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { COLORS } from '../../theme/Colors';

//  Yayın yokken gösterilecek default harita görünümü (Türkiye geneli)
const DEFAULT_REGION = {
  latitude: 39.0,
  longitude: 35.0,
  latitudeDelta: 8,
  longitudeDelta: 8,
};

const MapsView = () => {
  const user = useSelector(state => state.auth.user);

  // 📍 Son canlı yayın konumu (Redux'tan geliyor)
  const lastLiveLocation = useSelector(state => state.live.lastLiveLocation);

  // 🗺️ Harita instance'ı (animateToRegion için)
  const mapRef = useRef(null);

  /**
   *  Haritanın odaklanacağı bölge
   * - Yayın varsa → yayın konumu
   * - Yoksa → default bölge
   */
  const region = useMemo(() => {
    if (!lastLiveLocation) return DEFAULT_REGION;

    return {
      latitude: lastLiveLocation.latitude,
      longitude: lastLiveLocation.longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    };
  }, [lastLiveLocation]);

  /**
   *  Map ekranına girildiğinde veya
   *  yeni bir yayın konumu geldiğinde
   * haritayı yumuşak şekilde o noktaya taşı
   */
  useEffect(() => {
    if (lastLiveLocation && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: lastLiveLocation.latitude,
          longitude: lastLiveLocation.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        },
        600, // animasyon süresi (ms)
      );
    }
  }, [lastLiveLocation]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_DEFAULT}
        style={{ flex: 1 }}
        showsUserLocation // 📍 Kullanıcının anlık konumu (mavi nokta)
        region={region} // 🎯 Haritanın merkezi
      >
        {/* 📌 Son canlı yayın marker'ı */}
        {lastLiveLocation && (
          <Marker
            title={`@${user?.username || 'Kullanıcı'} - Son Yayın`}
            description="Yayın burada başlatıldı"
            coordinate={lastLiveLocation}
          />
        )}
      </MapView>

      {/* ℹ️ Henüz yayın yoksa bilgi mesajı */}
      {!lastLiveLocation && (
        <View style={styles.info}>
          <Text style={styles.infoText}>
            Henüz yayın konumu yok. GO LIVE’a basınca burada görünecek.
          </Text>
        </View>
      )}
    </View>
  );
};

export default MapsView;

const styles = StyleSheet.create({
  info: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: COLORS.text.dark,
    padding: 12,
    borderRadius: 12,
  },
  infoText: {
    color: COLORS.white,
    textAlign: 'center',
  },
});
