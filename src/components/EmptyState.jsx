import { useNavigate } from "react-router-dom";
import useFeelCategories from "../hooks/useFeelCategories";
import useGenreCategories from "../hooks/useGenreCategories";
import useWeatherCategories from "../hooks/useWeatherCategories";
import Heading from "./Heading";

const EmptyState = ({
  title = "작성된 게시글이 없어요!",
  subtitle = "글 작성하러가기",
  showReset = false,
}) => {
  const feelCategories = useFeelCategories()
  const weatherCategories = useWeatherCategories()
  const genreCategories = useGenreCategories()
  const navigate = useNavigate();
  return (
    <>
      <div className="sm:mr-0 md:mr-44 flex flex-col">
        <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
          <Heading center title={title} />
          {showReset ? (
              <button label="Remove all filters"  
              onClick={() => {
                feelCategories.setFeelCategories(null);
                weatherCategories.setWeatherCategories(null);
                genreCategories.setGenreCategories(null);
              }}>
                필터링 리셋하기
              </button>
            ) : (
              <button label="Write posts" onClick={() => navigate("/question")}>
                글 작성하러 가기
              </button>
            ) }
        </div>
      </div>
    </>
  );
};

export default EmptyState;
