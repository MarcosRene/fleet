import { Container, Description, Info, Label } from './styles';

export type LocationInfo = {
  label: string;
  description: string;
};

export function LocationInfo({ label, description }: LocationInfo) {
  return (
    <Container>
      <Info>
        <Label numberOfLines={1}>{label}</Label>

        <Description numberOfLines={1}>{description}</Description>
      </Info>
    </Container>
  );
}
