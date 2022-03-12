import TextAreaCombo from 'core/TextAreaCombo';
import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  // eslint-disable-next-line prettier/prettier
  useState
} from 'react';
import CardProgress from './components/CardProgress';
import CheckListItems from './components/CheckListItems';

const CheckList = () => {
  const TextAreaComboIds = useMemo(
    () => ({
      textarea: 'CheckList_text',
      submitButton: 'CheckList_submit',
    }),
    []
  );

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
        clearAll();
        setShowNewItemCheckList(value);
      }
    },
    [clearAll]
  );

  const handleAddItemCheckList = useCallback(() => {
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

  const handleEvent = useCallback(
    (e) => {
      const hasId = [
        TextAreaComboIds.submitButton,
        TextAreaComboIds.textarea,
      ].includes(e.target?.id);
      handleItemCheckList(hasId);
      console.log(hasId);
    },
    [
      TextAreaComboIds.submitButton,
      TextAreaComboIds.textarea,
      handleItemCheckList,
    ]
  );

  useLayoutEffect(() => {
    document.addEventListener('click', handleEvent, true);

    return () => {
      document.removeEventListener('click', handleEvent, true);
    };
  }, [handleEvent]);

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
          onSubmit={handleAddItemCheckList}
          value={textareaValue}
          textAreaId={TextAreaComboIds.textarea}
          submitButtonId={TextAreaComboIds.submitButton}
        />
      )}

      {!showNewItemCheckList && (
        <div className='d-flex mt-4'>
          <button
            type='button'
            className='bg__secondary text__primary addNewItem'
            style={{ fontSize: '0.9rem' }}
            onClick={() => {
              checkListTextareaRef.current?.focus();
              handleItemCheckList(true);
            }}
          >
            Add an item
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckList;
