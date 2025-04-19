import React from 'react';
import signup from '../assets/Images/signup.webp';
import Template from '../components/common/Template';
import SignUpForm from '../components/core/Forms/SignUpForm';
import { useSelector } from 'react-redux';
import Spinner from '../components/common/Spinner';

function Signup() {
  const { loader } = useSelector((state) => state.auth);
  return loader ? (
    <Spinner />
  ) : (
    <div>
      <Template
        heading={'Join the millions learning to code with StudyNotion for free'}
        content1={'Build skills for today, tomorrow, and beyond. '}
        content2={'Education to future-proof your career.'}
        Form={<SignUpForm />}
        photo={signup}
      />
    </div>
  );
}

export default Signup;
