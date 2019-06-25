import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerPlus } from '@fortawesome/pro-solid-svg-icons';
import L from 'leaflet';
import { createPin } from 'api/pins';
import { PrimaryButton, WhiteButton } from 'components/styles/Button';
import { Input, InputGroup, Label, TextArea } from 'components/styles/Input';
import { theme } from 'utils/theme';
import { useTextInput } from 'utils/useTextInput';
import { newPinIcon } from './icons';
import { useMap } from './MapContext';
import * as S from './CreatePin.styles';

function CreatePin({ isAddingPin, setIsAddingPin, onSavePin }) {
  const { map } = useMap();
  const [newPinMarker, setNewPinMarker] = useState(null);
  const titleInput = useTextInput('');
  const descriptionInput = useTextInput('');

  useEffect(() => {
    if (!map) return;
    if (newPinMarker) {
      newPinMarker.remove();
      setNewPinMarker(null);
    }
    if (isAddingPin) {
      const marker = L.marker(map.getCenter(), {
        icon: newPinIcon,
        title: 'New pin',
        zIndexOffset: 1000,
        draggable: true,
      }).addTo(map);
      setNewPinMarker(marker);
      titleInput.resetValue();
      descriptionInput.resetValue();
    }
  }, [map, isAddingPin]); // eslint-disable-line

  function resetForm() {
    setIsAddingPin(false);
    titleInput.resetValue();
    descriptionInput.resetValue();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const pin = await createPin({
      title: titleInput.value,
      description: descriptionInput.value,
      ...newPinMarker.getLatLng(),
    });
    onSavePin(pin);
    resetForm();
  }

  function handleCancel(event) {
    event.preventDefault();
    resetForm();
  }

  const isDisabled = !(newPinMarker && titleInput.value && descriptionInput.value);

  return (
    <S.Wrapper isShowing={isAddingPin}>
      <S.Heading>Create new pin</S.Heading>
      <p>
        Drag <FontAwesomeIcon icon={faMapMarkerPlus} color={theme.colours.positive['500']} /> marker
        on map to desired location
      </p>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="title">Title</Label>
          <Input {...titleInput} type="text" id="title" name="title" />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="description">Description</Label>
          <TextArea {...descriptionInput} rows="3" id="description" name="description" />
        </InputGroup>
        <S.ButtonGroup>
          <PrimaryButton type="submit" disabled={isDisabled}>
            Create
          </PrimaryButton>
          <WhiteButton onClick={handleCancel}>Cancel</WhiteButton>
        </S.ButtonGroup>
      </form>
    </S.Wrapper>
  );
}

export default CreatePin;
