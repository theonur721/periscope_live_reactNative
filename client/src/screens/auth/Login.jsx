import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import AuthRouteHeader from '../../components/auth/AuthRouteHeader';
import { COLORS } from '../../theme/Colors';
import { Formik } from 'formik';
import LoginSchema from '../../utils/LoginSchema';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { loginThunk } from '../../store/thunks/AuthThunks';
import { ROUTES } from '../../router/Routes';
import { normalize } from '../../utils/Normalize';

const Login = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector(state => state.auth);
  const navigation = useNavigation();

  const handleLogin = values => {
    console.log('🟦 [LOGIN] submit values:', values);

    dispatch(loginThunk(values))
      .unwrap()
      .then(res => {
        console.log('✅ [LOGIN] success payload:', res);
        navigation.navigate(ROUTES.TabRouter);
      })
      .catch(e => {
        // ✅ artık hata yutulmuyor
        console.log('❌ [LOGIN] unwrap error:', e);
      });
  };

  return (
    <View style={styles.container}>
      <AuthRouteHeader />

      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
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
              placeholder="Username"
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              value={values.username}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
            />
            {(touched.username || submitCount > 0) && errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}

            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              onSubmitEditing={handleSubmit}
              returnKeyType="done"
            />
            {(touched.password || submitCount > 0) && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            {!!error && <Text style={styles.errorText}>❌ {error}</Text>}

            <View style={styles.buttonWrapper}>
              <Button
                title={status === 'loading' ? 'Logging in...' : 'Login'}
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

export default Login;

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
    backgroundColor: COLORS.primary,
    padding: normalize(5),
  },
});
