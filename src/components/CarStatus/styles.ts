import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  margin: 32px 0;
  padding: 22px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  border-radius: 6px;

  flex-direction: row;
  align-items: center;
`;

export const IconBox = styled.View`
  width: 77px;
  height: 77px;
  margin-right: 16px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
  border-radius: 6px;

  justify-content: center;
  align-items: center;
`;

export const Message = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GRAY_100};

  flex: 1;
`;

export const TextHighlight = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.BRAND_LIGHT};
`;
