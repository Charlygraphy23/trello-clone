import React from 'react';
import { ScaleLoader } from 'react-spinners';

const ComponentLoader = () => (
  <div className='d-flex justify-content-center align-items-center'>
    <ScaleLoader color='#0079bf' loading />
  </div>
);

export default ComponentLoader;
