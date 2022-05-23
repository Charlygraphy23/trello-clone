import React from 'react';

const MemberSelection = () => (
  <div className='memberSelection my-3'>
    <input type='text' placeholder='Search members' />

    <p className='memberSelection__title'>Board Members</p>

    <div className='d-flex align-items-center memberSelection__body'>
      <div className='body__container'>
        <div className='avatar__div'>DB</div>
        <p>Dipta Biswas</p>

        <i className='bi bi-check-lg memberSelection__check' />
      </div>
    </div>
  </div>
);

export default MemberSelection;
