import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../theme/Colors';
import { useNavigation } from '@react-navigation/native';
import { normalize } from '../../utils/Normalize';

const AuthRouteHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-circle-o-left" size={40} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default AuthRouteHeader;

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: normalize(20),
    paddingHorizontal: normalize(5),
  },
});
