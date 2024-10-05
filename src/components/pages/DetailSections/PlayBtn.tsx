import React from "react";
import scss from "./PlayBtn.module.scss";
import { FaPlay } from "react-icons/fa"; // Импорт иконки Play

interface WatchTrailerButtonProps {
  onClick: () => void;
}

const WatchTrailerButton: React.FC<WatchTrailerButtonProps> = ({ onClick }) => {
  return (
    <button className={scss.button} onClick={onClick}>
      <FaPlay className={scss.icon} /> {/* Иконка Play */}
      <span>Watch Trailer</span>
    </button>
  );
};

export default WatchTrailerButton;
