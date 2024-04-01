import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import { ArrowLeft } from 'phosphor-react-native';

import { Container, Title } from './styles';

type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  const { COLORS } = useTheme();
  const insets = useSafeAreaInsets();

  const { goBack } = useNavigation();

  return (
    <Container paddingTop={insets.top}>
      <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
        <ArrowLeft size={24} weight="bold" color={COLORS.BRAND_LIGHT} />
      </TouchableOpacity>

      <Title>{title}</Title>
    </Container>
  );
}
