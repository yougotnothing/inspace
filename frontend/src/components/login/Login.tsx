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
} from './Login.styled';
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
  const [login, { data, loading }] = useMutation(LOGIN);
  const [type, setType] = useState<'password' | 'text'>('password');

  const handleChangeType = () => {
    setType(prevState => {
      return prevState === 'password' ? 'text' : 'password';
    });
  };

  const handleLogin = async () => {
    try {
      await login({
        variables: {
          loginDto: {
            login: formik.values.login,
            password: formik.values.password,
          },
        },
      });
      navigate('/moon-phase');
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
            placeholder="login"
            type="text"
            value={formik.values.login}
            onChange={e => formik.setFieldValue('login', e.target.value)}
            onBlur={formik.handleBlur}
          />
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Input
              placeholder="password"
              type={type}
              value={formik.values.password}
              onChange={e => formik.setFieldValue('password', e.target.value)}
              onBlur={formik.handleBlur}
            />
            <EyeToggle type={type} setType={handleChangeType} />
          </div>
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
