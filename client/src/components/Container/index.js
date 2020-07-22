import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin: 0px auto 0px;

  @media (min-width: 576px) {
    max-width: 540px;
  }

  @media (min-width: 768px), @media (min-width: 992px), @media (min-width: 1200px) {
    max-width: 720px;
  }
`;

const Content = styled.div`
  background: #ffffff;

  @media (min-width: 576px) {
    margin-top: 5px;
  }

  @media (min-width: 768px), @media (min-width: 992px), @media (min-width: 1200px) {
    margin-top: 10px;
    border-radius: 0.25rem;
  }
`;

export { Container, Content };
