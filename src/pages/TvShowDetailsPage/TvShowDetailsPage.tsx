import React, { useContext, useEffect, useState } from "react";

import { useLocation } from "react-router";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import styled, { useTheme } from "styled-components";

import { getTvShowById, getTvShowStatusById } from "~/api/services/TvShowsService";
import { markAsFavorite } from "~/api/services/UserService";
import {
  Button,
  FlexGrid,
  H1,
  H2,
  MainLayout,
  NavLinkWithoutDecoration,
  Paragraph
} from "~/components/atoms";
import FavoriteButton from "~/components/FavoriteButton";
import Notes from "~/components/Notes";
import { imageEndpoint } from "~/constants/Config";
import UserSessionContext from "~/contexts/UserSessionContext";
import { seasonDetailsRoute } from "~/navigation/routes";
import { viewedTvShows } from "~/state/ViewedAtom";
import { TvShowDetails } from "~/types";
import { SavedTvShow } from "~/types/SavedTvShow";

const StyledImage = styled.img`
  object-fit: cover;
  box-sizing: border-box;
`;

const TvShowDetailsPage: React.FC = () => {
  const location = useLocation();
  const { userSessionData } = useContext(UserSessionContext);
  const tvShowId = location.pathname.split("/")[2];
  const [tvShow, setTvShow] = useState<TvShowDetails>();
  const [isFavorite, setIsFavorite] = useState(false);
  const theme = useTheme();
  const [viewed, setViewed] = useRecoilState(viewedTvShows);

  useEffect(() => {
    getTvShowById(+tvShowId)
      .then(setTvShow)
      .catch(e => toast.error(e.status_message));
    if (!userSessionData?.sessionId) return;
    getTvShowStatusById(+tvShowId, userSessionData.sessionId)
      .then(result => setIsFavorite(result.favorite))
      .catch(e => toast.error(e.status_message));
  }, [tvShowId, userSessionData?.sessionId]);

  const genres = tvShow?.genres.map(g => g.name).join(", ");
  const handleOnFavoriteClick = () => {
    if (!userSessionData?.userInfo?.id || !userSessionData?.sessionId) return;
    markAsFavorite(
      userSessionData?.userInfo?.id,
      +tvShowId,
      !isFavorite,
      userSessionData.sessionId,
      "tv"
    ).then(() => setIsFavorite(!isFavorite));
  };

  const handleAddToViewed = () => {
    if (!userSessionData?.userInfo?.id || !tvShow) return;
    const id = userSessionData?.userInfo?.id;
    const previouslyViewed = viewed[id] || [];

    const showToSave: SavedTvShow = {
      showId: tvShow.id,
      showName: tvShow.name,
      imagePath: tvShow.poster_path || tvShow.backdrop_path
    };

    setViewed({
      [id]: [...new Map([...previouslyViewed, showToSave].map(v => [v.showId, v])).values()]
    });
  };

  return (
    <MainLayout>
      {tvShow && (
        <FlexGrid flex="1" flexDirection="column" gap="10px">
          <FlexGrid alignItems="center" gap="10px" justifyContent="space-between">
            <H1 margin="0px">{tvShow.name}</H1>
            <FlexGrid justifyContent="flex-end" gap="10px">
              <FavoriteButton onClick={handleOnFavoriteClick} isFavorite={isFavorite} />
              <Button onClick={handleAddToViewed}>Mark as viewed</Button>
            </FlexGrid>
          </FlexGrid>
          <Paragraph>Genres: {genres}</Paragraph>
          <H2 margin="0px">Overview</H2>
          <Paragraph>{tvShow.overview}</Paragraph>
          <StyledImage
            loading="lazy"
            src={`${imageEndpoint}w500/${tvShow.backdrop_path || tvShow.poster_path}`}
          />
          <H2 margin="0px">Seasons</H2>
          {tvShow.seasons.map(s => (
            <NavLinkWithoutDecoration
              key={s.name}
              to={seasonDetailsRoute
                .replace(":id", tvShowId)
                .replace(":seasonId", s.season_number.toString())}>
              <FlexGrid
                border={`1px solid ${theme.secondaryBackgroundColor}`}
                flexDirection="column">
                <Paragraph>{s.name}</Paragraph>
                <Paragraph>Episodes count: {s.episode_count}</Paragraph>
              </FlexGrid>
            </NavLinkWithoutDecoration>
          ))}
          <Notes mediaId={tvShow.id} mediaType="show" />
        </FlexGrid>
      )}
    </MainLayout>
  );
};

export default TvShowDetailsPage;
