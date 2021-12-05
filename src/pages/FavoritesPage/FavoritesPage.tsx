import React, { useEffect, useState, useCallback, useContext } from "react";

import { toast } from "react-toastify";
import { Waypoint } from "react-waypoint";

import { getFavoriteTvShows } from "~/api/services/UserService";
import { CssGrid, MainLayout } from "~/components/atoms";
import Card from "~/components/Card";
import Loader from "~/components/Loader";
import UserSessionContext from "~/contexts/UserSessionContext";
import { tvShowDetailsRoute } from "~/navigation/routes";
import locators from "~/testUtils/locators";
import { TvShowsData } from "~/types";
import { mergeTvShowsData } from "~/utils/mergeTvShowsData";

const FavoritesPage = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [tvShows, setTvShows] = useState<TvShowsData>();
  const { userSessionData } = useContext(UserSessionContext);
  const fetchTvShows = useCallback(() => {
    setIsLoading(true);
    if (!userSessionData?.userInfo?.id || !userSessionData?.sessionId) return;

    getFavoriteTvShows(userSessionData?.userInfo?.id, userSessionData.sessionId, page)
      .then(newTvShows =>
        setTvShows(prev => (page === 1 ? newTvShows : mergeTvShowsData(newTvShows, prev?.results)))
      )
      .catch(e => toast.error(e.message))
      .finally(() => setIsLoading(false));
  }, [page, userSessionData?.sessionId, userSessionData?.userInfo?.id]);

  useEffect(() => {
    fetchTvShows();
  }, [fetchTvShows, page]);

  return (
    <MainLayout
      contentContainerTestId={locators.favoritesPageContainer}
      flexDirection="column"
      alignItems="center"
      gap="20px">
      <CssGrid>
        {tvShows &&
          tvShows.results?.map(t => (
            <Card
              key={t.id}
              name={t.name}
              imageUrl={t.backdrop_path || t.poster_path || undefined}
              navigationLink={tvShowDetailsRoute.replace(":id", t.id.toString())}
            />
          ))}
      </CssGrid>
      {isLoading && <Loader />}
      <Waypoint
        onEnter={() => {
          !isLoading && tvShows?.total_results !== tvShows?.results.length && setPage(page + 1);
        }}
      />
    </MainLayout>
  );
};

export default FavoritesPage;
