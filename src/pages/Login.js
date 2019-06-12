import React, { useEffect, useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { useAuth } from '../components/Auth';
import Emoji, { emojis } from '../components/Emoji';
import { getRandomLocation, setMapInteractive, useMap } from '../components/Map';
import { PrimaryButton } from '../components/styles/Button';
import { Error } from '../components/styles/Error';
import { Heading } from '../components/styles/Heading';
import { Input, InputGroup, Label } from '../components/styles/Input';
import { PageWrapper } from '../components/styles/PageWrapper';
import { useTextInput } from '../utils/useTextInput';

function Login({ history }) {
  const auth = useAuth();
  const map = useMap();
  const emailInput = useTextInput('');
  const passwordInput = useTextInput('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const { lat, lng, zoom } = getRandomLocation();
    map.setView([lat, lng], zoom);
    setMapInteractive(map, false);
  }, [map]);

  function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    auth
      .handleLogin(emailInput.value, passwordInput.value)
      .then(() => history.push('/'))
      .catch(err => setErrorMessage(err.message))
      .then(() => setIsLoading(false));
  }

  return (
    <PageWrapper>
      {auth.isLoading ? (
        <p>
          <Emoji emoji={emojis.waiting} /> Loading...
        </p>
      ) : auth.isAuthenticated ? (
        <Redirect to="/" />
      ) : (
        <>
          <Heading>Login to your account</Heading>
          <form onSubmit={handleSubmit}>
            {errorMessage && <Error>{errorMessage}</Error>}
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
                Log{isLoading ? 'ging in' : 'in'}
              </PrimaryButton>
            </InputGroup>
          </form>
          <p>
            Don't have an account? Please <Link to="/signup">signup</Link>.
          </p>
        </>
      )}
    </PageWrapper>
  );
}

export default withRouter(Login);
