import { keyframes } from "styled-components";

const animation = keyframes`
  0% {
    opacity: 0;
    margin-left: -10px;
  }

  100% {
    opacity: 1;
    margin-left: 0px;
  }
`;

const timingFunction = "ease-in-out";

export default { animation, timingFunction };
