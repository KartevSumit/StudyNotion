import React from 'react';
import AuthTemplate from '../components/common/AuthTemplate';
import UpdatePasswordForm from '../components/core/Forms/UpdatePasswordForm';
import { useSelector } from 'react-redux';
import Spinner from '../components/common/Spinner';

function UpdatePassword() {
  const heading = 'Update Password';
  const subheading = "Almost done. Enter your new password and you're all set.";
  const { loader } = useSelector((state) => state.auth);

  return loader ? (
    <Spinner />
  ) : (
    <AuthTemplate
      heading={heading}
      subheading={subheading}
      form={<UpdatePasswordForm />}
      back={true}
      resend={false}
    />
  );
}

export default UpdatePassword;
