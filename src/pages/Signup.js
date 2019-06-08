import React, { useContext, useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { AuthContext } from '../components/Auth';
import Emoji, { emojis } from '../components/Emoji';
import { PrimaryButton } from '../components/styles/Button';
import { Error } from '../components/styles/Error';
import { Input, InputGroup, Label } from '../components/styles/Input';
import { PageWrapper } from '../components/styles/PageWrapper';
import { useTextInput } from '../utils/useTextInput';

function Signup({ history }) {
  const auth = useContext(AuthContext);
  const nameInput = useTextInput('');
  const emailInput = useTextInput('');
  const passwordInput = useTextInput('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
          <Emoji emoji={emojis.waiting} /> Loading...
        </p>
      ) : auth.isAuthenticated ? (
        <Redirect to="/" />
      ) : (
        <>
          <h1>Signup for an account</h1>
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
