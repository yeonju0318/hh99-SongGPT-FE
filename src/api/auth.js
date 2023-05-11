import axios from "axios";
import { toast } from "react-hot-toast";


// 회원가입
const addUser = async (newUser) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/member/register`,
      newUser
    );
    toast.success("회원가입 성공!");
    return response
  } catch (error) {
    // if (error.response.data.data.email) {
    //   return toast.error(error.response.data.data.email);
    // } else if (error.response.data.data.nickname) {
    //   return toast.error(error.response.data.data.nickname);
    // } else if (error.response.data.data.password) {
    //   return toast.error(error.response.data.data.password);
    // } else {
    //   toast.error(error.response.data.data);
    // }
    toast.error(error.response.message)
  }
};

// 프로필 사진 변경
const changeProfile = async () => {
  try {
  } catch (error) {}
};

export { addUser, changeProfile };
