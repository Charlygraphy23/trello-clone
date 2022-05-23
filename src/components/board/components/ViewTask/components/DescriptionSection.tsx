import TextAreaCombo from 'core/TextAreaCombo';
import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  // eslint-disable-next-line prettier/prettier
  useState
} from 'react';

const DescriptionSection = () => {
  const TextAreaComboIds = useMemo(
    () => ({
      textarea: 'DescriptionSection_text',
      submitButton: 'DescriptionSection_submit'
    }),
    []
  );

  const [readOnly, setReadOnly] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleFocus = useCallback(() => {
    setReadOnly(false);
  }, []);

  // const handleBlur = useCallback(
  //   (e: React.FocusEvent<HTMLTextAreaElement>) => {
  //     e.preventDefault();

  //     // clearTimeoutOnBlur();
  //     setReadOnly(isMatched);
  //     console.log('Yo', isMatched);

  //     // console.log('MATCHED', isMatched);

  //     // blurTimeout.current = setTimeout(() => setReadOnly(true), 100);
  //   },
  //   [isMatched]
  // );

  const handleClick = useCallback(() => {
    // textareaRef.current?.focus();
    // setReadOnly(true);
    // TODO: need to implement add description
  }, []);

  const handleEvent = useCallback(
    (e) => {
      const hasId = [
        TextAreaComboIds.submitButton,
        TextAreaComboIds.textarea
      ].includes(e.target?.id);
      setReadOnly(!hasId);
    },
    [TextAreaComboIds.submitButton, TextAreaComboIds.textarea]
  );

  useLayoutEffect(() => {
    document.addEventListener('click', handleEvent, true);

    return () => {
      document.removeEventListener('click', handleEvent, true);
    };
  }, [handleEvent]);

  return (
    <div className='descriptionSection'>
      <p className='descriptionSection__title'>Description</p>

      <TextAreaCombo
        ref={textareaRef}
        readOnly={readOnly}
        className='descriptionSection__textarea'
        placeholder='Add a more detailed description…'
        buttonText='Save'
        onFocusCapture={handleFocus}
        onSubmit={handleClick}
        textAreaId={TextAreaComboIds.textarea}
        submitButtonId={TextAreaComboIds.submitButton}
      />
    </div>
  );
};

export default DescriptionSection;
