import React from "react";
import Messages from "./Messages";
import Input from "./Input";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailPost } from "../api/post";
import axios from "axios";
import Cookies from "js-cookie";

function Chat({ detailPage }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    isLoading,
    isError,
    data: detailPost,
  } = useQuery("detailPost", () => getDetailPost(Number(id)), {
    refetchOnWindowFocus: false,
  });
  
  let user = null
  if((localStorage.getItem("user")) !== "undefined") {
    user = JSON.parse(localStorage.getItem("user"))?.nickname;
  }

  if (isLoading) {
    return <div>로딩중 입니다...</div>;
  }

  const onDeletePost = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/post/${id}`,
        {
          headers: {
            Access_Token: `Bearer ${Cookies.get("auth")}`,
          },
        }
      );
      console.log(response.data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chat">
      <div className="chatInfo">
        {detailPage && (
          <div className="flex gap-4">
            <div className="flex text-white  text-xs items-center justify-center ">
              #{detailPost?.data?.feelTag}
            </div>
            <div className="flex text-white  text-xs items-center justify-center ">
              #{detailPost?.data?.weatherTag}
            </div>
            <div className="flex text-white  text-xs items-center justify-center ">
              #{detailPost?.data?.genreTag}
            </div>
          </div>
        )}
      </div>
      <Messages detailPage={detailPage} />
      {!detailPage && <Input />}
      {detailPage && detailPost?.data?.nickname === user && (
        <div className="flex justify-end items-center pb-1 pr-1 mr-1">
          <button
            onClick={onDeletePost}
            className="p-2  bg-rose-400 text-white rounded-lg text-base w-20"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
}

export default Chat;
