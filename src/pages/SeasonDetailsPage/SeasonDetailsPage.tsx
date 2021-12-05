import React, { useContext, useEffect, useState } from "react";

import { useLocation } from "react-router";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { useTheme } from "styled-components";

import { getSeasonById, getTvShowById } from "~/api/services/TvShowsService";
import {
  Button,
  FlexGrid,
  H1,
  H2,
  MainLayout,
  NavLinkWithoutDecoration,
  Paragraph
} from "~/components/atoms";
import Breadcrumbs from "~/components/Breadcrumbs";
import Notes from "~/components/Notes";
import UserSessionContext from "~/contexts/UserSessionContext";
import { episodeDetailsRoute, seasonDetailsRoute, tvShowDetailsRoute } from "~/navigation/routes";
import { viewedSeasons } from "~/state/ViewedAtom";
import { SeasonDetails, TvShowDetails } from "~/types";
import { SavedSeasonDetails } from "~/types/SavedSeasonDetails";

const SeasonDetailsPage: React.FC = () => {
  const location = useLocation();
  const { userSessionData } = useContext(UserSessionContext);
  const tvShowId = location.pathname.split("/")[2];
  const sessionId = location.pathname.split("/")[4];
  const [viewed, setViewed] = useRecoilState(viewedSeasons);
  const [season, setSeason] = useState<SeasonDetails>();
  const [tvShow, setTvShow] = useState<TvShowDetails>();
  const theme = useTheme();

  useEffect(() => {
    getTvShowById(+tvShowId)
      .then(setTvShow)
      .catch(e => toast.error(e.status_message));
    getSeasonById(+tvShowId, +sessionId)
      .then(setSeason)
      .catch(e => toast.error(e.status_message));
  }, [sessionId, tvShowId]);

  const handleAddToViewed = () => {
    if (!userSessionData?.userInfo?.id || !tvShow || !season) return;
    const id = userSessionData?.userInfo?.id;
    const previouslyViewed = viewed[id] || [];

    const seasonToStore: SavedSeasonDetails = {
      imagePath: season.poster_path || tvShow.poster_path || tvShow.backdrop_path || undefined,
      seasonName: season.name,
      seasonNumber: season.season_number.toString(),
      showId: tvShow.id,
      showName: tvShow.name,
      seasonId: season.id
    };
    setViewed({
      [id]: [...new Map([...previouslyViewed, seasonToStore].map(v => [v.seasonId, v])).values()]
    });
  };

  return (
    <MainLayout>
      {season && tvShow && (
        <FlexGrid gap="10px" flexDirection="column" flex="1">
          <Breadcrumbs
            segments={[
              { to: tvShowDetailsRoute.replace(":id", tvShow.id.toString()), title: tvShow?.name },
              {
                to: seasonDetailsRoute
                  .replace(":id", tvShow.id.toString())
                  .replace(":seasonId", season.season_number.toString()),
                title: season.name
              }
            ]}
          />
          <FlexGrid justifyContent="space-between">
            <H1 margin="0px">{tvShow?.name}</H1>
            <Button onClick={handleAddToViewed}>Mark as viewed</Button>
          </FlexGrid>
          <H2 margin="0px">{season.name}</H2>
          <H2 margin="0px">Episodes:</H2>
          {season.episodes.map(e => (
            <NavLinkWithoutDecoration
              key={e.id}
              to={episodeDetailsRoute
                .replace(":id", tvShowId)
                .replace(":seasonId", sessionId)
                .replace(":episodeId", e.episode_number.toString())}>
              <FlexGrid
                border={`1px solid ${theme.secondaryBackgroundColor}`}
                key={e.id}
                flexDirection="column"
                gap="10px">
                <Paragraph margin="0px">Episode: {e.episode_number}</Paragraph>
                <Paragraph margin="0px">Name: {e.name}</Paragraph>
              </FlexGrid>
            </NavLinkWithoutDecoration>
          ))}
          <Notes mediaType="season" mediaId={season.id} />
        </FlexGrid>
      )}
    </MainLayout>
  );
};

export default SeasonDetailsPage;
