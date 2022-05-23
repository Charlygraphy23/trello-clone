import TextAreaCombo from 'core/TextAreaCombo';
import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  // eslint-disable-next-line prettier/prettier
  useState
} from 'react';

type CheckListItemType = {
  data: {
    id: number;
    value: string;
  };
};

const CheckListItems = ({ data }: CheckListItemType) => {
  const TextAreaComboIds = useMemo(
    () => ({
      textarea: `CheckListItems_text${data.id}`,
      submitButton: `CheckListItems_submit${data.id}`
    }),
    [data.id]
  );
  const [showTextarea, setShowTextarea] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { value: checkListName } = data;

  const handleShowTextarea = useCallback((value: boolean) => {
    if (value) {
      setShowTextarea(value);
    } else {
      setShowTextarea(value);
    }
  }, []);

  const handelSave = useCallback(() => {
    textareaRef.current?.focus();
  }, []);

  const handleListClick = useCallback(() => {
    handleShowTextarea(true);
    setTimeout(() => {
      textareaRef.current?.focus();
      textareaRef.current?.select();
    }, 100);
  }, [handleShowTextarea]);

  const handleTextAreaClick = useCallback(
    (e: React.MouseEvent<HTMLTextAreaElement>) => {
      e.stopPropagation();
      e.preventDefault();
    },
    []
  );

  const handleEvent = useCallback(
    (e) => {
      const hasId = [
        TextAreaComboIds.submitButton,
        TextAreaComboIds.textarea
      ].includes(e.target?.id);
      handleShowTextarea(hasId);
    },
    [
      TextAreaComboIds.submitButton,
      TextAreaComboIds.textarea,
      handleShowTextarea
    ]
  );

  useLayoutEffect(() => {
    document.addEventListener('click', handleEvent, true);

    return () => {
      document.removeEventListener('click', handleEvent, true);
    };
  }, [handleEvent]);

  return (
    <div className='checkListItems row m-0' onClick={handleListClick}>
      <div className='col-1 p-0 d-flex'>
        <input type='checkbox' className='mt-1' />
      </div>

      <div className='col-11'>
        {showTextarea ? (
          <TextAreaCombo
            className='checkListItems__textarea'
            ref={textareaRef}
            buttonText='Save'
            value={checkListName}
            onSubmit={handelSave}
            onClick={handleTextAreaClick}
            textAreaId={TextAreaComboIds.textarea}
            submitButtonId={TextAreaComboIds.submitButton}
          />
        ) : (
          <div className='d-flex justify-content-between '>
            <div className='checkListItems__title'>{checkListName}</div>
            <div className='checkListItems__options'>
              <i className='bi bi-three-dots' />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckListItems;
