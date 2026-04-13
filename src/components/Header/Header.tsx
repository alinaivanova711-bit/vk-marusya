import { Link } from "react-router-dom";
import "./Header.scss"
import { Logotype } from "../Logo/Logotype.tsx";
import { Search } from "../Search/Search.tsx";
import { useMe } from "../../hooks/useMe.tsx";
import IconMenu from '../../assets/menu.svg?react';
import IconUser from "../../assets/user.svg?react";

type HeaderProps = {
  onLoginClick: () => void;
};

export const Header = ({onLoginClick}:HeaderProps) => {
  const { data: user } = useMe();
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <Logotype />
      </Link>
      <div className="header__wrapper">
        <Link to="/" className="header__link header__link--delete">
        <span className="header__link-text">Главная</span>
        </Link>
        <Link to="/genres" className="header__link">
          <span className="header__link-text">Жанры</span>
          <IconMenu className="header__link-icon" width={19} height={19} />
        </Link>

        <Search />

        {user ? (
          <Link to="/profile" className="header__link">
            {user.name}
          </Link>
        ) : (
          <button  type="button" className="header__link header__button" onClick={onLoginClick}>
            <span className="header__link-text">Войти</span>
            <IconUser className="header__link-icon" width={24} height={24}/>
          </button>
        )}
      </div>
    </header>
  );
};