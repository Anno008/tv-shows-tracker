import React from "react";

import { Heart } from "react-feather";
import styled, { useTheme } from "styled-components";

const StyledHeart = styled(Heart)`
  cursor: pointer;
  transform: scale(1);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.3);
  }
`;

type Props = {
  isFavorite?: boolean;
  onClick: () => void;
};

const FavoriteButton: React.FC<Props> = ({ isFavorite, onClick }) => {
  const theme = useTheme();

  return (
    <StyledHeart
      onClick={onClick}
      color={isFavorite ? theme.primaryTextColor : theme.errorColor}
      fill={isFavorite ? theme.errorColor : theme.primaryTextColor}
    />
  );
};

export default FavoriteButton;
