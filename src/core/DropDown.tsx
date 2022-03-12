/* eslint-disable new-cap */

import { DropDownType } from 'interfaces';
import React, { useCallback } from 'react';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    bootstrap: any;
  }
}

const DropDown = ({
  buttonId,
  buttonText,
  title,
  children,
  buttonClass,
  className,
  style,
  icon,
}: DropDownType) => {
  const onClose = useCallback(() => {
    const win: Window = window;
    if (!win?.bootstrap) return;
    // eslint-disable-next-line prettier/prettier
    const dropdown = new win.bootstrap.Dropdown(
      document.getElementById(buttonId)
    );

    dropdown.toggle();
  }, [buttonId]);

  return (
    <div className={`dropdown dropdownComponent ${className}`} style={style}>
      <button
        className={`dropdown-toggle ${buttonClass}`}
        type='button'
        id={buttonId}
        data-bs-toggle='dropdown'
        aria-expanded='true'
      >
        {icon}
        <span>{buttonText}</span>
      </button>

      <div className='dropdown-menu dropdown__body' aria-labelledby={buttonId}>
        <div className='dropdown__title'>
          <span>{title}</span>{' '}
          <i
            onClick={onClose}
            className='bi bi-x'
            style={{ cursor: 'pointer' }}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default DropDown;
