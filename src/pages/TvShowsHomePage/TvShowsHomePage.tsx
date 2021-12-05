import React, { useEffect, useState, useCallback } from "react";

import { toast } from "react-toastify";
import { Waypoint } from "react-waypoint";

import { fetchPopularTvShows, searchTvShows } from "~/api/services/TvShowsService";
import { CssGrid, MainLayout } from "~/components/atoms";
import Card from "~/components/Card";
import Input from "~/components/Input";
import Loader from "~/components/Loader";
import SeenAll from "~/components/SeenAll";
import { tvShowDetailsRoute } from "~/navigation/routes";
import locators from "~/testUtils/locators";
import { TvShowsData } from "~/types";
import { mergeTvShowsData } from "~/utils/mergeTvShowsData";

const TvShowsHomePage = (): JSX.Element => {
  const [searchCriteria, setSearchCriteria] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [tvShows, setTvShows] = useState<TvShowsData>();

  const fetchTvShows = useCallback(() => {
    setIsLoading(true);
    (!searchCriteria ? fetchPopularTvShows(page) : searchTvShows(page, searchCriteria))
      .then(newTvShows =>
        setTvShows(prev => (page === 1 ? newTvShows : mergeTvShowsData(newTvShows, prev?.results)))
      )
      .catch(e => toast.error(e.message))
      .finally(() => setIsLoading(false));
  }, [page, searchCriteria]);

  useEffect(() => {
    if (!!searchCriteria) {
      setTvShows(undefined);
      setPage(1);
    }
  }, [searchCriteria]);

  useEffect(() => {
    fetchTvShows();
  }, [fetchTvShows, page, searchCriteria]);

  return (
    <MainLayout
      contentContainerTestId={locators.searchTvShowsPageContainer}
      flexDirection="column"
      alignItems="center"
      gap="20px">
      <Input
        type="text"
        placeholder="TV show name"
        value={searchCriteria}
        onTextChange={setSearchCriteria}
      />
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
      {!isLoading && tvShows?.total_results === tvShows?.results.length && (
        <SeenAll count={tvShows?.results.length} />
      )}
    </MainLayout>
  );
};

export default TvShowsHomePage;
