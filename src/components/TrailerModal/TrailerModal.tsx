import "./_TrailerModal.scss";
import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import IconClose from "../../assets/icon-closing-cross.svg?react";
import Play  from '../../assets/play.svg?react';
import Stop  from '../../assets/stop.svg?react';

type Props = {
  url: string;
  title: string;
  onClose: () => void;
};

export const TrailerModal = ({ url, title, onClose }: Props) => {
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHover, setIsHover] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="modal" onClick={onClose}>
      <div
        className="modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="modal__video-wrapper"
          onClick={handleClick}
        >
           {isLoading && (
            <div className="modal__loader">
              <div className="spinner" />
            </div>
          )}

          <ReactPlayer
            ref={playerRef}
            src={url}
            width="100%"
            height="100%"
            controls={false}
            playing={isPlaying}
            // onReady={() => setIsLoading(false)}       
            onPlay={() => setIsLoading(false)}
          />
          <div
            className="modal__overlay"
            onClick={handleClick}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          />

          {!isPlaying && !isLoading && (
            <div className="modal__play">
              {isHover ? <Play className="modal__play-icon" width={40} height={40} /> : <Stop width={40} height={40} />}
            </div>
          )}

          {!isPlaying && !isLoading && (
            <p className="modal__title">{title}</p>
          )}

          <button className="modal__close" onClick={onClose}>
            <IconClose />
          </button>
        </div>

      </div>
    </div>
  );
};