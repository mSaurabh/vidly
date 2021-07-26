import React from "react";

export interface LikeProps {
  liked?: boolean;
  onClick?: any;
}

const Like = (props: LikeProps) => {
  const liked = props.liked ? props.liked : false;
  let classes = "fa fa-heart";
  if (!liked) classes += "-o";
  return (
    <i
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
      onClick={props.onClick}
    ></i>
  );
};

export default Like;
