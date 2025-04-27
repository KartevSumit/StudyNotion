import React from 'react';

function HighLightText({ text }) {
  return (
    <span className="text-3xl lg:text-4xl font-semibold  bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent leading-[inherit]">
      {text}
    </span>
  );
}

export default HighLightText;
