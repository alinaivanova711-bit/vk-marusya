import IconTg from "../../assets/tg.svg?react";
import IconVk from "../../assets/vk.svg?react"
import IconYouTube from "../../assets/youtube.svg?react"
import IconOk from "../../assets/ok.svg?react"
import "./Footer.scss"

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__socials">
        <a href="https://vk.com/iadhappy" className="footer__socials-link" target="_blank" rel="noreferrer" aria-label="Вконтакте" aria-hidden="true">
          <IconVk width={20} height={18} className="footer__icon" />
        </a>

        <a href="https://www.youtube.com" className="footer__socials-link" target="_blank" rel="noreferrer" aria-label="Ютуб" aria-hidden="true">
          <IconYouTube width={20} height={18} className="footer__icon" />
        </a>
        <a href="https://ok.ru" className="footer__socials-link" target="_blank" rel="noreferrer"aria-label="Одноклассники" aria-hidden="true">
          <IconOk width={20} height={18} className="footer__icon" />
        </a>

        <a href="https://t.me/+JI-54f46wS9hNTMy" className="footer__socials-link" target="_blank" rel="noreferrer" aria-label="Телеграмм" aria-hidden="true">
          <IconTg width={20} height={18} className="footer__icon" />
        </a>
      </div>
    </footer>
  );
};