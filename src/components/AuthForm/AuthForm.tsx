import { useState, useEffect } from "react";
import { LoginForm } from "../LoginForm";
import "./_AuthForm.scss";
import { Logotype } from "../Logo/Logotype.tsx";
import IconClose from "../../assets/icon-closing-cross.svg?react";
import { RegisterLayout } from "../RegisterForm/RegisterLayout.tsx";

type AuthFormProps = {
  onClose: () => void;
};


export const AuthForm = ({ onClose }: AuthFormProps) => {
  const [authType, setAuthType] = useState<"login" | "register">("login");

  const handleClose = () => {
    onClose();
  };
  
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-form"  onClick={(e) => e.stopPropagation()}>
        <div className="auth-form__logo">
          <Logotype />
        </div>
        {authType === "login" ? <LoginForm setAuthType={setAuthType} onSuccess={onClose}/> : <RegisterLayout setAuthType={setAuthType}/>}
        <div className="auth-form__btn-wrapper">
          <IconClose
            className="auth-form__btn-close"
            onClick={handleClose}
          />
        </div>
      </div>
    </div>      
  );
};
