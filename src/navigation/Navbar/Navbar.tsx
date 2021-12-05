import React, { useContext } from "react";

import { Search, Star, Activity, LogOut, LogIn } from "react-feather";
import { useLocation } from "react-router-dom";
import styled, { useTheme } from "styled-components";

import { favoritesRoute, loginRoute, tvShowsHomePage, viewedRoute } from "../routes";
import { FlexGrid, Paragraph, NavLinkWithoutDecoration, Button } from "~/components/atoms";
import ThemeSwitch from "~/components/ThemeSwitch";
import UserSessionContext from "~/contexts/UserSessionContext";
import locators from "~/testUtils/locators";
import { setTestId } from "~/testUtils/setTestId";

const NavbarContainer = styled.div`
  position: sticky;
  top: 0;
  padding: 0 10px;
  height: 60px;
  display: flex;
  ${({ theme }) => `box-shadow: 0 0px 4px 1px ${theme.shadowColor};`}
  transition: 0.2s all linear 0.05s;
  ${({ theme }) => `background-color: ${theme.primaryBackgroundColor};`}
  z-index: 4;
`;

const Navbar = (): JSX.Element => {
  const { pathname } = useLocation();
  const { userSessionData, clearUserSession } = useContext(UserSessionContext);
  const theme = useTheme();

  const getActiveColor = (active: boolean) =>
    active ? theme.primaryTextColor : theme.secondaryTextColor;

  const getActiveParagraphProps = (active: boolean) => ({
    color: getActiveColor(active),
    textAlign: "center",
    useTextShadow: active
  });

  const getIsActiveRoute = (currentRoute: string): boolean => currentRoute === pathname;
  const isUserLoggedIn = userSessionData?.userInfo && userSessionData.sessionId;

  return (
    <NavbarContainer {...setTestId(locators.navbar)}>
      <FlexGrid flex="1" justifyContent="flex-start" gap="10px" alignItems="center">
        {isUserLoggedIn && (
          <>
            <NavLinkWithoutDecoration
              to={tvShowsHomePage}
              {...setTestId(locators.navbarSearchTvShows)}>
              <FlexGrid flexDirection="column" alignItems="center" justifyContent="center">
                <Search color={getActiveColor(getIsActiveRoute(tvShowsHomePage))} />
                <Paragraph
                  {...getActiveParagraphProps(getIsActiveRoute(tvShowsHomePage))}
                  transition="color 0.3s ease-in-out">
                  Search TV Shows
                </Paragraph>
              </FlexGrid>
            </NavLinkWithoutDecoration>
            <NavLinkWithoutDecoration to={favoritesRoute} {...setTestId(locators.navbarFavorites)}>
              <FlexGrid flexDirection="column" alignItems="center" justifyContent="center">
                <Star color={getActiveColor(getIsActiveRoute(favoritesRoute))} />
                <Paragraph
                  {...getActiveParagraphProps(getIsActiveRoute(favoritesRoute))}
                  transition="color 0.3s ease-in-out">
                  Favorites
                </Paragraph>
              </FlexGrid>
            </NavLinkWithoutDecoration>
            <NavLinkWithoutDecoration to={viewedRoute} {...setTestId(locators.navbarViewed)}>
              <FlexGrid flexDirection="column" alignItems="center" justifyContent="center">
                <Activity color={getActiveColor(getIsActiveRoute(viewedRoute))} />
                <Paragraph
                  {...getActiveParagraphProps(getIsActiveRoute(viewedRoute))}
                  transition="color 0.3s ease-in-out">
                  Viewed
                </Paragraph>
              </FlexGrid>
            </NavLinkWithoutDecoration>
          </>
        )}
      </FlexGrid>
      <FlexGrid flexDirection="row" gap="5px" alignItems="center">
        {isUserLoggedIn ? (
          <Button
            margin="20px"
            borderRadius="0px"
            border="0px"
            variant="secondary"
            onClick={clearUserSession}>
            <FlexGrid flexDirection="column" alignItems="center" justifyContent="center">
              <LogOut color={theme.primaryTextColor} />
              <Paragraph color={theme.primaryTextColor} transition="color 0.3s ease-in-out">
                Log out
              </Paragraph>
            </FlexGrid>
          </Button>
        ) : (
          <NavLinkWithoutDecoration to={loginRoute} {...setTestId(locators.navbarLogin)}>
            <FlexGrid flexDirection="column" alignItems="center" justifyContent="center">
              <LogIn color={getActiveColor(getIsActiveRoute(loginRoute))} />
              <Paragraph
                {...getActiveParagraphProps(getIsActiveRoute(loginRoute))}
                transition="color 0.3s ease-in-out">
                Login
              </Paragraph>
            </FlexGrid>
          </NavLinkWithoutDecoration>
        )}
        <FlexGrid flexDirection="column" justifyContent="center">
          <ThemeSwitch />
        </FlexGrid>
      </FlexGrid>
    </NavbarContainer>
  );
};

export default Navbar;
