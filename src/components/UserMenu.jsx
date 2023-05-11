import Cookies from "js-cookie";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
// import useIsLoggined from "../hooks/useIsLoggined";
import useLoginModal from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";

function UserMenu() {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  // const isLoggined = useIsLoggined();
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate()


  useEffect(() => {
    let user = null
    if((localStorage.getItem("user")) !== "undefined") {
      user = JSON.parse(localStorage.getItem("user"));
      setCurrentUser(user);

    }
  }, []);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleLogout = useCallback(() => {
    Cookies.remove("auth");
    localStorage.removeItem("user")
    toast.success("로그아웃 완료!");
  });
  return (
    <div className="relative z-20">
      <div className="flex flex-row items-center gap-3">
        {/* Navbar 유저메뉴 */}
        <div
          onClick={() => {
            setIsOpen(true);
          }}
          className="hidden cursor-default lg:block text-sm font-semibold py-3 px-4 rounded-full  items-end"
        >
          {currentUser?.nickname === undefined ||
          currentUser?.nickname === null ||
          currentUser?.nickname.length == 0
            ? "AI가 추천해주는 노래 듣기!"
            : currentUser.nickname + "님! 오늘의 기분은 어떤가요?"}
        </div>
        <div
          onClick={toggleOpen}
          className=" p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            {/* 유저 프로필사진 들어가는 곳 */}
            <img
              className="rounded-full"
              height="30"
              width="30"
              alt="Avatar"
              src={process.env.PUBLIC_URL + "/imgs/placeholder.jpg"}
            />
          </div>
        </div>

        {/* Navbar 맨 왼쪽 버튼 눌렀을때 펼쳐지는 모달 */}
        {isOpen && (
          <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
            <div className="flex flex-col cursor-pointer">
              {/* 회원가입 & 프로필 보기 버튼 */}
              {currentUser?.nickname === undefined ||
              currentUser?.nickname === null ||
              currentUser?.nickname.length === 0 ? (
                <div
                  onClick={() => {
                    registerModal.onOpen();
                    setIsOpen(false);
                  }}
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  회원가입
                </div>
              ) : (
                <div
                  onClick={() => {
                    navigate("/profile")
                    setIsOpen(false);
                  }}
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  프로필 보기
                </div>
              )}

              {/* 로그인 & 로그아웃 버튼 */}

              {currentUser?.nickname === undefined ||
              currentUser?.nickname === null ||
              currentUser?.nickname.length == 0 ? (
                <div
                  onClick={() => {
                    loginModal.onOpen();
                    setIsOpen(false);
                  }}
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  로그인
                </div>
              ) : (
                <div
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                    window.location.replace("/");
                  }}
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  로그아웃
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserMenu;
