import React from 'react';
import { useTransition } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faShareAlt, faTrashAlt } from '@fortawesome/pro-solid-svg-icons';
import { BottomWrapper } from 'components/styles/BottomWrapper';
import { PrimaryButton, WhiteButton } from 'components/styles/Button';
import { Heading } from 'components/styles/Heading';
import { useMap } from './MapContext';
import * as S from './ManagePin.styles';

function ManagePin() {
  const { selectedPin } = useMap();

  const isShowingTransitions = useTransition(selectedPin, null, {
    from: { opacity: 0, transform: 'translateY(110%)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(110%)' },
  });

  return isShowingTransitions.map(
    ({ item, props, key }) =>
      item && (
        <BottomWrapper style={props} key={key}>
          <Heading size="sm">Manage pin</Heading>
          <S.ButtonGroup>
            <PrimaryButton>
              <FontAwesomeIcon icon={faShareAlt} /> Share
            </PrimaryButton>
            <PrimaryButton>
              <FontAwesomeIcon icon={faEdit} /> Edit
            </PrimaryButton>
            <WhiteButton>
              <FontAwesomeIcon icon={faTrashAlt} /> Delete
            </WhiteButton>
          </S.ButtonGroup>
        </BottomWrapper>
      )
  );
}

export default ManagePin;
