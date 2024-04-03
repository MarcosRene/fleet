import styled, { css } from 'styled-components/native';

export type SizeProps = 'small' | 'normal';

type ContainerProps = {
  size: SizeProps;
};

const variantType = {
  small: css`
    width: 32px;
    height: 32px;
  `,
  normal: css`
    width: 46px;
    height: 46px;
  `,
};

export const Container = styled.View<ContainerProps>`
  ${({ size, theme }) => css`
    margin-right: 12px;
    border-radius: 6px;

    background-color: ${theme.COLORS.GRAY_700};

    justify-content: center;
    align-items: center;

    ${!!size && variantType[size]};
  `}
`;
