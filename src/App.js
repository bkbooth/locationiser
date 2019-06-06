import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components/macro';
import Auth from './components/Auth';
import Navbar from './components/Navbar';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    margin: 0;
    padding: 0;
  }
`;

const Main = styled.div`
  padding: 20px 30px;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Auth>
        <Router>
          <Navbar />
          <Main>
            <Suspense fallback={<p>Loading...</p>}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route component={NotFound} />
              </Switch>
            </Suspense>
          </Main>
        </Router>
      </Auth>
    </>
  );
}

export default App;
