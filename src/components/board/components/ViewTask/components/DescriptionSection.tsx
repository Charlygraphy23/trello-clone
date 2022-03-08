import TextAreaCombo from 'core/TextAreaCombo';
import React, { useCallback, useRef, useState } from 'react';

const DescriptionSection = () => {
  const [readOnly, setReadOnly] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  let blurTimeout: any = null;

  const handleFocus = useCallback(() => {
    setReadOnly(false);
  }, []);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.preventDefault();

    blurTimeout = setTimeout(() => setReadOnly(true), 100);
  }, []);

  const handleClick = useCallback(() => {
    clearTimeout(blurTimeout);
    textareaRef.current?.focus();
    setReadOnly(false);
  }, []);

  return (
    <div className='descriptionSection'>
      <p className='descriptionSection__title'>Description</p>

      <TextAreaCombo
        ref={textareaRef}
        readOnly={readOnly}
        className='descriptionSection__textarea'
        placeholder='Add a more detailed description…'
        buttonText='Save'
        onBlurCapture={handleBlur}
        onFocusCapture={handleFocus}
        onClose={handleBlur}
        onSubmit={handleClick}
      />

      {/* <textarea
        readOnly={readOnly}
        className='descriptionSection__textarea'
        placeholder='Add a more detailed description…'
        onFocusCapture={handleFocus}
        onBlurCapture={handleBlur}
        value=''
      />

      {!readOnly && (
        <div className='d-flex align-items-center mb-3'>
          <button className='descriptionSection__save' type='submit'>
            Save
          </button>

          <i
            className='bi bi-x-lg descriptionSection__close'
            onClick={handleBlur}
          />
        </div>
      )} */}
    </div>
  );
};

export default DescriptionSection;
