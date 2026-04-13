import type { FC, MouseEventHandler } from 'react';
import { Loader } from '../../components/Loader/Loader';
import './_Button.scss';
import cn from 'classnames';

export interface IButtonProps {
  title?: string;
  variant?: 'primary' | 'secondary' | 'default';
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'medium' | 'big' | 'default';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
  isDisabled?: boolean;
  className?:string;
  children?: React.ReactNode,
}

export const Button: FC<IButtonProps> = ({
  type,
  title,
  onClick,
  isLoading,
  className,
  isDisabled,
  variant = 'primary',
  size = 'medium',
  children,
}) => {
  return (
    <button
      className= {cn("button", className)}
      type={type}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      data-variant={variant}
      data-size={size}
    >
      <span className={isLoading ? "button__text--loading" : ""}>
        {children || title}
      </span>
      {isLoading}
    </button>
  );
};
