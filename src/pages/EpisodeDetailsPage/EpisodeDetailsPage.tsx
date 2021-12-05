import React, { useContext, useEffect, useState } from "react";

import { useLocation } from "react-router";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";

import { getEpisodeById, getSeasonById, getTvShowById } from "~/api/services/TvShowsService";
import { Button, FlexGrid, H1, MainLayout, Paragraph } from "~/components/atoms";
import Breadcrumbs from "~/components/Breadcrumbs";
import Notes from "~/components/Notes";
import UserSessionContext from "~/contexts/UserSessionContext";
import { episodeDetailsRoute, seasonDetailsRoute, tvShowDetailsRoute } from "~/navigation/routes";
import { viewedEpisodes } from "~/state/ViewedAtom";
import { EpisodeDetails, SeasonDetails, TvShowDetails } from "~/types";
import { SavedEpisodeDetails } from "~/types/SavedEpisodeDetails";

const EpisodeDetailsPage: React.FC = () => {
  const location = useLocation();
  const { userSessionData } = useContext(UserSessionContext);

  const tvShowId = location.pathname.split("/")[2];
  const seasonNumber = location.pathname.split("/")[4];
  const episodeNumber = location.pathname.split("/")[6];
  const [episode, setEpisode] = useState<EpisodeDetails>();
  const [tvShow, setTvShow] = useState<TvShowDetails>();
  const [season, setSeason] = useState<SeasonDetails>();
  const [viewed, setViewed] = useRecoilState(viewedEpisodes);

  useEffect(() => {
    getEpisodeById(+tvShowId, +seasonNumber, +episodeNumber)
      .then(setEpisode)
      .catch(e => toast.error(e.status_message));
    getTvShowById(+tvShowId)
      .then(setTvShow)
      .catch(e => toast.error(e.status_message));
    getSeasonById(+tvShowId, +seasonNumber)
      .then(setSeason)
      .catch(e => toast.error(e.status_message));
  }, [episodeNumber, seasonNumber, tvShowId]);

  const handleAddToViewed = () => {
    if (!userSessionData?.userInfo?.id || !tvShow || !season || !episode) return;
    const id = userSessionData?.userInfo?.id;
    const previouslyViewed = viewed[id] || [];

    const episodeToStore: SavedEpisodeDetails = {
      imagePath: season.poster_path || tvShow.backdrop_path || tvShow.poster_path || undefined,
      seasonName: season.name,
      seasonNumber: season.season_number.toString(),
      showId: tvShow.id,
      showName: tvShow.name,
      seasonId: season.id,
      episodeName: episode.name,
      episodeNumber: episode.episode_number,
      episodeId: episode.id
    };
    setViewed({
      [id]: [...new Map([...previouslyViewed, episodeToStore].map(v => [v.seasonId, v])).values()]
    });
  };

  return (
    <MainLayout>
      {episode && tvShow && season && (
        <FlexGrid gap="10px" flexDirection="column" flex="1">
          <Breadcrumbs
            segments={[
              { to: tvShowDetailsRoute.replace(":id", tvShow.id.toString()), title: tvShow?.name },
              {
                to: seasonDetailsRoute
                  .replace(":id", tvShow.id.toString())
                  .replace(":seasonId", season.season_number.toString()),
                title: season.name
              },
              {
                to: episodeDetailsRoute
                  .replace(":id", tvShowId)
                  .replace(":seasonId", seasonNumber)
                  .replace(":episodeId", episode.episode_number.toString()),
                title: episode.name
              }
            ]}
          />
          <FlexGrid justifyContent="space-between">
            <H1 margin="0px">{episode.name}</H1>
            <Button onClick={handleAddToViewed}>Mark as viewed</Button>
          </FlexGrid>
          <Paragraph>Overview: {episode.overview}</Paragraph>
          <Notes mediaType="episode" mediaId={episode.id} />
        </FlexGrid>
      )}
    </MainLayout>
  );
};

export default EpisodeDetailsPage;
