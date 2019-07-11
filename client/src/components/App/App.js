import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components/macro';
import { theme } from 'utils/theme';
import Auth from 'components/Auth';
import Loader from 'components/Loader';
import Map from 'components/Map';
import GlobalStyle from 'components/styles/GlobalStyle';

const Home = lazy(() => import('pages/Home'));
const Login = lazy(() => import('pages/Login'));
const Signup = lazy(() => import('pages/Signup'));
const NotFound = lazy(() => import('pages/NotFound'));

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Router>
          <Map>
            <Auth>
              <Suspense fallback={<Loader />}>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/pin/:pinId" component={Home} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Signup} />
                  <Route component={NotFound} />
                </Switch>
              </Suspense>
            </Auth>
          </Map>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
