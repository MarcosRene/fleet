import { useTheme } from 'styled-components/native';
import { IconProps } from 'phosphor-react-native';

import { Container, SizeProps } from './styles';

export type IconBoxElementProps = (props: IconProps) => JSX.Element;

type IconBoxProps = {
  size?: SizeProps;
  icon: IconBoxElementProps;
};

export function IconBox({ icon: Icon, size = 'normal' }: IconBoxProps) {
  const { COLORS } = useTheme();

  const iconSize = size === 'normal' ? 24 : 16;

  return (
    <Container size={size}>
      <Icon size={iconSize} color={COLORS.BRAND_LIGHT} />
    </Container>
  );
}
