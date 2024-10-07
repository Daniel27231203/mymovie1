import { FC } from "react";
import scss from "./Loader.module.scss";

const Loader: FC = () => {
  return (
    <div className={scss.Load}>
      <div className={scss.loader}></div>
    </div>
  );
};

export default Loader;
