/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';

export interface TextAreaComboType {
  placeholder?: string;
  value?: string;

  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlurCapture?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocusCapture?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  style?: React.CSSProperties;
  className?: string;
  buttonText: string;
  onClose?: (e: any) => void;
  readOnly?: boolean;
  onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLTextAreaElement>) => void;
  textAreaId: string;
  submitButtonId: string;
}

export interface DropDownType {
  buttonId: string;
  buttonText: string;
  title: string;
  children: JSX.Element;
  buttonClass?: string;
  className?: string;
  style?: React.CSSProperties;
  icon?: JSX.Element;
}
