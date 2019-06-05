import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { AuthContext } from '../components/Auth';
import Emoji, { emojis } from '../components/Emoji';
import { useTextInput } from '../utils/useTextInput';

function Login({ history }) {
  const auth = useContext(AuthContext);
  const emailInput = useTextInput('');
  const passwordInput = useTextInput('');

  function handleSubmit(event) {
    event.preventDefault();
    auth.handleLogin(emailInput.value, passwordInput.value).then(() => history.push('/'));
  }

  return auth.isLoading ? (
    <p>
      <Emoji emoji={emojis.waiting} /> Loading...
    </p>
  ) : auth.isAuthenticated ? (
    <p>
      You are already logged in. Back to <Link to="/">home</Link>.
    </p>
  ) : (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input {...emailInput} type="email" id="email" name="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input {...passwordInput} type="password" id="password" name="password" />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
}

export default withRouter(Login);
