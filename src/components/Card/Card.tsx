import React, { useState } from "react";

import { Image } from "react-feather";
import styled, { css, useTheme } from "styled-components";

import { FlexGrid, NavLinkWithoutDecoration, Paragraph } from "~/components/atoms";
import { imageEndpoint } from "~/constants/Config";

const borderRadius = "20px";

const imageStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  border-radius: ${borderRadius};
  box-sizing: border-box;
  transition: all 0.35s ease-in-out;

  &&:hover {
    transform: scale(1.2);
  }
`;

const StyledImage = styled.img`
  ${imageStyle}
`;

const StyledPlaceholder = styled(Image)`
  transform: scale(0.6);
  ${imageStyle}
  &&:hover {
    transform: scale(1);
  }
`;

type Props = {
  name: string;
  imageUrl?: string;
  navigationLink: string;
};

const Card: React.FC<Props> = ({ name, imageUrl, navigationLink }) => {
  const [failedToLoadImage, setFailedToLoadImage] = useState(false);
  const theme = useTheme();

  return (
    <NavLinkWithoutDecoration to={navigationLink}>
      <FlexGrid
        flexDirection="column"
        position="relative"
        height="280px"
        overflow="hidden"
        borderRadius={borderRadius}
        useBoxShadow>
        <Paragraph margin="10px" bold zIndex="1" useTextShadow>
          {name}
        </Paragraph>
        {imageUrl && !failedToLoadImage ? (
          <StyledImage
            loading="lazy"
            src={`${imageEndpoint}w500/${imageUrl}`}
            onError={() => setFailedToLoadImage(true)}
          />
        ) : (
          <StyledPlaceholder color={theme.primaryTextColor} />
        )}
      </FlexGrid>
    </NavLinkWithoutDecoration>
  );
};

export default Card;
