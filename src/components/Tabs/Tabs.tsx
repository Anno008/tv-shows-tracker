import React, { useState, ReactNode } from "react";

import styled, { useTheme } from "styled-components";

import { FlexGrid, Paragraph } from "~/components/atoms";

const TabItem = styled(FlexGrid)<{ active?: boolean; onClick: () => void }>`
  justify-content: center;
  margin: 4px 4px 0;
  flex: 1;
  width: "100%";
  ${({ active, theme }) =>
    `border-bottom: 4px solid ${active ? theme.primaryTextColor : theme.secondaryTextColor}`};
  transition: border-bottom 0.2s ease-out;
  border-radius: 2px;
`;

interface TabItemProps {
  title: string;
  content: ReactNode;
}

interface Props {
  tabs: TabItemProps[];
}

const Tabs = ({ tabs }: Props): JSX.Element => {
  const theme = useTheme();

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleSetActiveTab = (index: number) => {
    setActiveTabIndex(index);
  };

  return (
    <FlexGrid width="100%" flexDirection="column">
      <FlexGrid>
        {tabs.map((t, ind) => (
          <TabItem
            flexDirection="column"
            active={ind === activeTabIndex}
            onClick={() => handleSetActiveTab(ind)}
            key={t.title}>
            <FlexGrid>
              <Paragraph
                color={ind === activeTabIndex ? theme.primaryTextColor : theme.secondaryTextColor}>
                {t.title}
              </Paragraph>
            </FlexGrid>
          </TabItem>
        ))}
      </FlexGrid>
      {tabs[activeTabIndex].content}
    </FlexGrid>
  );
};

export default Tabs;
