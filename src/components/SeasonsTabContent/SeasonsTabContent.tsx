import React, { useContext } from "react";

import { useRecoilState } from "recoil";

import { CssGrid, FlexGrid } from "../atoms";
import Card from "../Card";
import SeenAll from "../SeenAll";
import UserSessionContext from "~/contexts/UserSessionContext";
import { seasonDetailsRoute } from "~/navigation/routes";
import { viewedSeasons } from "~/state/ViewedAtom";

const SeasonsTabContent: React.FC = () => {
  const { userSessionData } = useContext(UserSessionContext);
  const [viewed] = useRecoilState(viewedSeasons);

  const userId = userSessionData?.userInfo?.id;
  if (!userId) {
    return <SeenAll count={0} />;
  }

  const userViewedTvShows = viewed[userId];

  return (
    <FlexGrid flexDirection="column" margin="10px 0" gap="20px">
      <CssGrid>
        {userViewedTvShows?.map(t => (
          <Card
            key={t.seasonId}
            name={`${t.showName}-${t.seasonName}`}
            imageUrl={t.imagePath}
            navigationLink={seasonDetailsRoute
              .replace(":id", t.showId.toString())
              .replace(":seasonId", t.seasonNumber)}
          />
        ))}
      </CssGrid>
      <SeenAll count={userViewedTvShows?.length} />
    </FlexGrid>
  );
};

export default SeasonsTabContent;
