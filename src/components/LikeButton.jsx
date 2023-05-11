import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useMutation, useQueries, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { getPosts, getUserLikes } from "../api/post";

function LikeButton({ itemId, likeStatus, likeCount, onDetail }) {
  const [posts, userLikes] = useQueries([
    { queryKey: "posts", queryFn: getPosts },
    { queryKey: "userLikes", queryFn: getUserLikes },
  ]);
  const { id } = useParams();
  const [hasLiked, setHasLiked] = useState(likeStatus);
  const [prevlikeCount, setPrevLikeCount] = useState(likeCount);
  const queryClient = useQueryClient();
  const likeMutation = useMutation(getUserLikes, {
    onSuccess: () => {
      queryClient.invalidateQueries("userLikes");
    },
  });

  if (onDetail !== undefined && onDetail == true) {
    itemId = Number(id);
  }
  const toggleLike = async (e) => {
    const user = localStorage.getItem("user");
    const authCookie = Cookies.get("auth");
    if (Cookies.get("auth") === undefined) {
      e.stopPropagation();
      localStorage.removeItem("user");
      return toast.error("로그인이 필요한 기능입니다!");
    }
    if (user && !authCookie) {
      localStorage.removeItem("user");
      window.location.replace("/");
      return toast.error("세션이 만료되었습니다. 다시 로그인해주세요!");
    }

    if (hasLiked) {
      // 좋아요 취소
      try {
        e.stopPropagation();
        await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/like/${itemId}`,
          {},
          {
            headers: {
              Access_Token: `Bearer ${Cookies.get("auth")}`,
            },
          }
        );
      } catch (err) {
        toast.error(err.response.data.message);
      }
      likeMutation.mutate();
      setHasLiked(false);
      let newLikeCount = prevlikeCount - 1;
      setPrevLikeCount(newLikeCount);
    } else {
      // 좋아요 +1
      try {
        e.stopPropagation();
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/like/${itemId}`,
          {},
          {
            headers: {
              Access_Token: `Bearer ${Cookies.get("auth")}`,
            },
          }
        );
      } catch (err) {
        toast.error(err.response.data.message);
      }
      likeMutation.mutate();
      setHasLiked(true);
      let newLikeCount = prevlikeCount + 1;
      setPrevLikeCount(newLikeCount);
    }
  };

  if (posts.isLoading) {
    return <div>로딩중입니다</div>;
  }

  if (posts.isError) {
    return <div>게시글을 불러오는데 오류가 발생했습니다.</div>;
  }
  return (
    <div
      onClick={toggleLike}
      className="relative hover:opacity-80 transiton cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={
          onDetail
            ? userLikes.data?.includes(Number(id))
              ? "fill-rose-500"
              : "fill-neutral-500/70"
            : hasLiked
            ? "fill-rose-500"
            : "fill-neutral-500/70"
        }
      />
    </div>
  );
}

export default LikeButton;
