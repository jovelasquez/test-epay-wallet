import React from "react";
import { Route } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Container, Content } from "../../components/Container";

const PageLayout = ({ children }) => (
  <React.Fragment>
    <Navbar />
    <Container>
      <Content>{children}</Content>
    </Container>
  </React.Fragment>
);

const PageLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <PageLayout>
          <Component {...matchProps} />
        </PageLayout>
      )}
    />
  );
};

export default PageLayoutRoute;
