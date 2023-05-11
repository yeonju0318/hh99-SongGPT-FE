import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineCheckCircle,
  AiOutlineSend,
} from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { addComment, deleteComment, updateComment } from "../api/comment";
import { getDetailPost } from "../api/post";
import LikeButton from "./LikeButton";

function Rightbar() {
  const [comment, setComment] = useState("");
  const [editcomment, setEditComment] = useState("");
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [onEdit, setOnEdit] = useState(null);
  let user = null
  if((localStorage.getItem("user")) !== "undefined") {
    user = JSON.parse(localStorage.getItem("user"))?.nickname;
  }
  const addCommentMutation = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("detailPost");
      setComment("");
    },
  });

  const deleteCommentMutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("detailPost");
    },
  });

  const updateCommentMutation = useMutation(updateComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("detailPost");
      setOnEdit(null);
    },
  });

  // detailPost 가져오는 쿼리문
  const {
    isLoading,
    isError,
    data: detailPost,
  } = useQuery("detailPost", () => getDetailPost(Number(id)), {
    refetchOnWindowFocus: false,
  });

  // 수정하기 버튼 눌렀을때 기존의 content가 담기게 하는 코드
  useEffect(() => {
    if (onEdit) {
      const target = detailPost?.data?.comments?.find(
        (item) => item.id === onEdit
      );
      setEditComment(target?.content);
    }
  }, [onEdit]);

  if (isLoading) {
    return <div>로딩중입니다...</div>;
  }

  // 댓글달기 코드
  const onSubmitComment = (e) => {
    e.preventDefault()
    const user = localStorage.getItem("user");
    const authCookie = Cookies.get("auth");
    if (Cookies.get("auth") === undefined) {
      localStorage.removeItem("user");
      return toast.error("로그인이 필요한 기능입니다!");
    }
    if (comment.trim().length === 0) {
      return toast.error("내용을 작성해주세요!");
    }
    if (user && !authCookie) {
      localStorage.removeItem("user");
      window.location.replace("/");
      return toast.error("세션이 만료되었습니다. 다시 로그인해주세요!");
    }
  
    const newComment = { content: comment, postId: id };
    addCommentMutation.mutate(newComment);
  };

  // 덧글 삭제하는 코드
  const onDeleteComment = (commentId) => {
    deleteCommentMutation.mutate(commentId);
  };

  // 덧글 수정하는 코드
  const onUpdateComment = (commentId) => {
    updateCommentMutation.mutate({ content: editcomment, commentId });
  };

  const changeEditComment = (e) => {
    setEditComment(e.target.value);
  };

  const changeComment = (e) => {
    setComment(e.target.value);
  };
  const commentsData = detailPost?.data?.comments;

  const createdAt = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear(); // 년도
    const month = date.getMonth() + 1; // 월 (0부터 시작하므로 1을 더해줌)
    const day = date.getDate(); // 일
    const hours = date.getHours(); // 시간
    const minutes = date.getMinutes(); // 분
    return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
  };

  return (
    <div className="h-full flex-1 flex flex-col border-rounded-xl justify-between ">
      <div className="h-[50px] bg-[#5e5b8e] relative">
        <div className="absolute top-3 right-3">
          <LikeButton onDetail={true} />
        </div>
      </div>
      <div className="flex flex-col border-l-2 h-5/6">
        {commentsData?.map((item) => {
          return (
            <>
              <div className="flex flex-col pb-2 w-11/12 border-b-[1px] self-center mt-2  ">
                <div className="flex gap-2 items-center" key={item.id}>
                  <div className="text-lg">{item.author}</div>
                  <div className="text-xs">{createdAt(item.createdAt)}</div>
                </div>
                <div className="flex justify-between">
                  {onEdit == item.id ? (
                    <input onChange={changeEditComment} value={editcomment} />
                  ) : (
                    <div>{item.content}</div>
                  )}

                  <div className="flex gap-4 ">
                    {user === item.author ? (
                      onEdit == item.id ? (
                        <button onClick={() => onUpdateComment(item.id)}>
                          <AiOutlineCheckCircle />
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            setOnEdit(item.id);
                          }}
                        >
                          <AiFillEdit />
                        </button>
                      )
                    ) : null}
                    {user === item.author ? (
                      onEdit == item.id ? (
                        <button onClick={() => setOnEdit(false)}>
                          <ImCancelCircle />
                        </button>
                      ) : (
                        <button onClick={() => onDeleteComment(item.id)}>
                          <AiFillDelete />
                        </button>
                      )
                    ) : null}
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div className="bg-slate-200 rounded-l-lg flex justify-between p-2 h-12">
        <input
          onChange={changeComment}
          value={comment}
          className=" bg-slate-200 w-full pl-2"
        />
        <div
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSubmitComment();
            }
          }}
          onClick={onSubmitComment}
          className="pl-5 flex flex-end cursor-pointer w-[40px] self-center"
        >
          <AiOutlineSend />
        </div>
      </div>
    </div>
  );
}

export default Rightbar;
