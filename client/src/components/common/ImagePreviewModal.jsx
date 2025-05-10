import { React, useRef } from 'react';
import useOnclickOutside from '../../hooks/useOnClickOutside';

function ImagePreviewModal({ image, setPreviewImage }) {
  const imageref = useRef(null);
  useOnclickOutside(imageref, () => {
    setPreviewImage(false);
  });
  return (
    <div className="w-full h-full fixed backdrop-blur-sm bg-richblack-300/10 flex items-center justify-center left-0 top-0">
      <img ref={imageref} src={image} alt="" className="w-[30%]" />
    </div>
  );
}

export default ImagePreviewModal;
