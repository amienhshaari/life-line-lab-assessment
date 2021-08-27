import React from 'react';
import './style.css';

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: (...args: any[]) => any;
  disabled?: boolean;
};

const Button = ({ children, onClick, disabled }: ButtonProps): JSX.Element => (
  <button
    className="button"
    onClick={onClick}
    type="button"
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
