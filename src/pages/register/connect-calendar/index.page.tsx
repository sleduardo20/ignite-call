import { ArrowRight, Check } from 'phosphor-react';
import { Button, Heading, MultiStep, Text } from '@igniteui-sleduardo20/react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Container, Header } from '../styles';
import { ConnectBox, ConnectItem, AuthError } from './styles';

export default function Register() {
  const session = useSession();
  const router = useRouter();

  const hasAuthError = !!router.query.error;
  const isSignedIn = session.status === 'authenticated';

  const handleConnectCalendar = async () => {
    await signIn('google');
  };

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Conecte o seu calendario para verificar automaticamente as horas
          ocupadas e os novo eventos a medida em que sao agendados.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          {isSignedIn ? (
            <Button size="sm" disabled>
              Conectadado
              <Check />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleConnectCalendar}
            >
              Conectar
              <ArrowRight />
            </Button>
          )}
        </ConnectItem>
        {hasAuthError && (
          <AuthError size="sm">
            Falha ao se conectar com o Google, verifique se voce habilitou as
            permissoes ao Google Calendar.
          </AuthError>
        )}
        <Button type="submit" disabled={!isSignedIn}>
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  );
}
