import React, { useEffect, useState } from 'react';
import { config, useTransition } from 'react-spring';
import worldMapEmoji from 'assets/world-map-emoji.png';
import { theme } from 'utils/theme';
import * as S from './PageWrapper.styles';

function PageWrapper({ children }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const transitions = useTransition(isMounted, null, {
    from: { opacity: 0, transform: `translateY(-${theme.sizes.xl})` },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: `translateY(${theme.sizes.xl})` },
    config: config.gentle,
  });

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <S.CenterPage style={props} key={key}>
          <S.Header>
            <S.Title>
              <S.Logo src={worldMapEmoji} alt="world map emoji" />
              locations
            </S.Title>
          </S.Header>
          <S.ContentWrapper>{children}</S.ContentWrapper>
        </S.CenterPage>
      )
  );
}

export default PageWrapper;
