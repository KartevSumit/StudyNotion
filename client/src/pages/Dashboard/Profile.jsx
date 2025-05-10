import { React, useState } from 'react';
import { useSelector } from 'react-redux';
import EditButton from '../../components/core/Dashboard/EditButton';
import Details from '../../components/core/Dashboard/Details';
import ImagePreviewModal from '../../components/common/ImagePreviewModal';

function Profile() {
  const { user } = useSelector((state) => state.profile);
  const [previewImage, setPreviewImage] = useState(false);
  return (
    <div className="w-[85%] min-h-[92vh] flex justify-start p-12">
      <div className="w-[55%] flex flex-col items-start gap-10">
        <h1 className="text-3xl lg:text-4xl text-richblack-5 font-semibold">
          My Profile
        </h1>
        <div className="w-full flex flex-col gap-8 ml-20">
          <div className="w-full flex bg-richblack-800 p-8 justify-between items-start rounded-md">
            <div className="flex items-center gap-4">
              <button
                className="w-20 h-20 rounded-full overflow-hidden "
                onClick={() => setPreviewImage(true)}
              >
                <img src={user.image} alt="" />
              </button>
              <div>
                <h1 className="text-xl text-richblack-25 font-semibold">
                  {user.firstName} {user.lastName}
                </h1>
                <h1 className="text-lg text-richblack-100">{user.email}</h1>
              </div>
            </div>
            <EditButton />
          </div>
          <div className="w-full flex flex-col bg-richblack-800 p-8 rounded-md gap-3">
            <div className="w-full flex justify-between items-center">
              <h1 className="ml-2 text-richblack-5 text-xl font-semibold">
                About
              </h1>
              <EditButton></EditButton>
            </div>
            <p className="ml-2 text-richblack-400 h-20">
              {user.additionalInfo.about
                ? user.additionalInfo.about
                : 'Add about section to view it'}
            </p>
          </div>
          <div className="w-full flex flex-col bg-richblack-800 p-8 rounded-md gap-3">
            <div className="w-full flex justify-between items-center">
              <h1 className="ml-2 text-richblack-5 text-xl font-semibold">
                Personal Details
              </h1>
              <EditButton></EditButton>
            </div>
            <div className="ml-2 w-full flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <Details heading="First Name" value={user.firstName}></Details>
                <Details heading="Last Name" value={user.lastName}></Details>
              </div>
              <div className="flex items-center gap-4">
                <Details heading="Email" value={user.email}></Details>
                <Details
                  heading="Phone Number"
                  value={
                    user.additionalInfo.phone
                      ? user.additionalInfo.phone
                      : 'Add Contact Number'
                  }
                ></Details>
              </div>
              <div className="flex items-center gap-4">
                <Details
                  heading="Gender"
                  value={
                    user.additionalInfo.gender
                      ? user.additionalInfo.gender
                      : 'Add Gender'
                  }
                ></Details>
                <Details
                  heading="Date of Birth"
                  value={
                    user.additionalInfo.dateofBirth
                      ? user.additionalInfo.dateofBirth
                      : 'Add Date of Birth'
                  }
                ></Details>
              </div>
            </div>
          </div>
        </div>
      </div>
      {previewImage && (
        <ImagePreviewModal
          image={user.image}
          setPreviewImage={setPreviewImage}
        />
      )}
    </div>
  );
}

export default Profile;
