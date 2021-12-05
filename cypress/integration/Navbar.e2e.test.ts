import locators from "~/testUtils/locators";

describe("Navbar e2e tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should display login link and theme switch", () => {
    const loginLink = cy.findByTestId(locators.navbarLogin);
    const themeSwitch = cy.findByTestId(locators.themeSwitchToggleButton);

    loginLink.should("exist");
    themeSwitch.should("exist");
  });
});
