import type{ FC, ReactNode } from "react";
import cn from "classnames"
import "./_FormField.scss";

interface IFormFieldProps {
  children: ReactNode;
  className?:string;
}

export const FormField: FC<IFormFieldProps> = ({
  children,
  className
}) => {
  return (
    <label className={cn("form-field", className)}>
      {children}
    </label>
  );
};
