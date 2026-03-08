import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import OnBoardingHeader from '../../components/auth/OnBoardingHeader';
import { COLORS } from '../../theme/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ROUTES } from '../../router/Routes';
import { normalize } from '../../utils/Normalize';

const OnBoarding = ({ navigation, route }) => {
  return (
    <View>
      <OnBoardingHeader />

      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.Register)}
          style={styles.CreateBtn}
        >
          <Text style={styles.CreateText}>Create New Account</Text>
        </TouchableOpacity>

        {/* TWITTER */}
        <TouchableOpacity style={[styles.btn, { backgroundColor: '#2CA3F2' }]}>
          <View style={styles.btnContent}>
            <Icon name="twitter" size={20} color={COLORS.white} />
            <Text style={styles.text}>Twitter</Text>
          </View>
        </TouchableOpacity>

        {/* GOOGLE */}
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: COLORS.secondary }]}
        >
          <View style={styles.btnContent}>
            <Icon name="google" size={20} color={COLORS.white} />
            <Text style={styles.text}>Google</Text>
          </View>
        </TouchableOpacity>

        {/* PHONE */}
        <TouchableOpacity style={[styles.btn, { backgroundColor: '#6DD361' }]}>
          <View style={styles.btnContent}>
            <Text style={styles.text}>Phone Number</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.policyText}>
        Lorem ipsum dolor sit, amet{' '}
        <Text style={[styles.policyText, { color: COLORS.primary }]}>
          Privacy Policy
        </Text>{' '}
        adipisicing elit. Incidunt obcaecati dolorum assumenda,{' '}
        <Text style={[styles.policyText, { color: COLORS.primary }]}>
          Cookies Policy
        </Text>{' '}
        molestiae illum deleniti natus eros?
      </Text>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  CreateBtn: {
    marginTop: normalize(15),
    marginBottom: normalize(20),
  },

  CreateText: {
    color: COLORS.text.dark,
    fontSize: normalize(20),
    fontWeight: '600',
    textAlign: 'center',
  },

  btnContainer: {
    gap: normalize(10),
    paddingHorizontal: normalize(10),
  },

  btn: {
    paddingVertical: normalize(12),
    borderRadius: normalize(15),
  },

  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: normalize(10),
  },

  text: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: normalize(16),
    fontWeight: '600',
  },

  policyText: {
    color: COLORS.text.light,
    fontSize: normalize(12),
    textAlign: 'center',
    marginTop: normalize(20),
    paddingHorizontal: normalize(20),
  },
});
