import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import AuthRouteHeader from '../../components/auth/AuthRouteHeader';
import { Formik } from 'formik';
import RegisterSchema from '../../utils/RegisterSchema';
import { COLORS } from '../../theme/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { registerThunk } from '../../store/thunks/AuthThunks';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../router/Routes';
import { normalize } from '../../utils/Normalize';

const Register = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { status, error } = useSelector(state => state.auth);

  const handleRegister = values => {
    console.log('🟩 [REGISTER] submit values:', values);

    dispatch(registerThunk(values))
      .unwrap()
      .then(res => {
        console.log('✅ [REGISTER] success payload:', res);
        navigation.navigate(ROUTES.Login);
      })
      .catch(e => {
        console.log('❌ [REGISTER] unwrap error:', e);
      });
  };

  return (
    <View style={styles.container}>
      <AuthRouteHeader />

      <Formik
        initialValues={{
          image: null,
          name: '',
          username: '',
          bio: '',
          password: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={handleRegister}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          submitCount,
        }) => (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="name"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              autoCapitalize="none"
            />
            {(touched.name || submitCount > 0) && errors.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="username"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              autoCapitalize="none"
            />
            {(touched.username || submitCount > 0) && errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="bio"
              onChangeText={handleChange('bio')}
              onBlur={handleBlur('bio')}
              value={values.bio}
              autoCapitalize="none"
            />
            {(touched.bio || submitCount > 0) && errors.bio && (
              <Text style={styles.errorText}>{errors.bio}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="password"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              autoCapitalize="none"
            />
            {(touched.password || submitCount > 0) && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            {!!error && <Text style={styles.errorText}>❌ {error}</Text>}

            <View style={styles.buttonWrapper}>
              <Button
                title={status === 'loading' ? 'Creating...' : 'Create Account'}
                onPress={handleSubmit}
                color={COLORS.white}
                disabled={status === 'loading'}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  formContainer: {
    padding: normalize(20),
  },

  input: {
    paddingVertical: normalize(10),
    marginVertical: normalize(8),
    borderBottomWidth: 1,
    borderColor: COLORS.text.light,
    fontSize: normalize(16),
  },

  errorText: {
    color: 'red',
    marginTop: normalize(4),
    marginBottom: normalize(6),
    fontSize: normalize(12),
  },

  buttonWrapper: {
    marginTop: normalize(20),
    width: '50%',
    alignSelf: 'flex-end',
    padding: normalize(5),
    backgroundColor: COLORS.primary,
  },
});
