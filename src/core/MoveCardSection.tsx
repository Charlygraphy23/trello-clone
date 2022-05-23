import React from 'react';
import DropDown from './DropDown';

const MoveCardSection = () => (
  <div className='moveCardSection my-3'>
    <p className='moveCardSection__title'>Select Destination</p>

    <DropDown
      title='Select Destination'
      buttonId='select-destination-button'
      buttonClass='moveCardSection__select'
      className='moveCardSection__select'
      hideTitle
      buttonText={
        <div className='moveCardSectionSelect__title'>
          <p className='title'>Title</p>
          <p className='listName'>List</p>
        </div>
      }
    >
      <div className='moveCardSectionSelect__body'>
        <p className='title'>Diptas Workspace</p>
        <div className='moveCardSectionSelect__list'>
          <p className='list__item'>Diptas Workspace</p>
        </div>
      </div>
    </DropDown>

    <div className='d-flex align-items-center w-100'>
      <DropDown
        title='Select List'
        buttonId='select-destination-button'
        buttonClass='moveCardSection__select'
        className='moveCardSection__select'
        hideTitle
        style={{ flex: 1, marginRight: '10px' }}
        buttonText={
          <div className='moveCardSectionSelect__title'>
            <p className='title'>List</p>
            <p className='listName'>To Do</p>
          </div>
        }
      >
        <div className='moveCardSectionSelect__body'>
          <div className='moveCardSectionSelect__list'>
            <p className='list__item'>To Do</p>
          </div>
        </div>
      </DropDown>

      <DropDown
        title='Select Position'
        buttonId='select-destination-button'
        buttonClass='moveCardSection__select'
        className='moveCardSection__select'
        hideTitle
        style={{ minWidth: '80px' }}
        buttonText={
          <div className='moveCardSectionSelect__title'>
            <p className='title'>Position</p>
            <p className='listName'>1</p>
          </div>
        }
      >
        <div className='moveCardSectionSelect__body'>
          <div className='moveCardSectionSelect__list'>
            <p className='list__item'>1 (Current)</p>
          </div>
        </div>
      </DropDown>
    </div>
  </div>
);

export default MoveCardSection;
