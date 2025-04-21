import React, { useState } from 'react';
import AuthTemplate from '../components/common/AuthTemplate';
import ForgotPasswordForm from '../components/core/Forms/ForgotPasswordForm';
import { useSelector } from 'react-redux';
import Spinner from '../components/common/Spinner';

function ForgotPassword() {
  const { loading, emailSent, email } = useSelector((state) => state.auth);

  const heading = emailSent ? 'Check Email' : 'Reset your password';
  const subheading = emailSent
    ? `We have sent a reset email to ${email}`
    : "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email we can try account recovery.";

  return loading ? (
    <Spinner />
  ) : (
    <AuthTemplate
      heading={heading}
      subheading={subheading}
      form={<ForgotPasswordForm />}
      back={true}
      resend={false}
    />
  );
}

export default ForgotPassword;
