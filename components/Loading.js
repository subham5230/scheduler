import React from 'react';
import ReactLoading from 'react-loading';
 
const Loading = ({ type, color }) => (
  <div className='h-full -w-full flex justify-center items-center'>
    <ReactLoading type={type} color={color} height={50} width={50} />
  </div>
);
 
export default Loading;