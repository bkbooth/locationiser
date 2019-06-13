import React, { useEffect, useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../components/Auth';
import { getRandomLocation, useMap } from '../components/Map';
import PageWrapper from '../components/PageWrapper';
import { PrimaryButton } from '../components/styles/Button';
import { Error } from '../components/styles/Error';
import { Heading } from '../components/styles/Heading';
import { Input, InputGroup, Label } from '../components/styles/Input';
import { useTextInput } from '../utils/useTextInput';

function Signup({ history }) {
  const auth = useAuth();
  const map = useMap();
  const nameInput = useTextInput('');
  const emailInput = useTextInput('');
  const passwordInput = useTextInput('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const { lat, lng, zoom } = getRandomLocation();
    map.setView([lat, lng], zoom);
  }, [map]);

  function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    auth
      .handleSignup(nameInput.value, emailInput.value, passwordInput.value)
      .then(() => history.push('/'))
      .catch(err => setErrorMessage(err.message))
      .then(() => setIsLoading(false));
  }

  return (
    <PageWrapper>
      {auth.isLoading ? (
        <p>
          <FontAwesomeIcon icon={faSpinner} spin={true} /> Loading...
        </p>
      ) : auth.isAuthenticated ? (
        <Redirect to="/" />
      ) : (
        <>
          <Heading>Signup for an account</Heading>
          <form onSubmit={handleSubmit}>
            {errorMessage && <Error>{errorMessage}</Error>}
            <InputGroup>
              <Label htmlFor="name">Name</Label>
              <Input {...nameInput} type="text" id="name" name="name" />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="email">Email</Label>
              <Input {...emailInput} type="email" id="email" name="email" />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="password">Password</Label>
              <Input {...passwordInput} type="password" id="password" name="password" />
            </InputGroup>
            <InputGroup>
              <PrimaryButton type="submit" disabled={isLoading}>
                Sign{isLoading ? 'ing up' : 'up'}
              </PrimaryButton>
            </InputGroup>
          </form>
          <p>
            Already have an account? Please <Link to="/login">login</Link>.
          </p>
        </>
      )}
    </PageWrapper>
  );
}

export default withRouter(Signup);
