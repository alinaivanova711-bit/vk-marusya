import { useMe } from "../../hooks/useMe";
import { Button } from "../../ui/Button/Button";
import "./_ProfilePage.scss"
import IconUser from "../../assets/user.svg?react";
import Like from "../../assets/like-icon.svg?react";
import { useState } from "react";
import { FavoriteFilms } from "../../components/FavoriteFilms/FavoriteFilms";
import { SettingProfile } from "../../components/SettingProfile/SettingProfile";


export const ProfilePage = () => {
  const { data: user, status } = useMe();
  const [tab, setTab] = useState<"favorite" | "setting">("favorite");
  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Не авторизован</div>;

  return (
    <>
    <div className="ProfilePage">
      <h1 className="ProfilePage__title">Мой аккаунт</h1>
      <div className="ProfilePage__link-wrapper">
        <Button className={`ProfilePage__link ${tab === "favorite" ? "ProfilePage__link--active" : ""}`} variant="default" size="default" onClick={() => setTab("favorite")}>
           <span className="ProfilePage__link-icon">
            <Like width={22} height={20} fill={"none"} className="ProfilePage__icon"/>
            <span className="ProfilePage__link-text">Избранные фильмы</span>
            <span className="ProfilePage__link-text--mobile">Избранное</span>
          </span>
        </Button>
        <Button className={`ProfilePage__link ${tab === "setting" ? "ProfilePage__link--active" : ""}`} variant="default" size="default" onClick={() => setTab("setting")}>
          <span className="ProfilePage__link-icon">
            <IconUser width={24} height={24} className="ProfilePage__icon"/>
              <span className="ProfilePage__link-text">Настройки аккаунта</span>
              <span className="ProfilePage__link-text--mobile">Настройки</span>
          </span>
          </Button>
      </div>
      <div className="ProfilePage__page">
        {tab === "favorite" && <FavoriteFilms />}
        {tab === "setting" && <SettingProfile />}
      </div>
    </div>    
    </>
  );
};