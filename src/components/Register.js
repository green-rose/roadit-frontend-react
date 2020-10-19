import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/Context';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Spinner from './Spinner';

export const Register = (props) => {
  const context = useContext(Context);

  const {
    register,
    loading,
    error,
    clearErrors,
    isAuthenticated,
    setAlert,
  } = context;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    username: '',
    password: '',
    password2: '',
  });

  const { username, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (username === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({
        username,
        password,
      });
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-success'>Register</span>
      </h1>
      <Form onSubmit={onSubmit}>
        <Form.Group as={Row}>
          <Form.Label column sm={2} htmlFor='username'>
            Username:
          </Form.Label>
          <Col sm={6}>
            <Form.Control
              id='username'
              type='text'
              name='username'
              placeholder='Email'
              value={username}
              onChange={onChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2} htmlFor='password'>
            Password:
          </Form.Label>
          <Col sm={6}>
            <Form.Control
              id='password'
              type='password'
              name='password'
              placeholder='Password'
              value={password}
              onChange={onChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2} htmlFor='password2'>
            Confirm password:
          </Form.Label>
          <Col sm={6}>
            <Form.Control
              id='password2'
              type='password'
              name='password2'
              placeholder='Confirm password'
              value={password2}
              onChange={onChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm={{ span: 6, offset: 2 }}>
            <Button className='btn btn-success' type='submit'>
              Register
            </Button>
          </Col>
        </Form.Group>
      </Form>
      <p>
        <Link to='/login' className='btn btn-light'>
          Already registered?
        </Link>
      </p>
    </div>
  );
};

export default Register;
