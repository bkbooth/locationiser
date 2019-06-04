import React from 'react';
import styled from 'styled-components/macro';

const Header = styled.header`
  background: black;
  color: white;
  display: flex;
  flex: 1;
  align-items: center;
  padding: 0 30px;
`;

const Title = styled.h1`
  flex-grow: 1;
`;

function Navbar() {
  return (
    <Header>
      <Title>🗺 Locationiser</Title>
    </Header>
  );
}

export default Navbar;
