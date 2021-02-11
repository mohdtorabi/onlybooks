import { useState, useEffect } from 'react';
import axios from 'axios';
import './NewUser.scss';

export default function NewUser() {
  const [account, setAccount] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
  });
  console.log(account);
  const [error, setError] = useState('');

  useEffect(() => {
    const passwordError = (password, password2) => {
      if (password !== password2) {
        setError('Password mismatch');
      } else if (password === password2) {
        setError('');
      }
    };
    passwordError(account.password, account.password2);
  }, [error, setError]);

  const firstNameOnChange = (event) => {
    setAccount({
      ...account,
      firstName: event.target.value,
    });
  };

  const lastNameOnChange = (event) => {
    setAccount({
      ...account,
      lastName: event.target.value,
    });
  };

  const emailOnChange = (event) => {
    setAccount({
      ...account,
      email: event.target.value,
    });
  };

  const passwordOnChange = (event) => {
    setAccount({
      ...account,
      password: event.target.value,
    });
  };

  const password2OnChange = (event) => {
    setAccount({
      ...account,
      password2: event.target.value,
    });
  };

  const create = (event) => {
    event.preventDefault();

    const data = {
      first_name: account.firstName,
      last_name: account.lastName,
      email: account.email,
      password: account.password,
      password2: account.password2,
    };
    console.log(data);
    const URL = `http://localhost:8080/api/user/`;
    const promise = axios
      .post(URL, data)
      .then((response) => {
        console.log(response);
        if (response.data === 'exists') {
          setError('Email already used');
          console.log("exist");
        }

        if (response.data === 'mismatch') {
          setError('Password mismatch');
        }
        if (response.data.email) {
          setError('');
          setAccount({
            ...account,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            password2: '',
          });
        }
      })
      .then({})
      .catch();

    return promise;
  };

  return (
    <section className="new-user">
      <form className="new-user-form" method="POST" action="/login">
        <h3>First Name:</h3>
        <input
          type="text"
          className="new-user-name"
          required
          name="lastName"
          value={account.firstName}
          onChange={firstNameOnChange}
        />
        <h3>Last Name:</h3>
        <input
          type="text"
          className="new-user-name"
          required
          name="firstName"
          value={account.lastName}
          onChange={lastNameOnChange}
        />
        <h3>Email:</h3>
        <input
          type="email"
          className="new-user-email"
          required
          name="email"
          value={account.email}
          onChange={emailOnChange}
        />
        <h3>Password:</h3>
        <input
          type="password"
          minLength="6"
          className="new-user-password"
          required
          name="password"
          value={account.password}
          onChange={passwordOnChange}
        />
        <h3>Re-enter Password:</h3>
        <input
          type="password"
          minLength="6"
          className="new-user-password"
          required
          name="password2"
          value={account.password2}
          onChange={password2OnChange}
        />
        <button onClick={create} type="submit" className="new-user-button">
          Submit
        </button>
      </form>
      {error ? <div id="error">{error}</div> : null}
    </section>
  );
}
