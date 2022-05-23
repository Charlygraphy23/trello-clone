import React, { useEffect, useRef } from 'react';

type Props = {
  show: boolean;
  hide: () => void;
};

const AddListBody = ({ show, hide }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (show && inputRef?.current) {
      inputRef?.current.focus();
    }
  }, [show]);

  return (
    <div className='addList__form'>
      <input ref={inputRef} placeholder='Add List' />
      <div className='d-flex align-items-center'>
        <button type='button'>Add List</button>
        <i onClick={hide} className='bi bi-x-lg' />
      </div>
    </div>
  );
};

export default AddListBody;
