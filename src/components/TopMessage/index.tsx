import { useTheme } from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconBoxProps } from '../ButtonIcon';

import { Container, Title } from './styles';

type TopMessageProps = {
  icon?: IconBoxProps;
  title: string;
};

export function TopMessage({ icon: Icon, title }: TopMessageProps) {
  const { COLORS } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Container paddingTop={insets.top}>
      {!!Icon && <Icon size={18} color={COLORS.GRAY_100} />}

      <Title>{title}</Title>
    </Container>
  );
}
