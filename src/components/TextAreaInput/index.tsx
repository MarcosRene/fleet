import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';

import { Container, Input, Label } from './styles';

type TextAreaInput = TextInputProps & {
  label: string;
};

export function TextAreaInput({ label, ...rest }: TextAreaInput) {
  const { COLORS } = useTheme();

  return (
    <Container>
      <Label>{label}</Label>

      <Input
        placeholderTextColor={COLORS.GRAY_400}
        multiline
        autoCapitalize="sentences"
        {...rest}
      />
    </Container>
  );
}
