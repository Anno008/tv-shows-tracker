import React from "react";

import { ChevronRight } from "react-feather";
import { NavLink } from "react-router-dom";
import styled, { useTheme } from "styled-components";

import { FlexGrid } from "~/components/atoms";
import { Sweep } from "~/components/atoms/Animations";

type Props = {
  segments: {
    to: string;
    title: string;
  }[];
};

const BreadcrumbLink = styled(NavLink)`
  ${({ color }) => color && `color: ${color}`};
  text-decoration: none;
  transition: all 0.5s ease-in;
  animation: ${Sweep.animation} 0.2s ${Sweep.timingFunction};
`;

const Breadcrumbs: React.FC<Props> = ({ segments }) => {
  const theme = useTheme();
  return (
    <FlexGrid>
      {segments.map((b, ind) => {
        const last = segments.length === ind + 1;
        return (
          <FlexGrid key={b.to}>
            <BreadcrumbLink
              color={last ? theme.primaryTextColor : theme.secondaryTextColor}
              to={b.to}>
              {b.title}
            </BreadcrumbLink>
            {last ? null : <ChevronRight color={theme.secondaryTextColor} size={18} />}
          </FlexGrid>
        );
      })}
    </FlexGrid>
  );
};

export default Breadcrumbs;
