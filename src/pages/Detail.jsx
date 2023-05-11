import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getDetailPost } from "../api/post";
import Chat from "../components/Chat";
import Rightbar from "../components/Rightbar";
import useLatestPost from "../hooks/useLastestPost";

function Detail() {
  const {id} = useParams()
  const setLatestPost = useLatestPost();
  
  useEffect(() => {
    if (localStorage.getItem("latestproduct") === null) {
      localStorage.setItem("latestproduct", JSON.stringify([id]));
      setLatestPost.setLatestPost([id]);
    } else {
      let arr = JSON.parse(localStorage.getItem("latestproduct"));
      if(arr.length === 6) {
        arr.shift()
        arr.push(id);
      } else {
        arr.push(id);
      }
      let newLatestProduct = new Set(arr);
      localStorage.setItem(
        "latestproduct",
        JSON.stringify([...newLatestProduct])
      );
      setLatestPost.setLatestPost([...newLatestProduct]);
    }
  }, []);



  const { isLoading, isError, data: detailPost } = useQuery('detailPost', () => getDetailPost(Number(id)), {
    refetchOnWindowFocus: false,
  })


  if(isLoading){
    return <div>로딩중 입니다...</div>
  }

  if(isError){
    return <div>게시글을 가져오는 중 오류가 발생했습니다!</div>
  }

  return (
    <>
      <div className="question mt-3">
        <div className="container">
          <Chat detailPost={detailPost} detailPage={true} />
          <Rightbar detailPost={detailPost} />
        </div>
      </div>
    </>
  );
}

export default Detail;
