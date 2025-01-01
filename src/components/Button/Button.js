import React from "react";

const Button = ({ text, onClick, blue, disabled }) => {
  return (
    <>
      <div
        className={`text-center my-6 mx-0 p-2 border border-[#000435] cursor-pointer flex items-center justify-center h-auto 
      ${
        blue
          ? "bg-[#000435] text-white hover:bg-white hover:text-[#000435]"
          : "text-[#000435]"
      }
      hover:text-white hover:bg-[#000435] hover:transition-all hover:duration-300`}
        disabled={disabled}
        onClick={onClick}
      >
        {text}
      </div>
    </>
  );
};

export default Button;
