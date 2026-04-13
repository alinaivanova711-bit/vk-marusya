import { Button } from "../../ui/Button/Button"
import { useMe } from "../../hooks/useMe";
import IconEmail from "../../assets/email.svg?react";
import { queryClient } from "../../service/queryClient";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import "./_SettingProfile.scss"

export const SettingProfile = () => {
    const { data: user, status } = useMe();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.get("/auth/logout");

            queryClient.setQueryData(["users", "me"], null);
            await queryClient.invalidateQueries({ queryKey: ["users", "me"] });
            navigate("/", { replace: true });
        } catch (e) {
            console.error("Ошибка выхода", e);
        }
        };
    return (
        <>
            <div className="SettingProfile">
                <div className="SettingProfile__wrapper">
                    <div className="SettingProfile__card">
                        <span className="SettingProfile__img">
                            {`${user?.name?.[0] ?? ""}${user?.surname?.[0] ?? ""}`.toUpperCase()}
                        </span>
                        <div className="SettingProfile__info">
                            <p className="SettingProfile__info-description">Имя Фамилия</p>
                            <p className="SettingProfile__text">{user?.name} {user?.surname}</p>
                        </div>
                    </div>
                    <div className="SettingProfile__card">
                        <span className="SettingProfile__img">
                            <IconEmail className="SettingProfile__icon" width={24} height={24}/>
                        </span>
                        <div className="SettingProfile__info">
                            <p className="SettingProfile__info-description">Электронная почта</p>
                            <p className="SettingProfile__text">{user?.email}</p>
                        </div>
                    </div>
                    <Button className="SettingProfile__btn" type="button" title="Выйти из аккаунта" size="medium" variant="primary" onClick={handleLogout}/>
                </div>
            </div>
            
        </>
    )
}