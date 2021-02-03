import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Login = () => {
  const [user, setUser] = useState({
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
      const response = await fetch('http://localhost:3001/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...user }),
      });
      const data = await response.json();
      // alert(data.msg);
      localStorage.setItem('firstLogin', true);
      window.location.href = '/';
    } catch (err) {
      // alert(err.response.data.msg);
      console.log('error', err);
      // alert(err);
    }
  };

  return (
    <div className='login-page'>
      <form onSubmit={handleSubmit}>
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
          <button type='submit'> Login</button>
          <Link to='/register'>Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
