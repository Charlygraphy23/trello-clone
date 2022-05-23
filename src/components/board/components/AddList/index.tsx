import React, { useState } from 'react';
import AddListBody from './AddListBody';

const AddList = () => {
  const [listName, setListName] = useState('');
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

        {show && <AddListBody show={show} hide={hide} />}
      </div>
    </div>
  );
};

export default AddList;
