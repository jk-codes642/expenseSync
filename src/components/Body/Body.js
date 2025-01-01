import React from "react";
import {assets} from '../../assets/assets'

const Body = () => {
  return (
    <div className='mt-52 mb-52'>
      <h1 className='text-6xl text-center'>
        Your personal finance tracker, <h1 className='text-8xl mt-4'>Expense<span className='font-semibold text-[#222fba]'>Sync</span></h1>
      </h1>
      
      <div className='m-24 shadow-2xl'>
        <img src={assets.mainImage} alt="" />
      </div>
    </div>
  );
};

export default Body;
