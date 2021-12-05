import React from "react";

import { Check } from "react-feather";
import { useTheme } from "styled-components";

import { FlexGrid, Paragraph } from "../atoms";

type Props = {
  count?: number;
};

const SeenAll: React.FC<Props> = ({ count }) => {
  const theme = useTheme();
  return (
    <FlexGrid gap="10px" alignItems="center" justifyContent="center">
      <Check size={20} color={theme.primaryTextColor} />
      <Paragraph>Seen all {count ? count : "0"} items</Paragraph>
    </FlexGrid>
  );
};

export default SeenAll;
