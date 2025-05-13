import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import IconButton from '../../components/common/IconButton';
import Spinner from '../../components/common/Spinner';
import ImagePreviewModal from '../../components/common/ImagePreviewModal';
import countryCodes from '../../data/countrycode.json';
import professions from '../../data/professions.json';
import { BiShow, BiHide } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { updateProfileImage } from '../../services/operations/ProfileApi';

function Settings() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(user);
  const { loading: authloading } = useSelector((state) => state.auth);
  const { loading: profileloading } = useSelector((state) => state.profile);
  const uploadref = useRef(null);
  const [previewImage, setPreviewImage] = useState(false);
  const [code, setCode] = useState(profile.additionalInfo.phone.slice(0, 3));
  const [phoneNumber, setPhoneNumber] = useState(
    profile.additionalInfo.phone.slice(3)
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [updatePassword, setUpdatePassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const options = ['Male', 'Female', 'Other'];

  if (authloading || profileloading) {
    return <Spinner />;
  }

  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfile({ ...profile, image: reader.result });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    console.log('File selected:', e.target.files?.[0]);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  const handleToggleCurrentPassword = () => {
    setShowCurrentPassword((prev) => !prev);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setUpdatePassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      additionalInfo: { ...profile.additionalInfo, [name]: value },
    });
  };

  const handlePhoneNumberChange = (e) => {
    const { name, value } = e.target;
    if (name === 'code') {
      setCode(value);
    } else {
      setPhoneNumber(value);
    }
    handleInfoChange({
      target: {
        name: 'phone',
        value: `${code}${' '}${phoneNumber}`,
      },
    });
  };

  const handleSubmit = () => {
    console.log('submit ', profile);
    const formData = new FormData();
    formData.append('image', profile.image);
    formData.append('email', profile.email);
    dispatch(updateProfileImage(token, formData));
  };

  return (
    <div className="w-[85%] min-h-[92vh] flex flex-col gap-10 p-12 overflow-y-auto">
      <div className="flex flex-col gap-4">
        <Link to="/dashboard/my-profile">
          <h1 className="text-richblack-300 text-sm">{'< Back'}</h1>
        </Link>
        <h1 className="text-3xl font-semibold text-richblack-5">
          Edit Profile
        </h1>
      </div>

      <div className="w-[55%] flex flex-col gap-8 ml-20">
        <div className="w-full flex bg-richblack-800 p-8 border border-richblack-600 justify-between items-start rounded-md">
          <div className="flex items-center gap-8">
            <button
              className="w-20 h-20 rounded-full overflow-hidden bg-richblack-900"
              onClick={() => setPreviewImage(true)}
            >
              <img src={profile.image} alt="" />
            </button>
            <div className="flex flex-col gap-2">
              <h1 className="text-xl text-richblack-5 font-semibold">
                Change Profile Picture
              </h1>
              <div className="flex gap-4">
                <IconButton
                  text="Change"
                  customClass="bg-yellow-50"
                  onClick={() => uploadref.current.click()}
                ></IconButton>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={uploadref}
                  onChange={handleImageChange}
                />
                <IconButton
                  text="Remove"
                  customClass="bg-richblack-700 text-richblack-300"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col bg-richblack-800 p-8 border border-richblack-600 justify-between items-start rounded-md gap-4">
          <h1 className="text-2xl text-richblack-25 font-semibold">
            Personal Information
          </h1>

          <div className="w-full flex flex-col gap-1">
            <div className="w-full flex gap-4 justify-between">
              <label className="w-[47%] text-richblack-5 flex flex-col gap-2 ">
                <h1>First Name</h1>
                <input
                  type="text"
                  name="firstName"
                  className="w-full h-12 p-3 bg-richblack-700 border border-richblack-600 rounded-xl"
                  onChange={handleInputChange}
                  value={profile.firstName}
                />
              </label>
              <label className="w-[47%] text-richblack-5 flex flex-col gap-2">
                <h1>Last Name</h1>
                <input
                  type="text"
                  name="lastName"
                  className="w-full h-12 p-3 bg-richblack-700 border border-richblack-600 rounded-xl"
                  onChange={handleInputChange}
                  value={profile.lastName}
                />
              </label>
            </div>
            <h1 className="text-sm text-richblack-300">
              Same name will be used for certificates
            </h1>
          </div>

          <div className="w-full flex gap-4 justify-between">
            <label className="w-[47%] text-richblack-5 flex flex-col gap-2 ">
              <h1>Date of Birth</h1>
              <input
                type="date"
                name="dateofBirth"
                className="w-full h-12 p-3 bg-richblack-700 border border-richblack-600 rounded-xl flex items-center justify-center"
                onChange={handleInfoChange}
                value={profile.additionalInfo.dateofBirth}
              />
            </label>
            <div className="w-[47%] text-richblack-5 flex flex-col gap-2">
              <h1>
                Gender<span className="text-pink-400">*</span>
              </h1>
              <div className="w-full h-12 p-4 bg-richblack-700 border border-richblack-600 rounded-xl flex items-center gap-8 text-lg">
                {options.map((gen) => (
                  <label key={gen} className="flex items-center gap-2">
                    <div
                      className={`flex w-5 h-5 rounded-full items-center justify-center ${
                        profile.gender === gen
                          ? 'border-2 border-yellow-50'
                          : 'border-2 border-richblack-600'
                      }`}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={gen}
                        key={gen}
                        onChange={handleInputChange}
                        checked={profile.gender === gen}
                        required
                        className={`appearance-none w-3 h-3 rounded-full cursor-pointer ${
                          profile.gender === gen
                            ? 'bg-yellow-50'
                            : 'bg-richblack-700'
                        }`}
                      />
                    </div>
                    <h1
                      className={`${
                        profile.gender === gen
                          ? 'text-richblack-5'
                          : 'text-richblack-300'
                      }`}
                    >
                      {gen}
                    </h1>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full flex gap-4 justify-between">
            <label className="w-[47%] text-richblack-5 flex flex-col gap-2">
              <h1 className="text-normal">
                Phone Number<span className="text-pink-200">*</span>
              </h1>
              <div className="w-full flex gap-4">
                <select
                  name="code"
                  className="w-1/5 h-12 p-2 bg-richblack-700 border border-richblack-600 rounded-xl text-center text-richblack-5"
                  onChange={handlePhoneNumberChange}
                  value={code}
                >
                  {countryCodes.map((code) => (
                    <option
                      key={code.country}
                      value={code.code}
                      className="text-richblack-200 w-16"
                    >
                      {code.code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  placeholder="12345 67890"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  pattern="[0-9]{10}"
                  className="w-4/5 h-12 p-3 border border-richblack-600 bg-richblack-700 rounded-xl"
                  required
                />
              </div>
            </label>
            <label className="w-[47%] text-richblack-5 flex flex-col gap-2">
              <h1>Profession</h1>
              <select
                name="profession"
                className="w-full h-12 p-3 bg-richblack-700 border border-richblack-600 rounded-xl"
                onChange={handleInfoChange}
                value={profile.additionalInfo.profession}
              >
                {professions.map((profession) => (
                  <option
                    key={profession.id}
                    value={profession.value}
                    className="text-richblack-200"
                  >
                    {profession.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="w-full text-richblack-5 flex flex-col gap-2">
            <h1>About</h1>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-3 bg-richblack-700 border border-richblack-600 rounded-xl resize-none focus:outline-yellow-50"
              placeholder="Tell us a bit about yourself..."
            />
          </label>
        </div>

        <div className="w-full flex flex-col bg-richblack-800 p-8 border border-richblack-600 justify-between items-start rounded-md gap-4">
          <h1 className="text-2xl text-richblack-25 font-semibold">
            Change Password
          </h1>
          <div className="w-full flex flex-col gap-4 text-normal ">
            <label className="w-[47%] text-richblack-5 flex flex-col gap-2 relative">
              <h1 className="">Current Password</h1>
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                placeholder="Enter current password"
                className="w-full h-12 p-4 bg-richblack-700 rounded-xl pr-12 border border-richblack-600"
                required
                name="currentPassword"
                value={updatePassword.currentPassword}
                onChange={handlePasswordChange}
              />
              <span
                className="absolute right-4 top-11 cursor-pointer"
                onClick={handleToggleCurrentPassword}
              >
                {showCurrentPassword ? (
                  <BiShow className="text-richblack-200 text-2xl" />
                ) : (
                  <BiHide className="text-richblack-200 text-2xl" />
                )}
              </span>
            </label>
            <div className="w-full flex justify-between">
              <label className="w-[47%] text-richblack-5 flex flex-col gap-2 relative">
                <h1 className="">New Password</h1>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                  className="w-full h-11 p-4 bg-richblack-700 rounded-xl pr-12 border border-richblack-600"
                  required
                  name="newPassword"
                  value={updatePassword.newPassword}
                  onChange={handlePasswordChange}
                />
                <span
                  className="absolute right-4 top-11 cursor-pointer"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? (
                    <BiShow className="text-richblack-200 text-2xl" />
                  ) : (
                    <BiHide className="text-richblack-200 text-2xl" />
                  )}
                </span>
              </label>
              <label className="w-[47%] text-richblack-5 flex flex-col gap-2 relative">
                <h1 className="text-normal">Confirm New Password</h1>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Please confirm new password"
                  className="w-full h-12 p-4 bg-richblack-700 rounded-xl pr-12 border border-richblack-600"
                  required
                  name="confirmNewPassword"
                  value={updatePassword.confirmNewPassword}
                  onChange={handlePasswordChange}
                />
                <span
                  className="absolute right-4 top-11 cursor-pointer"
                  onClick={handleToggleConfirmPassword}
                >
                  {showConfirmPassword ? (
                    <BiShow className="text-richblack-200 text-2xl" />
                  ) : (
                    <BiHide className="text-richblack-200 text-2xl" />
                  )}
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-end gap-4">
          <IconButton
            text="Cancel"
            customClass={'bg-richblack-800 text-richblack-200'}
          />
          <IconButton
            text="Save"
            customClass={'bg-yellow-50'}
            onClick={handleSubmit}
          />
        </div>

        <div className="w-full flex bg-pink-900 p-8 border border-pink-700 items-start gap-6 rounded-md">
          <div className="w-14 flex flex-col gap-4 text-normal ">
            <div className="w-14 h-14 bg-pink-700 rounded-full flex items-center justify-center">
              <RiDeleteBin6Line className="text-pink-200 text-2xl" />
            </div>
          </div>
          <div className="w-[85%] flex flex-col gap-4  ">
            <h1 className="text-lg text-pink-5 font-lg">Delete Account</h1>
            <p className="text-sm text-pink-25">
              Would you like to delete your account
            </p>
            <p className="text-sm text-pink-25">
              This account may contains Paid Courses. Deleting your account will
              remove all the contain associated with it.
            </p>
            <h1 className="text-md font-medium text-pink-500 italic">
              I want to delete my account.
            </h1>
          </div>
        </div>
      </div>

      {previewImage && (
        <ImagePreviewModal
          image={profile.image}
          setPreviewImage={setPreviewImage}
        />
      )}
    </div>
  );
}

export default Settings;
