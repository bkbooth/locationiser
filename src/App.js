import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components/macro';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import SuspenseFallback from './components/SuspenseFallback';
import GlobalStyle from './components/styles/GlobalStyle';
import { theme } from './utils/theme';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Auth>
          <Router>
            <Navbar />
            <Suspense fallback={<SuspenseFallback />}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route component={NotFound} />
              </Switch>
            </Suspense>
          </Router>
        </Auth>
      </ThemeProvider>
    </>
  );
}

export default App;
