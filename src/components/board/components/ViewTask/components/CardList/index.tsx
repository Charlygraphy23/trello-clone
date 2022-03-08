import TextAreaCombo from 'core/TextAreaCombo';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import CardProgress from './components/CardProgress';
import CheckListItems from './components/CheckListItems';

const CheckList = () => {
  // eslint-disable-next-line no-undef
  const blurRef = useRef<NodeJS.Timeout>(null);
  const [showNewItemCheckList, setShowNewItemCheckList] = useState(false);
  const checkListTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [checkListData, setCheckListData] = useState<any[]>([]);
  const [textareaValue, setTextareaValue] = useState('');

  const clearAll = useCallback(() => {
    setTextareaValue('');
  }, []);

  const handleItemCheckList = useCallback(
    (value: boolean) => {
      if (value === true) {
        setShowNewItemCheckList(value);
      } else {
        // @ts-expect-error
        blurRef.current = setTimeout(() => {
          setShowNewItemCheckList(value);
          clearAll();
        }, 100);
      }
    },
    [clearAll]
  );

  const handleAddItemCheckList = useCallback(() => {
    if (blurRef.current) clearTimeout(blurRef.current);
    checkListTextareaRef.current?.focus();

    if (!textareaValue) return;
    const tempData = {
      id: Date.now(),
      value: textareaValue,
    };

    setCheckListData((prevState) => [...prevState, tempData]);
    handleItemCheckList(false);
  }, [handleItemCheckList, textareaValue]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTextareaValue(e.target.value);
    },
    []
  );

  useEffect(() => {
    if (showNewItemCheckList && checkListTextareaRef.current)
      checkListTextareaRef.current.focus();
  }, [showNewItemCheckList]);

  return (
    <div className='checkList'>
      <div className='d-flex justify-content-between align-items-center mb-2'>
        <p className='checkList__title'>Check List</p>
        <button
          type='button'
          className='bg__secondary text__primary'
          style={{ fontSize: '0.9rem' }}
        >
          Delete
        </button>
      </div>

      <CardProgress />

      {checkListData.length > 0 &&
        checkListData.map((list) => (
          <CheckListItems key={list?.id} data={list} />
        ))}

      {showNewItemCheckList && (
        <TextAreaCombo
          className='mt-2'
          placeholder='Add an item'
          ref={checkListTextareaRef}
          buttonText='Add'
          onChange={handleChange}
          onBlurCapture={() => handleItemCheckList(false)}
          onClose={() => handleItemCheckList(false)}
          onSubmit={handleAddItemCheckList}
          value={textareaValue}
        />
      )}

      {!showNewItemCheckList && (
        <div className='d-flex mt-4'>
          <button
            type='button'
            className='bg__secondary text__primary addNewItem'
            style={{ fontSize: '0.9rem' }}
            onClick={() => handleItemCheckList(true)}
          >
            Add an item
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckList;
