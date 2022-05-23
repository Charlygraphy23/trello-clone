import DropDown from 'core/DropDown';
import LabelSelection from 'core/LabelSelection';

const TaskLabelsShow = () => (
  <div className=' d-flex taskLabelShow'>
    <p className='taskLabelShow__title'> Labels</p>

    <div className='d-flex align-items-center'>
      <DropDown
        title='Labels'
        buttonId='Labels-title-dropdown-button'
        buttonText='Labels'
        buttonClass='taskLabelShow__label'
      >
        <LabelSelection clickOnEdit />
      </DropDown>
      {/* <p className='taskLabelShow__label'>Trello Tip</p> */}
      <DropDown
        title='Labels'
        buttonId='Labels-add-dropdown-button'
        buttonText={<i className='bi bi-plus-lg' />}
        buttonClass='taskLabelShow__addMore'
      >
        <LabelSelection clickOnEdit />
      </DropDown>
    </div>
  </div>
);

export default TaskLabelsShow;
