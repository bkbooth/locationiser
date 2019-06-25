import React from 'react';
import worldMapEmoji from 'assets/world-map-emoji.png';
import * as S from './index.styles';

function PageWrapper({ children }) {
  return (
    <S.CenterPage>
      <S.Header>
        <S.Title>
          <S.Logo src={worldMapEmoji} alt="world map emoji" />
          locations
        </S.Title>
      </S.Header>
      <S.ContentWrapper>{children}</S.ContentWrapper>
    </S.CenterPage>
  );
}

export default PageWrapper;
