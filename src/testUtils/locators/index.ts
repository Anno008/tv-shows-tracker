import TvShowCardLocators from "./components/CardLocators";
import ThemeSwitchLocators from "./components/ThemeSwitchLocators";
import NavigationLocators from "./navigation/NavigationLocators";
import FavoritesPageLocators from "./pages/FavoritesPageLocators";
import LoginPageLocators from "./pages/LoginPageLocators";
import SearchTvShowsPageLocators from "./pages/SearchTvShowsPageLocators";

export default {
  // common
  mainLayout: "mainLayout",
  ...NavigationLocators,

  // components
  ...TvShowCardLocators,
  ...ThemeSwitchLocators,

  // pages
  ...SearchTvShowsPageLocators,
  ...FavoritesPageLocators,
  ...LoginPageLocators
};
