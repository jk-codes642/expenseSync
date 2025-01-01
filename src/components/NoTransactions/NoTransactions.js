import React from 'react'
import { assets } from '../../assets/assets'

const NoTransactions = () => {
  return (
    <div className='flex justify-center items-center w-full flex-col mb-8'>
      <img src={assets.noTransactionImage} className='w-[400px] m-16' />
      <p className='text-center text-lg mb-16' >You have no transactions currently. Start by adding your first one!</p>
    </div>
  )
}

export default NoTransactions
