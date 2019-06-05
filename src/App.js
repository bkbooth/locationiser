import React from 'react';
import styled, { createGlobalStyle } from 'styled-components/macro';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import Home from './pages/Home';

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
        <Navbar />
        <Main>
          <Home />
        </Main>
      </Auth>
    </>
  );
}

export default App;
