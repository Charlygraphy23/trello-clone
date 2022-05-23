import { ColumnType } from 'interfaces/board.interface';

type AddTaskButtonType = {
  // eslint-disable-next-line no-unused-vars
  setShowAddCard: (args: ColumnType | undefined) => any;
  column: ColumnType | undefined;
};

const AddTaskButton = ({ setShowAddCard, column }: AddTaskButtonType) => (
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  <div className='add__task' onClick={() => setShowAddCard(column)}>
    <i className='bi bi-plus-lg' />
    <p>Add a card</p>
  </div>
);

export default AddTaskButton;
