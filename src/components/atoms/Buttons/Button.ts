import { HTMLProps } from "react";

import styled, { css } from "styled-components";

interface Props extends HTMLProps<HTMLButtonElement> {
  margin?: string;
  borderRadius?: string;
  border?: string;
  variant?: "primary" | "secondary";
}

export const Button = styled.button<Props>`
  background-color: transparent;
  ${({ border, theme }) => `border: ${border ? border : `1px solid ${theme.shadowColor}`};`}
  ${({ theme }) => `color: ${theme.primaryTextColor};`}
  ${({ theme }) => `background-color: ${theme.secondaryBackgroundColor};`}
  ${({ borderRadius }) => `border-radius: ${borderRadius ? borderRadius : "10px"};`}
  padding: 5px 10px;
  box-sizing: border-box;
  transition: background-color 0.5s ease-in-out;
  &:hover {
    ${({ theme }) => `background-color: ${theme.primaryBackgroundColor};`}
    cursor: pointer;
  }
  ${({ variant }) => variant === "primary" && primaryButton}
  ${({ variant }) => variant === "secondary" && secondaryButton}
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const primaryButton = css`
  ${({ theme }) => `background-color: ${theme.secondaryBackgroundColor};`}
`;

const secondaryButton = css`
  ${({ theme }) => `background-color: ${theme.primaryBackgroundColor};`}
`;
