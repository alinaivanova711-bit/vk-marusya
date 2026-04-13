import "./Logotype.scss";
import Logo from "../../assets/logo.svg?react";

export const Logotype = () => (
  <div className="logo">
        <Logo width={25} height={32} className="logo__icon" />
        <p className="logo__text">маруся</p>
  </div>
);
