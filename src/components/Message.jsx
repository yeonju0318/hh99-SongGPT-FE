import React from "react";

function Message(props) {
  let userImage = "none";
  if(localStorage.getItem("user") !== "undefined") {
    if(localStorage.getItem("user")?.image !== "none") {
      userImage = JSON.parse(localStorage.getItem("user"))?.image
    }
  }
  return (
    <>
      {props.message1 && (
        <div className="flex justify-end">
          <div className="message">
            <div className="messageOwner">
              <p className=" text-end">{props.message1}</p>
            </div>
            <div className="messageInfo">
              <img
                src={
                  userImage !== "none"
                    ? userImage
                    : process.env.PUBLIC_URL + "/imgs/placeholder.jpg"
                }
                alt="userImage"
              />
            </div>
          </div>
        </div>
      )}

      {props.message2 && (
        <div className="message">
          <div className="messageInfo">
            <img
              src="https://sazan.cafe24.com/character/hopan-man/hopangmen_1.jpg"
              alt="GPT"
            />
          </div>
          <div className="messageContent">
            <p className=" text-start">{props.message2}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Message;
