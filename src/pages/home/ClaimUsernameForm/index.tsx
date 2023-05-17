import { Button, TextInput } from '@igniteui-sleduardo20/react';
import { ArrowRight } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from './styles';

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .max(4, { message: 'alskdasdfasdfasdfasdfasdfasdfasdfasdffjasdfk' })
    .min(3)
    .regex(/^([a-z\\-]+)$/i)
    .transform((username) => username.toLowerCase()),
});

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>;

export function ClaimUsernameForm() {
  const { register, handleSubmit } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  });

  const handleClaimUsername = (data: ClaimUsernameFormData) => {
    console.log(data.username);
  };

  return (
    <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
      <TextInput
        prefix="ignite.com/"
        placeholder="seu-usuario"
        {...register('username')}
      />
      <Button size="sm" type="submit">
        Reservar
        <ArrowRight />
      </Button>
    </Form>
  );
}
