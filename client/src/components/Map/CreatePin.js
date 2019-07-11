import React, { useEffect, useState } from 'react';
import { useTransition } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faCheck,
  faMapMarkerPlus,
  faSpinnerThird,
  faTimes,
} from '@fortawesome/pro-solid-svg-icons';
import L from 'leaflet';
import { createPin } from 'api/pins';
import { theme } from 'utils/theme';
import { useTextInput } from 'utils/useTextInput';
import { BottomWrapper } from 'components/styles/BottomWrapper';
import { PrimaryButton, WhiteButton } from 'components/styles/Button';
import { Heading } from 'components/styles/Heading';
import { Input, InputGroup, Label, TextArea } from 'components/styles/Input';
import { newPinIcon } from './icons';
import { useMap } from './MapContext';
import * as S from './ManagePin.styles';

const CREATE_PIN_STEPS = { moveMarker: 0, enterDetails: 1 };

function CreatePin({ onSavePin }) {
  const { addPin, isAddingPin, stopAddingPin, map } = useMap();
  const [newPinLatLng, setNewPinLatLng] = useState(null);
  const [newPinMarker, setNewPinMarker] = useState(null);
  const [step, setStep] = useState(CREATE_PIN_STEPS.moveMarker);
  const [isSaving, setIsSaving] = useState(false);
  const titleInput = useTextInput('');
  const descriptionInput = useTextInput('');

  useEffect(() => {
    if (!map) return;
    map.on('click', event => {
      if (map.dragging.enabled()) {
        setNewPinLatLng(event.latlng);
        addPin();
      }
    });
  }, [map]); // eslint-disable-line

  useEffect(() => {
    if (!map) return;
    if (newPinMarker) {
      newPinMarker.remove();
      setNewPinMarker(null);
    }
    if (isAddingPin) {
      const marker = L.marker(newPinLatLng || map.getCenter(), {
        icon: newPinIcon,
        title: 'New pin',
        zIndexOffset: 1000,
        draggable: true,
      }).addTo(map);
      setNewPinMarker(marker);
      titleInput.resetValue();
      descriptionInput.resetValue();
      setStep(CREATE_PIN_STEPS.moveMarker);
    }
  }, [map, isAddingPin]); // eslint-disable-line

  const isShowingTransitions = useTransition(isAddingPin, null, {
    from: { opacity: 0, transform: 'translateY(110%)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(110%)' },
  });

  function resetForm() {
    stopAddingPin();
    setNewPinLatLng(null);
    titleInput.resetValue();
    descriptionInput.resetValue();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSaving(true);
    const pin = await createPin({
      ...newPinMarker.getLatLng(),
      zoom: map.getZoom(),
      title: titleInput.value,
      description: descriptionInput.value,
    });
    onSavePin(pin);
    setIsSaving(false);
    resetForm();
  }

  function handleContinue() {
    setStep(step + 1);
  }

  function handleCancel(event) {
    event.preventDefault();
    resetForm();
  }

  const isDisabled = isSaving || !(newPinMarker && titleInput.value);

  function renderStep(step) {
    switch (step) {
      case CREATE_PIN_STEPS.moveMarker:
        return (
          <>
            <p>
              Drag <FontAwesomeIcon icon={faMapMarkerPlus} color={theme.colours.positive['500']} />{' '}
              marker on map to desired location
            </p>
            <S.ButtonGroup>
              <PrimaryButton onClick={handleContinue}>
                <FontAwesomeIcon icon={faArrowRight} /> Continue
              </PrimaryButton>
              <WhiteButton onClick={handleCancel}>
                <FontAwesomeIcon icon={faTimes} /> Cancel
              </WhiteButton>
            </S.ButtonGroup>
          </>
        );
      case CREATE_PIN_STEPS.enterDetails:
        return (
          <form onSubmit={handleSubmit}>
            <InputGroup>
              <Label htmlFor="title">Title</Label>
              <Input {...titleInput} type="text" id="title" name="title" placeholder="eg. Home" />
            </InputGroup>
            <InputGroup>
              <Label
                htmlFor="description"
                style={{ alignSelf: 'flex-start', marginTop: theme.sizes.sm }}
              >
                Description
              </Label>
              <TextArea
                {...descriptionInput}
                rows="2"
                id="description"
                name="description"
                placeholder="eg. This is where I live"
              />
            </InputGroup>
            <S.ButtonGroup>
              <PrimaryButton type="submit" disabled={isDisabled}>
                {isSaving ? (
                  <FontAwesomeIcon icon={faSpinnerThird} spin={true} />
                ) : (
                  <FontAwesomeIcon icon={faCheck} />
                )}{' '}
                Creat{isSaving ? 'ing' : 'e'}
              </PrimaryButton>
              <WhiteButton onClick={handleCancel} disabled={isSaving}>
                <FontAwesomeIcon icon={faTimes} /> Cancel
              </WhiteButton>
            </S.ButtonGroup>
          </form>
        );
      default:
        return null;
    }
  }

  return isShowingTransitions.map(
    ({ item, props, key }) =>
      item && (
        <BottomWrapper style={props} key={key}>
          <Heading size="sm">Create new pin</Heading>
          {renderStep(step)}
        </BottomWrapper>
      )
  );
}

export default CreatePin;
