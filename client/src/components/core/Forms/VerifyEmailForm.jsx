import { React, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../../../services/operations/AuthApi';

function VerifyEmailForm() {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser(otp, navigate));
    setOtp('');
  };

  return (
    <form className="w-full flex flex-col gap-4 " onSubmit={handleSubmit}>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderInput={(props) => <input {...props} />}
        inputStyle={{
          width: '48px',
          height: '58px',
          border: '1px solid #2C2F45',
          borderRadius: '0.5rem',
          backgroundColor: '#1A1C2B',
          color: '#F1F1F1',
          fontSize: '1.5rem',
          fontWeight: '600',
          textAlign: 'center',
          padding: 0,
          margin: 0,
          outline: 'none',
          boxSizing: 'border-box',
        }}
        containerStyle={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '1rem',
          width: '100%',
        }}
        isInputNum={true}
        shouldAutoFocus={true}
      />

      <button className="bg-yellow-50 w-full h-12 rounded-xl mt-4 text-richblack-900 font-semibold">
        Verify OTP
      </button>
    </form>
  );
}

export default VerifyEmailForm;
