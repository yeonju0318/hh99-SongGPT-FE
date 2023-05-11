import React from "react";
import axios from "axios";
import useFeelTag from "../hooks/useFeelTag";
import useGenreTag from "../hooks/useGenreTag";
import useWeatherTag from "../hooks/useWeatherTag";
import Cookies from "js-cookie";
import useAnswerGpt from "../hooks/useAnswerGpt";
import useInput from "../hooks/useInput";
import { useRef } from "react";
import { toast } from "react-hot-toast";
import useGPTLoading from "../hooks/useGPTLoading";

function Input() {
  const inputRef = useRef(null);

  const feelTag = useFeelTag();
  const GenreTag = useGenreTag();
  const WeatherTag = useWeatherTag();
  const { setAnswerGpt } = useAnswerGpt();
  const { inputText, setInputText } = useInput();
  const GPTLoading = useGPTLoading()
  const onSendMessage = async () => {
    console.log(1)
    const messageText = `${feelTag.feelTag.text}${GenreTag.GenreTag.text}${WeatherTag.WeatherTag.text}${inputText}`;
    const message = {
      question: messageText,
    };
    GPTLoading.onLoading()
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/chat-gpt/question`,
        message,
        {
          headers: {
            Access_Token: `Bearer ${Cookies.get("auth")}`,
          },
        }
      );
      console.log(response.data);
      setAnswerGpt(response.data.data.answer);
    } catch (error) {
      toast.error("서버 통신 오류!");
    }
    GPTLoading.offLoading()

    inputRef.current.value = "";
  };

  const onInputChangeHandler = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div className="input flex justify-between">
      <input
        ref={inputRef}
        className="w-full mr-3 "
        type="text"
        placeholder="추가적으로 물어볼 내용을 적어주세요!"
        value={inputText.inputText}
        onChange={onInputChangeHandler}
        readOnly={
          !(
            (feelTag.feelTag && GenreTag.GenreTag && WeatherTag.WeatherTag)
          )
        }
      />

      <div className="send">
        <button onClick={onSendMessage}>Send</button>
      </div>
      <div>

      </div>
    </div>
    
  );
}

export default Input;
