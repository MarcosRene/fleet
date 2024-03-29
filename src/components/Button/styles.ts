import styled, { css } from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  min-height: 56px;
  max-height: 56px;
  background-color: ${({ theme }) => theme.COLORS.BRAND_MID};
  border-radius: 6px;

  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.WHITE};
    text-align: center;
  `}
`;

export const Loading = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.WHITE,
}))``;
