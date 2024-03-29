import styled, { css } from 'styled-components/native';

export const Container = styled.ImageBackground`
  padding: 32px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_800};

  flex: 1;
  justify-content: center;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.XXXL}px;
    color: ${theme.COLORS.BRAND_LIGHT};
    text-align: center;
  `}
`;

export const Slogan = styled.Text`
  ${({ theme }) => css`
    margin-bottom: 32px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.GRAY_100};
    text-align: center;
  `}
`;
