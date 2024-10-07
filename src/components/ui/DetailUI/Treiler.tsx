import ReactPlayer from "react-player";
import scss from "./Treiler.module.scss";
import { FaWindowClose } from "react-icons/fa";
import { FC } from "react";

interface ITreilerProps {
  idMovie?: string;
  setTreilerModal: (value: boolean) => void;
}

const Treiler: FC<ITreilerProps> = ({ idMovie, setTreilerModal }) => {
  return (
    <div className={scss.treiler}>
      <button onClick={() => setTreilerModal(false)}>
        <FaWindowClose />
      </button>
      <ReactPlayer
        width={"100%"}
        height={"100%"}
        controls={true}
        url={`https://www.youtube.com/embed/${idMovie}`}
      />
    </div>
  );
};

export default Treiler;
