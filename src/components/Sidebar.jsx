import Cookies from "js-cookie";
import React from "react";
import { toast } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import useFeelCategories from "../hooks/useFeelCategories";
import useGenreCategories from "../hooks/useGenreCategories";
import useWeatherCategories from "../hooks/useWeatherCategories";

function Sidebar() {
  return (
    <>
      <div className="md:flex hidden flex-col w-[200px] py-10 px-4 ">
        <NavLinks />
      </div>
    </>
  );
}

const NavLinks = () => {
  const navigate = useNavigate()
  const feelCategories = useFeelCategories();
  const weatherCategories = useWeatherCategories();
  const genreCategories = useGenreCategories();
  const filterReset = () => {
    feelCategories.setFeelCategories(null);
    weatherCategories.setWeatherCategories(null);
    genreCategories.setGenreCategories(null);
  };

  return (
    <div className="mt-12">
      <NavLink
        onClick={filterReset}
        to="/"
        className="flex flex-row justify-start items-center my-8 text-1xl font-medium text-black hover:text-cyan-400"
      >
        <icon className="w-6 h-6 mr-2" />
        홈으로
      </NavLink>
      <NavLink
        onClick={filterReset}
        to="/question"
        className="flex flex-row justify-start items-center my-8 text-1xl font-medium  text-black hover:text-cyan-400"
      >
        <icon className="w-6 h-6 mr-2" />
        질문하러 가기
      </NavLink>
      <NavLink
        to="/like"
        onClick={(e) => {
          filterReset();
          const user = localStorage.getItem("user");
          const authCookie = Cookies.get("auth");
          if (Cookies.get("auth") === undefined) {
            e.preventDefault();
            localStorage.removeItem("user");
            navigate("/");
            return toast.error("로그인이 필요한 기능입니다!");
          }
          if (user && !authCookie) {
            e.preventDefault();
            localStorage.removeItem("user");
            window.location.replace("/");
            return toast.error("세션이 만료되었습니다. 다시 로그인해주세요!");
          }

        }}
        className="flex flex-row justify-start items-center my-8 text-1xl font-medium  text-black hover:text-cyan-400"
      >
        <icon className="w-6 h-6 mr-2" />
        좋아요 목록
      </NavLink>
    </div>
  );
};
export default Sidebar;
