import DropDown from 'core/DropDown';

const TaskLabelsShow = () => (
  <div className=' d-flex taskLabelShow'>
    <p className='taskLabelShow__title'> Labels</p>

    <div className='d-flex align-items-center'>
      <DropDown
        title='Demo'
        buttonId='TrelloTip-dropdown-button'
        buttonText='Trello Tip'
        buttonClass='taskLabelShow__label'
      >
        <h1>Hello</h1>
      </DropDown>
      {/* <p className='taskLabelShow__label'>Trello Tip</p> */}
      <div className='taskLabelShow__addMore'>
        <i className='bi bi-plus-lg' />
      </div>
    </div>
  </div>
);

export default TaskLabelsShow;
