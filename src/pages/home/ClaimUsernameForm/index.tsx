import { Button, TextInput, Text } from '@igniteui-sleduardo20/react';
import { ArrowRight } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { Form, FormAnnotation } from './styles';

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Usuario precisa ter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, { message: 'Informe apenas letras e hifens.' })
    .transform(username => username.toLowerCase()),
});

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>;

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  });

  const router = useRouter();

  const handleClaimUsername = async (data: ClaimUsernameFormData) => {
    const { username } = data;

    await router.push(`/register?username=${username}`);
  };

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          prefix="ignite.com/"
          placeholder="seu-usuario"
          {...register('username')}
        />
        <Button size="sm" type="submit" disabled={isSubmitting}>
          Reservar
          <ArrowRight />
        </Button>
      </Form>
      <FormAnnotation>
        <Text>
          {errors.username
            ? errors.username.message
            : 'Digite o nome do usuário desejado'}
        </Text>
      </FormAnnotation>
    </>
  );
}
