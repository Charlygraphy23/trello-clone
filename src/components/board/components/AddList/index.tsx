import React, { useState } from 'react';
import AddListBody from './AddListBody';

type Props = {
  boardId: string;
};

const AddList = ({ boardId }: Props) => {
  const [show, setShow] = useState(false);

  const hide = () => setShow(false);

  return (
    <div className='addList'>
      <div className='addList__body'>
        {!show && (
          <button type='button' onClick={() => setShow(true)}>
            <i className='bi bi-plus-lg' />
            <span>Add a card</span>
          </button>
        )}

        {show && <AddListBody show={show} hide={hide} boardId={boardId} />}
      </div>
    </div>
  );
};

export default AddList;
