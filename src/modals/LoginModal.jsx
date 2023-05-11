import axios from "axios";
import Cookies from "js-cookie";
import React, { useCallback, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import Heading from "../components/Heading";
import AuthContext from "../hooks/useCurrentUser";
import useLoginModal from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";
import Modal from "./Modal";

function LoginModal() {
  const { setAuth } = useContext(AuthContext);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = {
    email: email,
    password: password,
  };

  // 로그인 api 통신
  const onSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/member/login`,
        user
      );
      console.log(JSON.stringify(response?.message));
      console.log(response);

      const accessHeader = response.headers.get("Access_Token");
      const accessToken = accessHeader.split(" ")[1];
      Cookies.set("auth", accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.data));
      setAuth(response.data.data);
      setEmail("");
      setPassword("");
      loginModal.onClose();
      window.location.replace("/");
      toast.success("어서오세요!");
    } catch (err) {
      console.log(err)
    }
  };
  // 핸들러 부분

  const handleInputChange = useCallback(
    (e) => {
      switch (e.target.name) {
        case "email":
          setEmail(e.target.value);
          break;
        case "password":
          setPassword(e.target.value);
          break;
        default:
          break;
      }
    },
    [setEmail, setPassword]
  );

  // 모달 Body 부분에 들어갈 내용
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="로그인" subtitle="" />

      {/* Email INPUT */}
      <div className="w-full relative">
        <input
          onChange={handleInputChange}
          value={email}
          name="email"
          type="text"
          className="peer w-full p-4 pt-6 font-light bg0white border-2 rounded-md outline-none transition pl-4 "
        />
        <label
          className={`absolute text-md duration-150 transform -transform-y-3 top-5 z-10 origin-[0] left-4
        peer-focus:scale-75
        peer-focus:-translate-y-4
        ${email && "scale-75"}
        ${email && "-translate-y-4"}
        `}
        >
          이메일
        </label>
      </div>

      {/* Password INPUT */}
      <div className="w-full relative">
        <input
          onChange={handleInputChange}
          value={password}
          name="password"
          type="password"
          className="peer w-full p-4 pt-6 font-light bg0white border-2 rounded-md outline-none transition pl-4 "
        />
        <label
          className={`absolute text-md duration-150 transform -transform-y-3 top-5 z-10 origin-[0] left-4
        peer-focus:scale-75
        peer-focus:-translate-y-4
        ${password && "scale-75"}
        ${password && "-translate-y-4"}
        `}
        >
          비밀번호
        </label>
      </div>
    </div>
  );

  const footer = (
    <div className="flex gap-4 justify-end pr-8 items-center">
      <div className=" cursor-default">아직 회원이 아니신가요?</div>
      <div
        onClick={() => {
          loginModal.onClose();
          registerModal.onOpen();
        }}
        className="cursor-pointer text-sm"
      >
        회원가입 하기
      </div>
    </div>
  );

  return (
    <>
      <Modal
        isOpen={loginModal.isOpen}
        title="로그인"
        actionLabel="로그인"
        onClose={loginModal.onClose}
        body={bodyContent}
        footer={footer}
        onSubmit={onSubmit}
      />
    </>
  );
}

export default LoginModal;
