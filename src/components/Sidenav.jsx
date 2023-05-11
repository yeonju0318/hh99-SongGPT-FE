import React from "react";

function Sidenav() {
  let userImage = null;
  let nickname = null;
  if (localStorage.getItem("user") !== "undefined") {
    userImage = JSON.parse(localStorage.getItem("user"))?.image;
    nickname = JSON.parse(localStorage.getItem("user"))?.nickname;
  }

  return (
    <div className="navbar">
      <div className="user">
        <img
          src={
            userImage
              ? userImage
              : process.env.PUBLIC_URL + "/imgs/placeholder.jpg"
          }
          alt="userImage"
        />
        <span>{nickname}</span>
      </div>
    </div>
  );
}

export default Sidenav;
