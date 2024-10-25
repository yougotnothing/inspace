import { useMutation } from '@apollo/client';
import { LOGIN } from 'apollo/mutations/auth.mutation';
import { useFormik } from 'formik';
import { Wrapper } from 'styles/Wrapper';
import { loginSchema } from 'utils/login.schema';
import { InferType } from 'yup';
import {
  LoginWrapper,
  Header,
  Light,
  InputWrapper,
  OtherWrapper,
  Other,
  PasswordInputWrapper,
} from 'styles/Auth';
import { Input } from 'styles/Input';
import { Button } from 'styles/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { EyeToggle } from 'templates/Eye-toggle';

export const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik<InferType<typeof loginSchema>>({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: loginSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async values => {
      await loginSchema.validate(values);
    },
  });
  const [login, { loading }] = useMutation(LOGIN);
  const [type, setType] = useState<'password' | 'text'>('password');

  const handleChangeType = () => {
    setType(prevState => {
      return prevState === 'password' ? 'text' : 'password';
    });
  };

  const handleLogin = async () => {
    try {
      const response = await login({
        variables: {
          loginDto: {
            ...formik.values,
          },
        },
      });

      if (response.data.login.access_token)
        localStorage.setItem('access_token', response.data.login.access_token);

      navigate('/home');
    } catch (error: any) {
      console.log(error);
    }
  };

  if (loading) {
    console.log('loading...');
  }

  return (
    <Wrapper>
      <Light $size="big" $bottom={-320} $right={320} />
      <Light $size="small" $top={-60} $left={-10} />
      <LoginWrapper>
        <Header>Welcome Back!</Header>
        <InputWrapper>
          <Input
            $isInvalid={Boolean(formik.errors.login)}
            placeholder="login"
            type="text"
            id="login"
            value={formik.values.login}
            onChange={e => {
              formik.setFieldValue('login', e.target.value);
              console.log(formik.errors.login);
            }}
            onBlur={formik.handleBlur}
          />
          <PasswordInputWrapper>
            <Input
              $isInvalid={Boolean(formik.errors.password)}
              id="password"
              placeholder="password"
              type={type}
              value={formik.values.password}
              onChange={e => {
                formik.setFieldValue('password', e.target.value);
                console.log(formik.errors.password);
              }}
              onBlur={formik.handleBlur}
            />
            <EyeToggle type={type} setType={handleChangeType} />
          </PasswordInputWrapper>
        </InputWrapper>
        <Button onClick={handleLogin}>Submit</Button>
        <OtherWrapper>
          <Other to="/forgot-password">Forgot password?</Other>
          <Other to="/register">Not registered yet?</Other>
        </OtherWrapper>
      </LoginWrapper>
    </Wrapper>
  );
};
