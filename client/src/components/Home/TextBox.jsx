import React from 'react';
import HighLightText from './HighLightText';
import Button from './Button';

function TextBox({
  heading1,
  heading2,
  highlight,
  para,
  button1,
  button2,
  linkto1,
  linkto2,
}) {
  return (
    <div className="w-[37%] flex flex-col gap-8">
      <div className="text-richblack-5 font-bold text-4xl">
        <h1>
          <span>{heading1}</span>
          <HighLightText text={highlight} />
          <span>{heading2}</span>
        </h1>
      </div>
      <p className="text-richblack-200 font-semibold">{para}</p>
      <div className="w-[90%] flex items-center gap-8">
        <Button flag={true} flag2={true} text={button1} linkto={linkto1} />
        <Button flag={false} text={button2} linkto={linkto2} flag2={false} />
      </div>
    </div>
  );
}

export default TextBox;
