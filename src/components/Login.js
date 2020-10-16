import React, { useState, useContext, useEffect } from 'react';
import Context from '../context/Context';

const Login = props => {
  const context = useContext(Context);

  const { login, error, clearErrors, isAuthenticated } = context;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'Invalid Credentials') {
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const { username, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (username === '' || password === '') {
    
    } else {
      login({
        username,
        password
      });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-success'>Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='username'>Username: </label>
          <input
            id='username'
            type='text'
            name='username'
            value={username}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password: </label>
          <input
            id='password'
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-outline-success'
        />
      </form>
    </div>
  );
};

export default Login;