import React from "react";
import NoPost from "../../images/nopost.png";

const EmptyPost = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <img src={NoPost} className="" height={"500px"} alt="no post" />
    </div>
  );
};

export default EmptyPost;
