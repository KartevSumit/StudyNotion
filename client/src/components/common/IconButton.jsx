import React from 'react';

function IconButton({
  text,
  onClick,
  disabled,
  children,
  outline = false,
  customClass,
  type,
}) {
  return (
    <button
      className="inline-block text-sm lg:text-lg"
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children ? (
        <span
          className={` w-fit px-3 py-2 rounded-lg font-semibold shadow-[inset_-2px_-2px_0_0_rgba(255,255,255,0.51)] hover:scale-95 flex items-center gap-2 ${customClass}`}
        >
          {text}
          {children}
        </span>
      ) : (
        <span
          className={` w-fit px-3 py-2 rounded-lg font-semibold shadow-[inset_-2px_-2px_0_0_rgba(255,255,255,0.51)] hover:scale-95 flex items-center gap-2 ${customClass}`}
        >
          {text}
        </span>
      )}
    </button>
  );
}

export default IconButton;
