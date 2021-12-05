import React from "react";

import { waitFor } from "@testing-library/react";

import App from "~/App";
import { renderWithContext } from "~/testUtils/renderWithContext";

describe("App tests", () => {
  it("Should render app", async () => {
    const { baseElement } = renderWithContext(<App />);

    await waitFor(() => {
      expect(baseElement).toBeInTheDocument();
    });
  });
});
