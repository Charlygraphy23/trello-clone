import { TextAreaComboType } from 'interfaces';
import { forwardRef, Ref } from 'react';

const TextAreaCombo = (
  {
    placeholder,
    value,
    onChange,
    onBlurCapture,
    onFocusCapture,
    style,
    className,
    buttonText,
    onClose,
    readOnly,
    onSubmit,
    onClick,
  }: TextAreaComboType,
  ref: Ref<HTMLTextAreaElement>
) => (
  <div className={`textAramCombo ${className}`} style={style}>
    <textarea
      ref={ref}
      onBlur={onBlurCapture}
      onFocusCapture={onFocusCapture}
      className='mb-1'
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      readOnly={readOnly}
      onClick={onClick}
    />

    {!readOnly && (
      <div className='d-flex textAramCombo__footer align-items-center'>
        <button
          type='button'
          className='bg__primary text-white'
          onClick={onSubmit}
        >
          {buttonText}
        </button>
        <i className='bi bi-x-lg' onClick={onClose} />
      </div>
    )}
  </div>
);

export default forwardRef(TextAreaCombo);
