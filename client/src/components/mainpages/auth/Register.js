import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...user }),
      });
      // console.log(response);
      const data = await response.json();
      console.log(data);
      // localStorage.setItem('firstLogin', true);
      // console.log(data);
      // window.location.href = '/';
    } catch (err) {
      // alert(err.response.data.msg);
      console.log('error', err);
    }
  };

  return (
    <div className='login-page'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          required
          placeholder='name'
          value={user.name}
          onChange={onChangeInput}
        />
        <input
          type='email'
          name='email'
          required
          placeholder='email'
          value={user.email}
          onChange={onChangeInput}
        />
        <input
          type='password'
          name='password'
          required
          placeholder='password'
          value={user.password}
          onChange={onChangeInput}
        />

        <div className='row'>
          <button type='submit'> Register</button>
          <Link to='/login'>Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
