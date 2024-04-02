import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const dimensions = Dimensions.get('window');

type ContainerStyleProps = {
  paddingTop: number;
};

export const Container = styled.View<ContainerStyleProps>`
  position: absolute;
  width: ${dimensions.width}px;
  padding-top: ${({ paddingTop }) => paddingTop + 5}px;
  padding-bottom: 5px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_500};

  flex-direction: row;
  align-items: center;
  justify-content: center;

  z-index: 1;
`;

export const Title = styled.Text`
  margin-left: 4px;

  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GRAY_100};
`;
