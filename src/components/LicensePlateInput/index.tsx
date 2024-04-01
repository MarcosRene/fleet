import { useTheme } from 'styled-components/native';

import { Container, Input, Label } from './styles';
import { TextInputProps } from 'react-native';

type LicensePlateInput = TextInputProps & {
  label: string;
};

export function LicensePlateInput({ label, ...rest }: LicensePlateInput) {
  const { COLORS } = useTheme();

  return (
    <Container>
      <Label>{label}</Label>

      <Input
        maxLength={7}
        autoCapitalize="characters"
        placeholderTextColor={COLORS.GRAY_400}
        {...rest}
      />
    </Container>
  );
}
