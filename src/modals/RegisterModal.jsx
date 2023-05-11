import React, { useCallback, useState } from "react";
import { useMutation } from "react-query";
import { addUser } from "../api/auth";
import Heading from "../components/Heading";
import useLoginModal from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";
import Modal from "./Modal";

function RegisterModal() {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  // 유저 회원가입
  const mutationSignUp = useMutation(addUser, {
    onSuccess: (data) => {
        registerModal.onClose()
        loginModal.onOpen()
    },
    onError: (error) => {

      console.error(error);
    },
  });

  const newUser = {
    email: email,
    nickname: nickname,
    password: password,
  };

  const onSubmit = () => {
    mutationSignUp.mutate(newUser);
    setEmail("");
    setPassword("");
    setNickname("");
  };

  // 핸들러 부분

  const handleInputChange = useCallback(
    (e) => {
      switch (e.target.name) {
        case "email":
          setEmail(e.target.value);
          break;
        case "nickname":
          setNickname(e.target.value);
          break;
        case "password":
          setPassword(e.target.value);
          break;
        default:
          break;
      }
    },
    [setEmail,setNickname, setPassword]
  );

  // 모달 Body 부분에 들어갈 내용
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="회원가입" subtitle="지금 어떤 노래를 듣고싶은가요?" />

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

      {/* Nickname INPUT */}
      <div className="w-full relative">
        <input
          onChange={handleInputChange}
          value={nickname}
          name="nickname"
          type="text"
          className="peer w-full p-4 pt-6 font-light bg0white border-2 rounded-md outline-none transition pl-4 "
        />
        <label
          className={`absolute text-md duration-150 transform -transform-y-3 top-5 z-10 origin-[0] left-4
        peer-focus:scale-75
        peer-focus:-translate-y-4
        ${nickname && "scale-75"}
        ${nickname && "-translate-y-4"}
        `}
        >
          닉네임
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

  return (
    <>
      <Modal
        isOpen={registerModal.isOpen}
        title="회원가입"
        actionLabel="가입하기"
        onClose={registerModal.onClose}
        body={bodyContent}
        onSubmit={onSubmit}
      />
    </>
  );
}

export default RegisterModal;
