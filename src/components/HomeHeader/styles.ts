import styled, { css } from 'styled-components/native';
import { Image } from 'expo-image';
import { Power } from 'phosphor-react-native';

export const Container = styled.View`
  width: 100%;
  padding: 32px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};

  flex-direction: row;
  align-items: center;
`;

export const Greeting = styled.View`
  margin-left: 12px;
  flex: 1;
`;

export const Message = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.GRAY_100};
  `}
`;

export const Name = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.LG}px;
    color: ${theme.COLORS.GRAY_100};
  `}
`;

export const Picture = styled(Image)`
  width: 54px;
  height: 53px;
  border-radius: 7px;
`;

export const PoweIcon = styled(Power).attrs(({ theme }) => ({
  size: 32,
  color: theme.COLORS.GRAY_400,
}))``;
