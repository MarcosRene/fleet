import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
`;

export const Content = styled.View`
  margin-top: 16px;
  padding: 32px;

  flex: 1;
  gap: 16px;
`;

export const Message = styled.Text`
  margin: 24px;

  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.WHITE};

  text-align: center;
`;
