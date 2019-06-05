import React, { useContext, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components/macro';
import { AuthContext } from '../components/Auth';
import { useTextInput } from '../utils/useTextInput';

const Error = styled.p`
  color: red;
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

  return auth.isAuthenticated ? (
    <p>
      You are already logged in. Back to <Link to="/">home</Link>.
    </p>
  ) : (
    <form onSubmit={handleSubmit}>
      {errorMessage && <Error>{errorMessage}</Error>}
      <div>
        <label htmlFor="email">Email</label>
        <input {...emailInput} type="email" id="email" name="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input {...passwordInput} type="password" id="password" name="password" />
      </div>
      <div>
        <button type="submit" disabled={isLoading}>
          Log{isLoading ? 'ging in' : 'in'}
        </button>
      </div>
    </form>
  );
}

export default withRouter(Login);
