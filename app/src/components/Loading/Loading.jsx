import React from 'react';

function Loading() {
  return (
    <>
      <h2 className='text-xl text-center color-current rounded-full mb-2 font-semibold' style={{ color: 'rgb(0, 162, 151)' }}>Loading</h2>
      <div className='flex justify-center'>
        <div className='h-4 w-4 bg-current rounded-full mr-1 animate-bounce'></div>
        <div className='h-4 w-4 bg-current rounded-full mr-1 animate-bounce'></div>
        <div className='h-4 w-4 bg-current rounded-full animate-bounce'></div>
      </div>
    </>
  );
};

export default Loading;