import { useMutation } from '@apollo/client';
import { REGISTER } from 'apollo/mutations/auth.mutation';
import { useState } from 'react';
import { Wrapper } from 'styles/Wrapper';
import {
  LoginWrapper,
  Header,
  Light,
  InputWrapper,
  OtherWrapper,
  Other,
  PasswordInputWrapper,
} from 'styles/Auth';
import { Button } from 'styles/Button';
import { EyeToggle } from 'templates/Eye-toggle';
import { Input } from 'styles/Input';
import { useFormik } from 'formik';
import { InferType } from 'yup';
import { registerSchema } from 'utils/register.schema';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [type, setType] = useState<Array<'password' | 'text'>>(
    Array(2).fill('password')
  );
  const [register, { error, loading }] = useMutation(REGISTER);
  const navigate = useNavigate();
  const formik = useFormik<InferType<typeof registerSchema>>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerSchema,
    onSubmit: async value => registerSchema.validate(value),
  });

  const handleRegister = async () => {
    try {
      const response = await register({
        variables: {
          user: {
            ...formik.values,
          },
        },
      });

      console.log(response);

      navigate('/login');
    } catch (error: any) {
      console.error(error);
    }
  };

  if (error) {
    console.log('error');
  }

  if (loading) {
    return <h1>loading...</h1>;
  }

  const handleChangeType = (index: number) => {
    setType(prevState => {
      const newState = [...prevState];

      newState[index] = newState[index] === 'password' ? 'text' : 'password';

      return newState;
    });
  };

  return (
    <Wrapper>
      <Light $size="big" $bottom={-320} $right={320} />
      <Light $size="small" $top={-60} $left={-10} />
      <LoginWrapper>
        <Header>Welcome!</Header>
        <InputWrapper>
          <Input
            $isInvalid={Boolean(formik.errors.name)}
            placeholder="name"
            type="text"
            id="name"
            value={formik.values.name}
            onChange={e => {
              formik.setFieldValue('name', e.target.value);
              console.log(formik.errors.name);
            }}
            onBlur={formik.handleBlur}
          />
          <Input
            $isInvalid={Boolean(formik.errors.email)}
            type="text"
            id="email"
            placeholder="email"
            onChange={e => formik.setFieldValue('email', e.target.value)}
            onBlur={formik.handleBlur}
          />
          <PasswordInputWrapper>
            <Input
              $isInvalid={Boolean(formik.errors.password)}
              id="password"
              placeholder="password"
              type={type[0]}
              value={formik.values.password}
              onChange={e => {
                formik.setFieldValue('password', e.target.value);
                console.log(formik.errors.password);
              }}
              onBlur={formik.handleBlur}
            />
            <EyeToggle type={type[0]} setType={() => handleChangeType(0)} />
          </PasswordInputWrapper>
          <PasswordInputWrapper>
            <Input
              $isInvalid={Boolean(formik.errors.confirmPassword)}
              id="confirmPassword"
              placeholder="confirm password"
              type={type[1]}
              value={formik.values.confirmPassword}
              onChange={e => {
                formik.setFieldValue('confirmPassword', e.target.value);
                console.log(formik.errors.confirmPassword);
              }}
              onBlur={formik.handleBlur}
            />
            <EyeToggle type={type[1]} setType={() => handleChangeType(1)} />
          </PasswordInputWrapper>
        </InputWrapper>
        <Button onClick={handleRegister}>Submit</Button>
        <OtherWrapper>
          <Other to="/forgot-password">Forgot password?</Other>
          <Other to="/login">Already have account?</Other>
        </OtherWrapper>
      </LoginWrapper>
    </Wrapper>
  );
};
