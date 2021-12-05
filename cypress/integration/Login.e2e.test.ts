import locators from "~/testUtils/locators";

const user = Cypress.env("user");

describe("Login e2e tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should Login and proceed to the main screen", () => {
    cy.findByTestId(locators.loginPageUsernameInput).type(user.username);
    cy.findByTestId(locators.loginPagePasswordInput).type(user.password);

    cy.findByTestId(locators.loginPageLoginForm).submit();

    const searchLink = cy.findByTestId(locators.navbarSearchTvShows);
    const favoritesLink = cy.findByTestId(locators.navbarFavorites);
    const themeSwitch = cy.findByTestId(locators.themeSwitchToggleButton);

    searchLink.should("exist");
    favoritesLink.should("exist");
    themeSwitch.should("exist");
  });
});
