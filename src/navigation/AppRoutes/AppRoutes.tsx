import React from "react";

import { Route, Switch } from "react-router";

import {
  episodeDetailsRoute,
  favoritesRoute,
  loginRoute,
  seasonDetailsRoute,
  tvShowDetailsRoute,
  tvShowsHomePage,
  viewedRoute
} from "../routes";
import PrivateRoute from "./PrivateRoute";
import EpisodeDetailsPage from "~/pages/EpisodeDetailsPage";
import FavoritesPage from "~/pages/FavoritesPage";
import LoginPage from "~/pages/LoginPage";
import PageNotFound from "~/pages/PageNotFound";
import SeasonDetailsPage from "~/pages/SeasonDetailsPage";
import TvShowDetailsPage from "~/pages/TvShowDetailsPage";
import TvShowsHomePage from "~/pages/TvShowsHomePage";
import ViewedPage from "~/pages/ViewedPage";

const AppRoutes = (): JSX.Element => (
  <Switch>
    <PrivateRoute path={tvShowsHomePage} exact component={TvShowsHomePage} />
    <PrivateRoute path={favoritesRoute} component={FavoritesPage} />
    <PrivateRoute path={viewedRoute} component={ViewedPage} />
    <PrivateRoute path={tvShowDetailsRoute} exact component={TvShowDetailsPage} />
    <PrivateRoute path={seasonDetailsRoute} exact component={SeasonDetailsPage} />
    <PrivateRoute path={episodeDetailsRoute} exact component={EpisodeDetailsPage} />
    <Route path={loginRoute} component={LoginPage} />
    <Route component={PageNotFound} />
  </Switch>
);
export default AppRoutes;
