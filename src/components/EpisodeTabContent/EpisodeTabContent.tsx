import React, { useContext } from "react";

import { useRecoilState } from "recoil";

import { CssGrid, FlexGrid } from "../atoms";
import Card from "../Card";
import SeenAll from "../SeenAll";
import UserSessionContext from "~/contexts/UserSessionContext";
import { episodeDetailsRoute } from "~/navigation/routes";
import { viewedEpisodes } from "~/state/ViewedAtom";

const EpisodeTabContent: React.FC = () => {
  const { userSessionData } = useContext(UserSessionContext);
  const [viewed] = useRecoilState(viewedEpisodes);

  const userId = userSessionData?.userInfo?.id;
  if (!userId) {
    return <SeenAll count={0} />;
  }

  const userViewedEpisodes = viewed[userId];

  return (
    <FlexGrid flexDirection="column" margin="10px 0" gap="20px">
      <CssGrid>
        {userViewedEpisodes?.map(t => (
          <Card
            key={t.seasonId}
            name={`${t.showName}-${t.seasonName}-${t.episodeName}`}
            imageUrl={t.imagePath}
            navigationLink={episodeDetailsRoute
              .replace(":id", t.showId.toString())
              .replace(":seasonId", t.seasonNumber)
              .replace(":episodeId", t.episodeNumber.toString())}
          />
        ))}
      </CssGrid>
      <SeenAll count={userViewedEpisodes?.length} />
    </FlexGrid>
  );
};

export default EpisodeTabContent;
