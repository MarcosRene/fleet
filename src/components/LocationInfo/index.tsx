import { IconBox, IconBoxElementProps } from '../IconBox';
import { Container, Description, Info, Label } from './styles';

export type LocationInfo = {
  label: string;
  description: string;
};

export function LocationInfo({
  label,
  description,
  icon,
}: LocationInfo & { icon: IconBoxElementProps }) {
  return (
    <Container>
      <IconBox icon={icon} />

      <Info>
        <Label numberOfLines={1}>{label}</Label>

        <Description numberOfLines={1}>{description}</Description>
      </Info>
    </Container>
  );
}
