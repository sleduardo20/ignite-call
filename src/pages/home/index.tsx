import Image from 'next/image';
import { Heading, Text } from '@igniteui-sleduardo20/react';
import { Container, Hero, Preview } from './styles';
import appPreview from '../../assets/app-preview.png';
import { ClaimUsernameForm } from './ClaimUsernameForm';

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading size="4xl">Agendamento descomplicado</Heading>

        <Text size="lg">
          Conecte seu calendario e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>

        <ClaimUsernameForm />
      </Hero>
      <Preview>
        <Image
          src={appPreview}
          quality={100}
          priority
          height={400}
          alt="Preview image"
        />
      </Preview>
    </Container>
  );
}
