import React from "react";
import { Route, Redirect } from "react-router-dom";
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
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Route
      {...rest}
      render={(matchProps) =>
        !user && rest.path !== "/signup" ? (
          <Redirect to="/signup" />
        ) : (
          <PageLayout>
            <Component {...matchProps} />
          </PageLayout>
        )
      }
    />
  );
};

export default PageLayoutRoute;
