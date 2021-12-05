import React, { useContext } from "react";

import { useRecoilState } from "recoil";

import { CssGrid, FlexGrid } from "../atoms";
import Card from "../Card";
import SeenAll from "../SeenAll";
import UserSessionContext from "~/contexts/UserSessionContext";
import { tvShowDetailsRoute } from "~/navigation/routes";
import { viewedTvShows } from "~/state/ViewedAtom";

const TvShowsTabContent: React.FC = () => {
  const { userSessionData } = useContext(UserSessionContext);
  const [viewed] = useRecoilState(viewedTvShows);

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
            key={t.showId}
            name={t.showName}
            imageUrl={t.imagePath}
            navigationLink={tvShowDetailsRoute.replace(":id", t.showId.toString())}
          />
        ))}
      </CssGrid>
      <SeenAll count={userViewedTvShows?.length} />
    </FlexGrid>
  );
};

export default TvShowsTabContent;
