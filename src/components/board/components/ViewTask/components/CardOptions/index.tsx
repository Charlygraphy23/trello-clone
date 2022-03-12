import DropDown from 'core/DropDown';
import React from 'react';

const CardOptions = () => (
  <div className='cardOptions'>
    <p className='cardOptions__title'>Add to Card</p>

    <DropDown
      title='Demo'
      buttonId='Labels-dropdown-button'
      buttonText='Labels'
      icon={<i className='bi bi-tag' />}
    >
      <h1>Hello</h1>
    </DropDown>

    <DropDown
      title='Demo'
      buttonId='Checklist-dropdown-button'
      buttonText='Checklist'
      icon={<i className='bi bi-list-check' />}
    >
      <h1>Hello</h1>
    </DropDown>

    <br />
    <p className='cardOptions__title'>Actions</p>

    <DropDown
      title='Demo'
      buttonId='Move-dropdown-button'
      buttonText='Move'
      icon={<i className='bi bi-arrow-right' />}
    >
      <h1>Hello</h1>
    </DropDown>
  </div>
);

export default CardOptions;
