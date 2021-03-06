import type { NextPage } from 'next';
import { Flex, Button, Stack } from '@chakra-ui/react';
import { Input } from '../components/Form/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Router from 'next/router';

type SignInFormData = {
  email?: string;
  password?: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'No mínimo 6 caracteres'),
});

const SignIn: NextPage = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const { errors } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    Router.push('/dashboard');
    console.log(values);
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}>
        <Stack spacing="4">
          <Input
            error={errors.email}
            type="email"
            label="E-mail"
            {...register('email')}
          />
          <Input
            error={errors.password}
            type="password"
            label="Senha"
            {...register('password')}
          />

          <Button
            type="submit"
            mt="6"
            colorScheme="pink"
            size="lg"
            isLoading={formState.isSubmitting}>
            Entrar
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default SignIn;
