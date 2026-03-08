import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../theme/Colors';
import { normalize } from '../utils/Normalize';
import { deleteAccountThunk, logoutThunk } from '../store/thunks/AuthThunks';

const Profile = () => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  // Çıkış emin misin
  const hanldeExitAccount = () => {
    Alert.alert('Çıkış Yap', 'Çıkış yapmak istediğinize emin misiniz ?', [
      { text: 'Vazgeç', style: 'cancel' },
      {
        text: 'Çıkış',
        style: 'destructive',
        onPress: () => {
          dispatch(logoutThunk());
        },
      },
    ]);
  };

  // Hesabı Sil emin misin ?
  const handleDeleteAccount = () => {
    Alert.alert('Hesabı Sil', 'Hesabı silmek istediğinize emin misiniz ?', [
      { text: 'Vazgeç', style: 'cancel' },
      {
        text: 'Sil',
        style: 'destructive',
        onPress: () => {
          dispatch(deleteAccountThunk());
        },
      },
    ]);
  };

  if (!user) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Kullanıcı bilgisi yok!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* TOP / BIO */}
      <View style={styles.bioContainer}>
        <Image style={styles.img} source={require('../assets/stp-2.png')} />

        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>@{user.username}</Text>

        <Text style={styles.heart}>
          <Icon name="heart" color={COLORS.white} size={normalize(16)} /> 3.021
        </Text>

        <Text style={styles.bio}>{user.bio}</Text>
      </View>

      {/* BUTTON LIST */}
      <View style={styles.btnContainer}>
        <ProfileButton text="Following" />
        <ProfileButton text="Followers" />
        <ProfileButton text="Blocked" />
        <ProfileButton text="Broadcasts" isLast />
      </View>
      <View style={styles.exitContainer}>
        <Pressable onPress={hanldeExitAccount} style={styles.exitBtn}>
          <Text style={styles.exitText}>Exit</Text>
        </Pressable>
        <Pressable onPress={handleDeleteAccount} style={styles.deleteBtn}>
          <Icon name="trash" color={COLORS.red} size={26} />
        </Pressable>
      </View>
    </View>
  );
};

export default Profile;

const ProfileButton = ({ text, isLast }) => {
  return (
    <Pressable style={[styles.btn, !isLast && styles.btnDivider]}>
      <Text style={styles.btnText}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3dde1ff',
    borderTopWidth: normalize(0.5),
    borderColor: COLORS.text.light,
  },

  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: normalize(16),
  },

  emptyText: {
    fontSize: normalize(16),
  },

  /* TOP */
  bioContainer: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    paddingTop: normalize(20),
    paddingBottom: normalize(30),
    gap: normalize(5),
    marginBottom: normalize(60),
  },

  img: {
    width: normalize(100),
    height: normalize(100),
    borderRadius: normalize(50),
    marginBottom: normalize(10),
    borderWidth: normalize(2),
    borderColor: COLORS.white,
  },

  name: {
    color: COLORS.white,
    fontSize: normalize(20),
    fontWeight: 'bold',
  },

  username: {
    color: '#d3dde1ff',
    fontSize: normalize(15),
  },

  heart: {
    color: COLORS.white,
    fontSize: normalize(16),
    marginTop: normalize(4),
  },

  bio: {
    color: COLORS.white,
    fontSize: normalize(16),
    marginTop: normalize(15),
    textAlign: 'center',
    paddingHorizontal: normalize(20),
    lineHeight: normalize(22),
  },

  /* BUTTONS */
  btnContainer: {
    backgroundColor: COLORS.white,
  },

  btn: {
    paddingVertical: normalize(18),
    paddingHorizontal: normalize(20),
    justifyContent: 'center',
  },

  btnDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },

  btnText: {
    color: COLORS.primary,
    fontSize: normalize(20),
    fontWeight: '500',
  },
  exitContainer: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: 'white',
  },
  exitBtn: {
    flex: 1,
    borderRightWidth: 0.5,
    borderColor: 'white',
  },
  exitText: {
    fontSize: 20,
    color: COLORS.tertiary,
    paddingLeft: 20,
    paddingTop: 15,
    color: COLORS.primary,
    fontWeight: '600',
  },
  deleteBtn: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
