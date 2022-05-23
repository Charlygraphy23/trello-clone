import { LabelSelectionType } from 'interfaces';
import React from 'react';
import ChangeLabelSection from './ChangeLabelSection';
import DropDown from './DropDown';

const LabelSelection = ({ clickOnEdit = false }: LabelSelectionType) => (
  <div className='labelSelection my-3'>
    <input type='text' placeholder='Search Labels...' />

    <p className='labelSelection__title'>Labels</p>

    <div
      className='d-flex labelSelection__body w-100'
      style={{ flexDirection: 'column' }}
    >
      <div className='labelSelection__container'>
        {clickOnEdit ? (
          <DropDown
            title='Change label'
            buttonId='Labels-edit-button1'
            buttonText='Labels'
            className='w-100'
            buttonClass='labelSelection__button'
          >
            <ChangeLabelSection />
          </DropDown>
        ) : (
          <button type='button' className='labelSelection__button'>
            Label
          </button>
        )}
        <DropDown
          title='Change label'
          buttonId='Labels-edit-button1'
          buttonText={<i className='bi bi-pencil labelSelection__edit' />}
          buttonClass='labelSelection__editButton'
        >
          <ChangeLabelSection />
        </DropDown>
      </div>

      <DropDown
        title='Change label'
        buttonId='Labels-create-button1'
        buttonText='Create a new label'
        className='w-100'
      >
        <ChangeLabelSection create />
      </DropDown>
    </div>
  </div>
);

export default LabelSelection;
