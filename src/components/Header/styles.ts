import styled from 'styled-components/native';

type ContainerStyleProps = {
  paddingTop: number;
};

export const Container = styled.View<ContainerStyleProps>`
  width: 100%;
  padding: 32px 24px;
  padding-top: ${({ paddingTop }) => paddingTop + 32}px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_700};

  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
  color: ${({ theme }) => theme.COLORS.GRAY_100};
`;
