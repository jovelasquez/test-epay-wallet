import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border-top-color: ${(props) => props.color || "#3498db"};
  -webkit-animation: spinner 1.5s linear infinite;
  animation: ${rotate} 1.5s linear infinite;
`;

export default Spinner;
