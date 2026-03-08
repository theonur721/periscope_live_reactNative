import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { COLORS } from '../../theme/Colors';
import { normalize, moderateScale } from '../../utils/Normalize';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../router/Routes';

const OnBoardingHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate(ROUTES.Login)}
        style={styles.skipbtn}
      >
        <Text style={styles.skip}>Skip</Text>
      </TouchableOpacity>
      <ImageBackground
        style={styles.bgimg}
        source={require('../../assets/stp-1.png')}
        resizeMode="cover"
        imageStyle={styles.bgimgStyle}
      />

      <Image
        style={styles.logoimg}
        source={require('../../assets/periscopelogo.png')}
      />

      <Text style={styles.title}>Periscope</Text>

      <Text style={styles.subtitle}>Go live • Watch • Explore</Text>
    </View>
  );
};

export default OnBoardingHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    height: moderateScale(400),
    paddingTop: moderateScale(40),
    position: 'relative',
  },

  bgimg: {
    width: '100%',
    height: '100%',
  },

  bgimgStyle: {
    opacity: 0.3,
  },

  logoimg: {
    position: 'absolute',
    top: moderateScale(20),
    left: moderateScale(150),
    height: moderateScale(100),
    width: moderateScale(100),
    resizeMode: 'contain',
  },

  title: {
    position: 'absolute',
    top: moderateScale(130),
    left: moderateScale(150),
    fontSize: normalize(24),
    fontWeight: '500',
    color: COLORS.white,
  },

  subtitle: {
    position: 'absolute',
    top: moderateScale(165),
    left: moderateScale(125),
    fontSize: normalize(13),
    fontWeight: '500',
    color: 'rgba(255,255,255,0.85)',
  },
  skipbtn: {
    position: 'absolute',
    top: moderateScale(15),
    right: moderateScale(20),
    padding: moderateScale(10),
    zIndex: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  skip: {
    color: COLORS.text.light,
    fontSize: normalize(18),
    fontWeight: '500',
  },
});
