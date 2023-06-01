import { ArrowRight } from 'phosphor-react';
import { Button, Heading, MultiStep, Text } from '@igniteui-sleduardo20/react';
import { signIn } from 'next-auth/react';
import { Container, Header } from '../styles';
import { ConnectBox, ConnectItem } from './styles';

export default function Register() {
  const handleRegister = async (data: any) => {
    console.log(data);
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
          <Button
            variant="secondary"
            size="sm"
            onClick={e => {
              e.preventDefault();
              signIn('google');
            }}
          >
            Conectar
            <ArrowRight />
          </Button>
        </ConnectItem>
        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  );
}
