import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('İsim zorunlu'),
  username: Yup.string().required('Kullanıcı adı zorunlu'),
  bio: Yup.string().max(100, 'En fazla 100 karakter'),
  password: Yup.string().min(6, 'En az 6 karakter').required('Şifre zorunlu'),
});
export default RegisterSchema;
