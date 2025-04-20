import React from 'react';
import AuthTemplate from '../components/common/AuthTemplate';
import VerifyEmailForm from '../components/core/Forms/VerifyEmailForm';
import { useSelector } from 'react-redux';
import Spinner from '../components/common/Spinner';

function VerifyEmail() {
  const { loading } = useSelector((state) => state.auth);
  const heading = 'Verify email';
  const subheading =
    'A verification code has been sent to you. Enter the code below';
  return loading ? (
    <Spinner />
  ) : (
    <AuthTemplate
      heading={heading}
      subheading={subheading}
      form={<VerifyEmailForm />}
      back={false}
      resend={true}
    />
  );
}

export default VerifyEmail;
