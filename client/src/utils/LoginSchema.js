import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Kullanıcı adı zorunlu'),
  password: Yup.string()
    .min(6, 'Şifre en az 6 karakter olmalı')
    .required('Şifre zorunlu'),
});

export default LoginSchema;
