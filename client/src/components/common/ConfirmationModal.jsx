import React from 'react';
import IconButton from './IconButton';

function ConfirmationModal({ modalData }) {
  console.log(modalData);
  return (
    <div className="backdrop-blur-md fixed inset-0 flex items-center justify-center bg-richblack-500/10">
      <div className="min-w-[20%] flex flex-col items-center justify-center gap-4 bg-richblack-900 p-6 rounded-lg border-2 border-richblack-700">
        <h1 className="text-2xl text-richblack-5 font-semibold">
          {modalData.heading}
        </h1>
        <p className="text-lg text-richblack-200">{modalData.description}</p>
        <div className="flex gap-4">
          <IconButton
            text={modalData?.text1}
            onClick={modalData?.onClick1}
            customClass={modalData?.customClass1}
          />
          <IconButton
            text={modalData?.text2}
            onClick={modalData?.onClick2}
            customClass={modalData?.customClass2}
          />
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
