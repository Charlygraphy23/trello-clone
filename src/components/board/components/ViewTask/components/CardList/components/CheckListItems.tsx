import TextAreaCombo from 'core/TextAreaCombo';
import React, { useCallback, useRef, useState } from 'react';

type CheckListItemType = {
  data: {
    id: number;
    value: string;
  };
};

const CheckListItems = ({ data }: CheckListItemType) => {
  // eslint-disable-next-line no-undef
  const blurRef = useRef<NodeJS.Timeout>(null);
  const [showTextarea, setShowTextarea] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { value: checkListName } = data;

  const handleShowTextarea = useCallback((value: boolean) => {
    if (value) {
      setShowTextarea(value);
    } else {
      // @ts-expect-error
      blurRef.current = setTimeout(() => setShowTextarea(value), 100);
    }
  }, []);

  const handelSave = useCallback(() => {
    if (blurRef.current) clearTimeout(blurRef.current);
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

  return (
    <div className='checkListItems row m-0 mt-3' onClick={handleListClick}>
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
            onBlurCapture={() => handleShowTextarea(false)}
            onClose={() => handleShowTextarea(false)}
            onSubmit={handelSave}
            onClick={handleTextAreaClick}
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
