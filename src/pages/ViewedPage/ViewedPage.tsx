import React from "react";

import { MainLayout } from "~/components/atoms";
import EpisodeTabContent from "~/components/EpisodeTabContent";
import SeasonsTabContent from "~/components/SeasonsTabContent";
import Tabs from "~/components/Tabs";
import TvShowsTabContent from "~/components/TvShowsTabContent";

const ViewedPage: React.FC = () => (
  <MainLayout flexDirection="column" alignItems="center">
    <Tabs
      tabs={[
        { title: "TV shows", content: <TvShowsTabContent /> },
        { title: "Seasons", content: <SeasonsTabContent /> },
        { title: "Episodes", content: <EpisodeTabContent /> }
      ]}
    />
  </MainLayout>
);

export default ViewedPage;
