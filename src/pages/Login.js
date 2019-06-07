import React, { useContext, useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import styled from 'styled-components/macro';
import { AuthContext } from '../components/Auth';
import Emoji, { emojis } from '../components/Emoji';
import { PrimaryButton } from '../components/styles/Button';
import { Error } from '../components/styles/Error';
import { Input, InputGroup, Label } from '../components/styles/Input';
import { useTextInput } from '../utils/useTextInput';

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.sizes.lg} ${({ theme }) => theme.sizes.md};
  *:first-child {
    margin-top: ${({ theme }) => theme.sizes.nil};
  }
  *:last-child {
    margin-bottom: ${({ theme }) => theme.sizes.nil};
  }
`;

function Login({ history }) {
  const auth = useContext(AuthContext);
  const emailInput = useTextInput('');
  const passwordInput = useTextInput('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
    <Wrapper>
      {auth.isLoading ? (
        <p>
          <Emoji emoji={emojis.waiting} /> Loading...
        </p>
      ) : auth.isAuthenticated ? (
        <Redirect to="/" />
      ) : (
        <>
          <h1>Login to your account</h1>
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
    </Wrapper>
  );
}

export default withRouter(Login);
