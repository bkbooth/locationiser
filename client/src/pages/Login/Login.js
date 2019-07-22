import React, { useEffect, useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn, faSpinnerThird } from '@fortawesome/pro-solid-svg-icons';
import { theme } from 'utils/theme';
import { useTextInput } from 'utils/useTextInput';
import { useAuth } from 'components/Auth';
import Loader from 'components/Loader';
import { getRandomLocation, setMapInteractive, useMap } from 'components/Map';
import PageWrapper from 'components/PageWrapper';
import { PrimaryButton } from 'components/styles/Button';
import { Error } from 'components/styles/Error';
import { Heading } from 'components/styles/Heading';
import { Input, InputGroup, Label } from 'components/styles/Input';

function Login({ history, location }) {
  const auth = useAuth();
  const { map } = useMap();
  const emailInput = useTextInput('');
  const passwordInput = useTextInput('');
  const [errorMessage, setErrorMessage] = useState('');
  const [hasFocusedInput, setHasFocusedInput] = useState(false);

  useEffect(() => {
    const { lat, lng, zoom } = getRandomLocation();
    map.setView([lat, lng], zoom);
    setMapInteractive(map, false);
  }, [map]);

  function handleSubmit(event) {
    event.preventDefault();

    auth
      .handleLogin(emailInput.value, passwordInput.value)
      .then(() => history.push(new URLSearchParams(location.search).get('redirectTo') || '/'))
      .catch(err => setErrorMessage(err.message));
  }

  function handleRefFocus(element) {
    if (element && !hasFocusedInput) {
      element.focus();
      setHasFocusedInput(true);
    }
  }

  return auth.isLoading ? (
    <Loader />
  ) : auth.isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <PageWrapper>
      <Heading size="lg">Login to your account</Heading>
      <form onSubmit={handleSubmit}>
        {errorMessage && <Error>{errorMessage}</Error>}
        <InputGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            {...emailInput}
            type="email"
            id="email"
            name="email"
            placeholder="eg. jsnow@stark.com"
            ref={handleRefFocus}
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            {...passwordInput}
            type="password"
            id="password"
            name="password"
            placeholder="eg. iheartgh0st"
          />
        </InputGroup>
        <InputGroup style={{ marginTop: theme.sizes.md, marginBottom: theme.sizes.md }}>
          <PrimaryButton type="submit" disabled={auth.isAuthenticating}>
            {auth.isAuthenticating ? (
              <>
                <FontAwesomeIcon icon={faSpinnerThird} spin={true} /> Logging in
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faSignIn} /> Login
              </>
            )}
          </PrimaryButton>
        </InputGroup>
      </form>
      <p>
        Don't have an account? Please{' '}
        <Link to={{ pathname: '/signup', search: location.search || null }}>signup</Link>.
      </p>
    </PageWrapper>
  );
}

export default withRouter(Login);
