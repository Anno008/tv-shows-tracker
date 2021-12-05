import React from "react";

import { render, fireEvent, screen } from "@testing-library/react";

import Input from "../Input";

describe("Input tests", () => {
  const mockedProps = {
    type: "text" as const,
    placeholder: "E-mail",
    value: "test"
  };

  it("Should display value in the input", () => {
    render(<Input {...mockedProps} />);

    const inputEl = screen.getByDisplayValue(mockedProps.value);

    expect(inputEl).toBeInTheDocument();
  });

  it("Should display label", () => {
    const labelText = "Test label";

    render(<Input {...mockedProps} labelText={labelText} />);

    const labelEl = screen.getByText(labelText);

    expect(labelEl).toBeInTheDocument();
  });

  it("Should display placeholder", () => {
    const placeholderText = "Test place holder";
    render(<Input {...mockedProps} placeholder={placeholderText} />);

    const placeholder = screen.getByPlaceholderText(placeholderText);

    expect(placeholder).toBeInTheDocument();
  });

  it("Should call onTextChanged when input changes", () => {
    const text = "test123";
    const onTextChange = jest.fn();
    render(<Input {...mockedProps} onTextChange={onTextChange} />);

    const inputEl = screen.getByDisplayValue(mockedProps.value);

    fireEvent.change(inputEl, { target: { value: text } });

    expect(onTextChange).toHaveBeenCalledWith(text);
  });
});
