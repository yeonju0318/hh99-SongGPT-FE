import axios from "axios";
import Cookies from "js-cookie";

// 전체 게시글 조회
const getPosts = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/board?page=0&size=12&sort=createdAt,DESC`
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};


const getUserLikes = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/like`,{
        headers: {
          Access_Token: `Bearer ${Cookies.get("auth")}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const getDetailPost = async (postId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/board/${postId}`, Cookies.get("auth") ? {
        headers: {
          Access_Token: `Bearer ${Cookies.get("auth")}`,
        },
      } : {}
    );
    return response.data;
  } catch (error) {
    console.log(error)
  } 
}

export { getPosts, getUserLikes, getDetailPost };
