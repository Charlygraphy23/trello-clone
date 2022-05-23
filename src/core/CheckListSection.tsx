import React from 'react';

const CheckListSection = () => (
  <div className='checklistSection my-3'>
    <p className='checklistSection__title'>Title</p>
    <input type='text' placeholder='Checklist' />

    <div className='d-flex align-items-center mt-3'>
      <button type='button' className='bg__primary text-white'>
        Add
      </button>
    </div>
  </div>
);

export default CheckListSection;
