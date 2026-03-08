import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { LiveKitRoom, AudioSession } from '@livekit/react-native';
import { RoomEvent } from 'livekit-client';

// UI parçaları (kod kalabalığı önlemek için ayrıldı)
import LiveTopBar from '../../components/live/LiveTopBar';
import LiveLocalPreview from '../../components/live/LiveLocalPreview';
import LiveErrorView from '../../components/live/LiveErrorView';

// Kamera & mikrofon izinleri
import { requestAVPermissions } from '../../utils/live/Permissions';

// Backend’ten LiveKit token + url alan helper
import { fetchLivekitToken } from '../../utils/live/LivekitToken';

import { normalize } from '../../utils/Normalize';

// adb reverse / local dev için
const API_BASE = 'http://127.0.0.1:3021';

// Bağlantı çok uzun süre connecting kalırsa takıldı sayıyoruz
const CONNECT_TIMEOUT_MS = 20000;

const HostLiveRoom = ({ navigation, route }) => {
  const liveLocation = route?.params?.liveLocation || null;
  // LiveKit bağlantısı için gerekli state’ler
  const [token, setToken] = useState(null);
  const [url, setUrl] = useState(null);

  // UI’da göstermek için bağlantı durumu
  const [status, setStatus] = useState('init');
  const [err, setErr] = useState(null);

  // LiveKit room instance’ını saklamak için
  const roomRef = useRef(null);

  // En az 1 kere gerçekten bağlandı mı?
  // (connecting → disconnect ayırt etmek için)
  const connectedOnceRef = useRef(false);

  // "Bağlantı takıldı mı?" kontrolü için timer
  const connectTimerRef = useRef(null);

  // Bağlantı çok uzun sürerse hata göster
  const startConnectTimeout = () => {
    clearTimeout(connectTimerRef.current);
    connectTimerRef.current = setTimeout(() => {
      if (!connectedOnceRef.current) {
        setErr(
          'Bağlantı takıldı (signal kurulamadı). Debugger / Wi-Fi / VPN etkileyebilir.',
        );
      }
    }, CONNECT_TIMEOUT_MS);
  };

  useEffect(() => {
    console.log('📍 liveLocation:', liveLocation);

    let mounted = true;

    // Ekran açılır açılmaz çalışan ana akış
    const init = async () => {
      try {
        setErr(null);
        setStatus('token');

        // iOS için audio session başlat
        await AudioSession.startAudioSession();

        // Kamera & mikrofon izni olmadan yayına girmiyoruz
        const ok = await requestAVPermissions();
        if (!ok) throw new Error('Kamera / Mikrofon izni verilmedi');

        // Backend’ten LiveKit token + server url al
        const { url: livekitUrl, token: livekitToken } =
          await fetchLivekitToken({
            apiBase: API_BASE,
            identity: 'host_1',
            room: 'room_test',
            role: 'host',
          });

        if (!mounted) return;

        // LiveKitRoom render edilmesi için gerekli değerler
        setUrl(livekitUrl);
        setToken(livekitToken);
        setStatus('connecting');

        // "takıldı mı?" kontrolünü başlat
        startConnectTimeout();
      } catch (e) {
        console.log('HOST LIVE ERROR:', e?.message || e);
        if (!mounted) return;
        setErr(e?.message || 'Init error');
      }
    };

    init();

    // Ekrandan çıkınca cleanup
    return () => {
      mounted = false;
      clearTimeout(connectTimerRef.current);

      try {
        roomRef.current?.disconnect();
      } catch {}

      try {
        AudioSession.stopAudioSession();
      } catch {}
    };
  }, [liveLocation]);

  // Global hata ekranı
  if (err) {
    return (
      <LiveErrorView
        err={err}
        apiBase={API_BASE}
        onBack={() => navigation.goBack()}
      />
    );
  }

  // Token veya URL gelmeden LiveKitRoom render etmiyoruz
  if (!token || !url) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'white' }}>
          {status === 'token' ? 'Token alınıyor...' : 'Hazırlanıyor...'}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <LiveKitRoom
        serverUrl={url}
        token={token}
        connect
        audio
        video
        // ⚠️ DİKKAT:
        // roomOptions değil → options
        options={{
          adaptiveStream: true,
          dynacast: true,
          publishDefaults: {
            // iOS simülatörde sorun çıkardığı için kapalı
            simulcast: Platform.OS === 'ios' ? false : true,
            videoEncoding: { maxBitrate: 1_500_000, maxFramerate: 30 },
          },
        }}
        // Room instance oluştuğu an event’leri bağla
        onRoomCreated={room => {
          roomRef.current = room;

          // Signal (websocket) durumu
          room.on(RoomEvent.SignalConnected, () =>
            console.log('🔌 SIGNAL CONNECTED'),
          );
          room.on(RoomEvent.SignalDisconnected, () =>
            console.log('🔌 SIGNAL DISCONNECTED'),
          );

          // Genel bağlantı state’leri (UI için)
          room.on(RoomEvent.ConnectionStateChanged, state => {
            const s = String(state).toLowerCase();
            console.log('📡 CONN STATE:', state);

            if (s.includes('connected')) setStatus('connected');
            else if (s.includes('reconnecting')) setStatus('reconnecting');
            else if (s.includes('connecting')) setStatus('connecting');
            else if (s.includes('disconnected')) setStatus('disconnected');
          });

          // İlk kez gerçekten bağlanıldığı an
          room.on(RoomEvent.Connected, async () => {
            console.log('✅ CONNECTED');
            connectedOnceRef.current = true;
            setStatus('connected');
            clearTimeout(connectTimerRef.current);

            // Kamera ve mikrofonu publish et
            try {
              await room.localParticipant.setMicrophoneEnabled(true);
              await room.localParticipant.setCameraEnabled(true);
            } catch (e) {
              console.log('LOCAL MEDIA ERROR:', e?.message || e);
              setErr(e?.message || 'Local media error');
            }
          });

          room.on(RoomEvent.Disconnected, reason => {
            console.log('🔴 DISCONNECTED reason:', reason);
            setStatus('disconnected');

            // Ping timeout gibi durumları kullanıcıya göster
            const msg = String(reason || '').toLowerCase();
            if (msg.includes('ping')) {
              setErr(
                'Bağlantı koptu (ping timeout). Debugger / DevTools kapatıp tekrar dene.',
              );
            }
          });
        }}
        onError={e => {
          console.log('❌ LiveKitRoom onError:', e);
          setErr(String(e?.message || e));
        }}
        style={{ flex: 1 }}
      >
        {/* Kamera preview + debug info */}
        <LiveLocalPreview status={status} />

        {/* Üst bar (status + bitir) */}
        <LiveTopBar
          status={status}
          onClose={() => {
            try {
              roomRef.current?.disconnect();
            } catch {}
            navigation.goBack();
          }}
        />
      </LiveKitRoom>
    </View>
  );
};

export default HostLiveRoom;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    padding: normalize(16),
  },
});
