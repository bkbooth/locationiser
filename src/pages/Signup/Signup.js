import React, { useEffect, useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinnerThird, faUserPlus } from '@fortawesome/pro-solid-svg-icons';
import { theme } from 'utils/theme';
import { useTextInput } from 'utils/useTextInput';
import { useAuth } from 'components/Auth';
import { getRandomLocation, useMap } from 'components/Map';
import PageWrapper from 'components/PageWrapper';
import { PrimaryButton } from 'components/styles/Button';
import { Error } from 'components/styles/Error';
import { Heading } from 'components/styles/Heading';
import { Input, InputGroup, Label } from 'components/styles/Input';

function Signup({ history }) {
  const auth = useAuth();
  const { map } = useMap();
  const nameInput = useTextInput('');
  const emailInput = useTextInput('');
  const passwordInput = useTextInput('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const { lat, lng, zoom } = getRandomLocation();
    map.setView([lat, lng], zoom);
  }, [map]);

  function handleSubmit(event) {
    event.preventDefault();

    auth
      .handleSignup(nameInput.value, emailInput.value, passwordInput.value)
      .then(() => history.push('/'))
      .catch(err => setErrorMessage(err.message));
  }

  return (
    <PageWrapper>
      {auth.isLoading ? (
        <p>
          <FontAwesomeIcon icon={faSpinnerThird} spin={true} /> Loading...
        </p>
      ) : auth.isAuthenticated ? (
        <Redirect to="/" />
      ) : (
        <>
          <Heading size="lg">Signup for an account</Heading>
          <form onSubmit={handleSubmit}>
            {errorMessage && <Error>{errorMessage}</Error>}
            <InputGroup>
              <Label htmlFor="name">Name</Label>
              <Input {...nameInput} type="text" id="name" name="name" placeholder="eg. Jon Snow" />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                {...emailInput}
                type="email"
                id="email"
                name="email"
                placeholder="eg. jsnow@stark.com"
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
                    <FontAwesomeIcon icon={faSpinnerThird} spin={true} /> Signing up
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faUserPlus} /> Signup
                  </>
                )}
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
