import React from "react";
import { assets } from "../../assets/assets";

const Navbar2 = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-[#000435]">
      <div className="flex items-center space-x-2">
        <img src={assets.logo} className="w-10" />
        <div className="text-xl sm:text-3xl text-white">
          <h3>
            Expence<span className="font-semibold">Sync</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Navbar2;
