import React from 'react';
import login from '../assets/Images/login.webp';
import Template from '../components/common/Template';
import LoginForm from '../components/Login/LoginForm';

function Login() {
  return (
    <Template
      heading={'Welcome Back!'}
      content1={'Build skills for today, tomorrow, and beyond. '}
      content2={'Education to future-proof your career.'}
      Form={<LoginForm />}
      photo={login}
    />
  );
}

export default Login;
