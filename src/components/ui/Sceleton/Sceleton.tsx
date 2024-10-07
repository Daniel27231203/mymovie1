import React from "react";
import scss from "./Sceleton.module.scss";

const Skeleton: React.FC = () => {
  return (
    <div className={scss.skeleton}>
      <div className={scss.skeletonBox}>
        <div className={scss.skeletonImage}></div>
        <div className={scss.skeletonTitle}></div>
        <div className={scss.skeletonDate}></div>
      </div>
    </div>
  );
};

export default Skeleton;
