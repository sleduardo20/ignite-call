/* eslint-disable jsx-a11y/label-has-associated-control */
import { ArrowRight } from 'phosphor-react';
import {
  Button,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@igniteui-sleduardo20/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { api } from '@/lib/axios';
import { AxiosError } from 'axios';
import { Container, Form, FormError, Header } from './styles';
import { notification } from '../components/Notification';

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Usuário precisa ter no mínimo 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, { message: 'Informe apenas letras e hífens.' })
    .transform(username => username.toLowerCase()),
  name: z.string().min(3, { message: 'Nome precisa ter no mínimo 3 letras.' }),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const router = useRouter();

  useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query.username));
    }
  }, [router.query?.username, setValue]);

  const handleRegister = async (data: RegisterFormData) => {
    try {
      await api.post('/users', {
        name: data.name,
        username: data.username,
      });

      await router.push('/register/connect-calendar');
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        notification.error(error.response?.data.message);
        return;
      }

      notification.error('Error in application');
    }
  };

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>

      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size="sm">Nome de usuário</Text>
          <TextInput
            prefix="ignite.com/"
            placeholder="seu-usuário"
            id="user-name"
            {...register('username')}
          />
          {errors?.username && (
            <FormError size="sm">{errors.username.message}</FormError>
          )}
        </label>

        <label>
          <Text size="sm">Nome completo</Text>
          <TextInput placeholder="Seu nome" {...register('name')} />
          {errors?.name && (
            <FormError size="sm">{errors.name.message}</FormError>
          )}
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Próximo passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  );
}
