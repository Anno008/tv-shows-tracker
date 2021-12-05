import React, { forwardRef, ForwardedRef } from "react";

import styled from "styled-components";

import { FlexGrid, Label } from "../atoms";
import { setTestId } from "~/testUtils/setTestId";

const InputEl = styled.input`
  height: 40px;
  ${({ theme }) => `border: 1px solid ${theme.shadowColor};`}
  ${({ theme }) => `color: ${theme.primaryTextColor};`}
  ${({ theme }) => `background-color: ${theme.secondaryBackgroundColor};`}
  border-radius: 10px;
  padding: 5px 10px;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
`;

interface Props {
  type: "text" | "number" | "password" | "email";
  placeholder?: string;
  value?: string;
  onTextChange?: (value: string) => void;
  testId?: string;
  autoComplete?: string;
  labelText?: string;
  margin?: string;
  height?: string;
}

const Input = (
  { type, labelText, placeholder, value, onTextChange, testId, autoComplete, margin }: Props,
  ref: ForwardedRef<HTMLInputElement>
): JSX.Element => (
  <FlexGrid flexDirection="column" margin={margin} width="100%">
    {labelText && <Label>{labelText}</Label>}
    <InputEl
      ref={ref}
      autoComplete={autoComplete}
      type={type}
      {...setTestId(testId)}
      placeholder={placeholder}
      value={value}
      onChange={onTextChange ? ({ target }) => onTextChange(target.value) : undefined}
    />
  </FlexGrid>
);

export default forwardRef<HTMLInputElement, Props>(Input);
