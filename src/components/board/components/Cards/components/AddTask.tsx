/* eslint-disable react/button-has-type */
import '../style.scss';

type AddTaskType = {
  // eslint-disable-next-line no-unused-vars
  setShowAddCard: (args: any) => void;
};

const AddTask = ({ setShowAddCard }: AddTaskType) => (
  <div className='addTask__body'>
    <textarea name='' id='' />
    <div className='d-flex align-items-center'>
      <button>Add Card</button>
      <i onClick={() => setShowAddCard({})} className='bi bi-x-lg' />
    </div>
  </div>
);

export default AddTask;
