import { Button } from "../../ui/Button/Button"

type RegisterFinishProps = {
  setAuthType: (authType: "login" | "register") => void;
};

export const FinishRegister = ({setAuthType}:RegisterFinishProps) => {
    return <div className="register-finish">
        <h2 className="register-finish__title">Регистрация завершена</h2>
        <p className="register-finish__text">Используйте вашу электронную почту для входа</p>
        <Button className="register-finish__btn" onClick={() => setAuthType("login")}>Войти</Button>
    </div>
}