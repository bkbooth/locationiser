import React from 'react';
import styled, { createGlobalStyle } from 'styled-components/macro';
import Navbar from './components/Navbar';

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
      <Navbar />
      <Main>
        <span role="img" aria-label="waving hand">
          👋
        </span>{' '}
        Hi there!
      </Main>
    </>
  );
}

export default App;
