import React, { useState } from "react";
import Sidenav from "./Sidenav";
import Select from "./Select";
import useGenreTag from "../hooks/useGenreTag";
import useWeatherTag from "../hooks/useWeatherTag";
import useAnswerGpt from "../hooks/useAnswerGpt";
import axios from "axios";
import Cookies from "js-cookie";
import useFeelTag from "../hooks/useFeelTag";
import { Navigate, useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import GPTLoading from "./GPTLoading";
import { toast } from "react-hot-toast";

const Side = () => {
  const today = {
    Feel: {
      id: 1,
      body: "오늘의 기분은?",
      tag: ["기쁨", "슬픔", "분노", "불안", "사랑", "기대"],
    },
    Weather: {
      id: 2,
      body: "오늘의 날씨는?",
      tag: ["맑음", "흐림", "비", "눈", "폭풍"],
    },
    Genre: {
      id: 3,
      body: "듣고 싶은 노래는?",
      tag: ["K-pop", "Pop", "발라드", "힙합", "클래식", "자연"],
    },
  };

  const feelTag = useFeelTag();
  const GenreTag = useGenreTag();
  const WeatherTag = useWeatherTag();
  const answer = useAnswerGpt();
  const userInput = useInput();

  const feelWeather = `${feelTag.feelTag.tag}${WeatherTag.WeatherTag.tag}`;
  let gradient = "";
  switch (feelWeather) {
    case "HAPPYSUN":
      gradient = [
        "linear-gradient(to right, #fa709a 0%, #fee140 100%);",
        "linear-gradient(to right, #f83600 0%, #f9d423 100%);",
        "linear-gradient(-225deg, #A445B2 0%, #D41872 52%, #FF0066 100%);",
        "linear-gradient(60deg, #abecd6 0%, #fbed96 100%);",
        "linear-gradient(to right, #00dbde 0%, #fc00ff 100%);",
        "linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);",
        "linear-gradient(120deg, #fccb90 0%, #d57eeb 100%);",
        "linear-gradient(120deg, #f093fb 0%, #f5576c 100%);",
        "linear-gradient(to top, #96fbc4 0%, #f9f586 100%);",
        "linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%);",
      ][Math.floor(Math.random() * 10)];
      break;
    case "HAPPYCLOUD":
      gradient = [
        "linear-gradient(to right, #92fe9d 0%, #00c9ff 100%);",
        "linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%);",
        "linear-gradient(to top, #accbee 0%, #e7f0fd 100%);",
        "linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%);",
        "linear-gradient(to top, #dfe9f3 0%, white 100%);",
        "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);",
        "linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%);",
        "linear-gradient(to top, #d9afd9 0%, #97d9e1 100%);",
        "linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%);",
        "linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%);",
      ][Math.floor(Math.random() * 10)];
      break;
    case "HAPPYRAIN":
      gradient = [
        "linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%);",
        "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);",
        "linear-gradient(to right, #92fe9d 0%, #00c9ff 100%);",
        "linear-gradient(to right, #74ebd5 0%, #9face6 100%);",
        "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);",
        "linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%);",
        "linear-gradient(-225deg, #DFFFCD 0%, #90F9C4 48%, #39F3BB 100%);",
        "linear-gradient(-225deg, #B6CEE8 0%, #F578DC 100%);",
        "linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%);",
        "linear-gradient(-20deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%);",
      ][Math.floor(Math.random() * 10)];
      break;
    case "HAPPYSNOW":
      gradient = [
        "linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);",
        "linear-gradient(to top, #dfe9f3 0%, white 100%);",
        "linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%);",
        "linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%);",
        "linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%);",
        "linear-gradient(to top, #dad4ec 0%, #dad4ec 1%, #f3e7e9 100%);",
        "linear-gradient(to top, #e8198b 0%, #c7eafd 100%);",
        "linear-gradient(to top, #bdc2e8 0%, #bdc2e8 1%, #e6dee9 100%);",
        "linear-gradient(-225deg, #5D9FFF 0%, #B8DCFF 48%, #6BBBFF 100%);",
        "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);",
      ][Math.floor(Math.random() * 10)];
      break;
    case "HAPPYSTORM":
      gradient = [
        "linear-gradient(to right, #f83600 0%, #f9d423 100%);",
        "linear-gradient(to right, #f83600 0%, #f9d423 100%);",
        "linear-gradient(to top, #f77062 0%, #fe5196 100%);",
        "linear-gradient(to right, #00dbde 0%, #fc00ff 100%);",
        "linear-gradient(to right, #ed6ea0 0%, #ec8c69 100%);",
        "linear-gradient(to top, #d5dee7 0%, #ffafbd 0%, #c9ffbf 100%);",
        "#FFDDC0",
        "#FFE9D6",
        "#FFF4ED",
        "#FFFFFF",
      ][Math.floor(Math.random() * 10)];
      break;
    case "SADSUN":
      gradient = [
        "linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%);",
        "linear-gradient(to right, #3ab5b0 0%, #3d99be 31%, #56317a 100%);",
        "linear-gradient(to top, #4481eb 0%, #04befe 100%);",
        "linear-gradient(to top, #88d3ce 0%, #6e45e2 100%);",
        "linear-gradient(to top, #dbdcd7 0%, #dddcd7 24%, #e2c9cc 30%, #e7627d 46%, #b8235a 59%, #801357 71%, #3d1635 84%, #1c1a27 100%);",
        "linear-gradient(to top, #f43b47 0%, #453a94 100%);",
        "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);",
        "linear-gradient(to top, #c79081 0%, #dfa579 100%);",
        "linear-gradient(to top, #c71d6f 0%, #d09693 100%);",
        "linear-gradient(45deg, #874da2 0%, #c43a30 100%);",
      ][Math.floor(Math.random() * 10)];
      break;
    case "SADCLOUD":
      gradient = [
        "linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%);",
        "linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);",
        "linear-gradient(-20deg, #d558c8 0%, #24d292 100%);",
        "linear-gradient(-20deg, #2b5876 0%, #4e4376 100%);",
        "linear-gradient(-225deg, #A8BFFF 0%, #884D80 100%);",
        "linear-gradient(-225deg, #CBBACC 0%, #2580B3 100%);",
        "linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%);",
        "linear-gradient(-225deg, #A445B2 0%, #D41872 52%, #FF0066 100%);",
        "linear-gradient(-225deg, #65379B 0%, #886AEA 53%, #6457C6 100%);",
        "linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%);",
      ][Math.floor(Math.random() * 10)];
      break;
    case "SADRAIN":
      gradient = [
        "linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%);",
        "linear-gradient(to top, #09203f 0%, #537895 100%);",
        "linear-gradient(45deg, #8baaaa 0%, #ae8b9c 100%);",
        "linear-gradient(60deg, #29323c 0%, #485563 100%);",
        "linear-gradient(-20deg, #2b5876 0%, #4e4376 100%);",
        "linear-gradient(-225deg, #FF3CAC 0%, #562B7C 52%, #2B86C5 100%);",
        "linear-gradient(-225deg, #FF057C 0%, #7C64D5 48%, #4CC3FF 100%);",
        "linear-gradient(to right, #a8caba 0%, #5d4157 100%);",
        "linear-gradient(to top, #5f72bd 0%, #9b23ea 100%);",
        "linear-gradient(45deg, #8baaaa 0%, #ae8b9c 100%);",
      ][Math.floor(Math.random() * 10)];
      break;
    case "SADSNOW":
      gradient = [
        "linear-gradient(to top, #cd9cf2 0%, #f6f3ff 100%);",
        "linear-gradient(to top, #0250c5 0%, #d43f8d 100%);",
        "linear-gradient(to top, #ebc0fd 0%, #d9ded8 100%);",
        "linear-gradient(15deg, #13547a 0%, #80d0c7 100%);",
        "linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%);",
        "linear-gradient(-225deg, #5271C4 0%, #B19FFF 48%, #ECA1FE 100%);",
        "linear-gradient(45deg, #8baaaa 0%, #ae8b9c 100%);",
        "linear-gradient(-20deg, #d558c8 0%, #24d292 100%);",
        "linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%);",
        "linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%);",
      ][Math.floor(Math.random() * 10)];
      break;
    case "SADSTORM":
      gradient = [
        "linear-gradient(to top, #09203f 0%, #537895 100%);",
        "linear-gradient(to top, #4fb576 0%, #44c489 30%, #28a9ae 46%, #28a2b7 59%, #4c7788 71%, #6c4f63 86%, #432c39 100%);",
        "linear-gradient(to top, #37ecba 0%, #72afd3 100%);",
        "linear-gradient(to top, #c71d6f 0%, #d09693 100%);",
        "linear-gradient(to top, #3b41c5 0%, #a981bb 49%, #ffc8a9 100%);",
        "linear-gradient(-225deg, #D4FFEC 0%, #57F2CC 48%, #4596FB 100%);",
        "linear-gradient(15deg, #13547a 0%, #80d0c7 100%);",
        "linear-gradient(to top, #505285 0%, #585e92 12%, #65689f 25%, #7474b0 37%, #7e7ebb 50%, #8389c7 62%, #9795d4 75%, #a2a1dc 87%, #b5aee4 100%);",
        "linear-gradient(to top, #0250c5 0%, #d43f8d 100%);",
        "linear-gradient(to top, #fcc5e4 0%, #fda34b 15%, #ff7882 35%, #c8699e 52%, #7046aa 71%, #0c1db8 87%, #020f75 100%);",
      ][Math.floor(Math.random() * 10)];
      break;

    case "ANGERSUN":
      gradient = [
        "linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%);",
        "linear-gradient(to top, #c79081 0%, #dfa579 100%);",
        "linear-gradient(to right, #f83600 0%, #f9d423 100%);",
        "linear-gradient(to top, #c71d6f 0%, #d09693 100%);",
        "linear-gradient(to right, #ed6ea0 0%, #ec8c69 100%);",
        "linear-gradient(to top, #fcc5e4 0%, #fda34b 15%, #ff7882 35%, #c8699e 52%, #7046aa 71%, #0c1db8 87%, #020f75 100%);",
        "linear-gradient(to top, #dbdcd7 0%, #dddcd7 24%, #e2c9cc 30%, #e7627d 46%, #b8235a 59%, #801357 71%, #3d1635 84%, #1c1a27 100%);",
        "linear-gradient(to top, #3f51b1 0%, #5a55ae 13%, #7b5fac 25%, #8f6aae 38%, #a86aa4 50%, #cc6b8e 62%, #f18271 75%, #f3a469 87%, #f7c978 100%);",
        "linear-gradient(to right, #f83600 0%, #f9d423 100%);",
        "linear-gradient(to right, #fa709a 0%, #fee140 100%)",
      ][Math.floor(Math.random() * 10)];
      break;
    case "ANGERCLOUD":
      gradient = [
        "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);",
        "linear-gradient(45deg, #8baaaa 0%, #ae8b9c 100%);",
        "linear-gradient(to top, #505285 0%, #585e92 12%, #65689f 25%, #7474b0 37%, #7e7ebb 50%, #8389c7 62%, #9795d4 75%, #a2a1dc 87%, #b5aee4 100%);",
        "linear-gradient(15deg, #13547a 0%, #80d0c7 100%);",
        "linear-gradient(60deg, #29323c 0%, #485563 100%);",
        "linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%);",
        "linear-gradient(-225deg, #A8BFFF 0%, #884D80 100%);",
        "linear-gradient(to top, #3b41c5 0%, #a981bb 49%, #ffc8a9 100%);",
        "linear-gradient(to top, #a7a6cb 0%, #8989ba 52%, #8989ba 100%);",
        "linear-gradient(to top, #dbdcd7 0%, #dddcd7 24%, #e2c9cc 30%, #e7627d 46%, #b8235a 59%, #801357 71%, #3d1635 84%, #1c1a27 100%);",
      ][Math.floor(Math.random() * 10)];
      break;
    case "ANGERRAIN":
      gradient = [
        "linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%);",
        "linear-gradient(to top, #37ecba 0%, #72afd3 100%);",
        "linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%);",
        "linear-gradient(to top, #ebc0fd 0%, #d9ded8 100%);",
        "linear-gradient(to top, #dbdcd7 0%, #dddcd7 24%, #e2c9cc 30%, #e7627d 46%, #b8235a 59%, #801357 71%, #3d1635 84%, #1c1a27 100%);",
        "linear-gradient(to top, #f43b47 0%, #453a94 100%);",
        "linear-gradient(to top, #feada6 0%, #f5efef 100%);",
        "linear-gradient(to top, #c471f5 0%, #fa71cd 100%);",
        "linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%);",
        "linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%);",
      ][Math.floor(Math.random() * 10)];
      break;
    case "ANGERSNOW":
      gradient = [
        "linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%);",
        "linear-gradient(to top, #f43b47 0%, #453a94 100%);",
        "linear-gradient(to top, #c79081 0%, #dfa579 100%);",
        "linear-gradient(-20deg, #d558c8 0%, #24d292 100%);",
        "linear-gradient(to top, #0ba360 0%, #3cba92 100%);",
        "linear-gradient(to top, #feada6 0%, #f5efef 100%);",
        "linear-gradient(to top, #ebbba7 0%, #cfc7f8 100%);",
        "linear-gradient(to top, #dbdcd7 0%, #dddcd7 24%, #e2c9cc 30%, #e7627d 46%, #b8235a 59%, #801357 71%, #3d1635 84%, #1c1a27 100%);",
        "linear-gradient(to right, #f83600 0%, #f9d423 100%);",
      ][Math.floor(Math.random() * 10)];
      break;
    case "ANGERSTORM":
      gradient = [
        "linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%);",
        "#51538B",
        "#575A8B",
        "#5D608B",
        "#63668B",
        "linear-gradient(to right, #f9d423 0%, #ff4e50 100%);",
        "linear-gradient(-20deg, #d558c8 0%, #24d292 100%);",
        "linear-gradient(to top, #505285 0%, #585e92 12%, #65689f 25%, #7474b0 37%, #7e7ebb 50%, #8389c7 62%, #9795d4 75%, #a2a1dc 87%, #b5aee4 100%);",
        "linear-gradient(to top, #dbdcd7 0%, #dddcd7 24%, #e2c9cc 30%, #e7627d 46%, #b8235a 59%, #801357 71%, #3d1635 84%, #1c1a27 100%);",
        "linear-gradient(45deg, #8baaaa 0%, #ae8b9c 100%);",
      ][Math.floor(Math.random() * 10)];
      break;

    case "ANXIETYSUN":
      gradient = [
        "linear-gradient(to top, #fddb92 0%, #d1fdff 100%);",
        "linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%);",
        "linear-gradient(to right, #e4afcb 0%, #b8cbb8 0%, #b8cbb8 0%, #e2c58b 30%, #c2ce9c 64%, #7edbdc 100%);",
        "linear-gradient(to top, #dbdcd7 0%, #dddcd7 24%, #e2c9cc 30%, #e7627d 46%, #b8235a 59%, #801357 71%, #3d1635 84%, #1c1a27 100%);",
        "linear-gradient(to top, #c79081 0%, #dfa579 100%);",
        "linear-gradient(to right, #f83600 0%, #f9d423 100%);",
        "linear-gradient(to right, #f9d423 0%, #ff4e50 100%);",
        "linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%);",
        "linear-gradient(to top, #d299c2 0%, #fef9d7 100%);",
        "linear-gradient(120deg, #f093fb 0%, #f5576c 100%);",
      ][Math.floor(Math.random() * 10)];
      break;
    case "ANXIETYCLOUD":
      gradient = [
        "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);",
        "linear-gradient(45deg, #8baaaa 0%, #ae8b9c 100%);",
        "linear-gradient(-225deg, #5271C4 0%, #B19FFF 48%, #ECA1FE 100%);",
        "linear-gradient(to top, #3b41c5 0%, #a981bb 49%, #ffc8a9 100%);",
        "linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%);",
        "linear-gradient(-225deg, #AC32E4 0%, #7918F2 48%, #4801FF 100%);",
        "linear-gradient(to top, #4fb576 0%, #44c489 30%, #28a9ae 46%, #28a2b7 59%, #4c7788 71%, #6c4f63 86%, #432c39 100%);",
        "linear-gradient(to top, #0c3483 0%, #a2b6df 100%, #6b8cce 100%, #a2b6df 100%);",
        "linear-gradient(-20deg, #d558c8 0%, #24d292 100%);",
        "linear-gradient(to top, #c71d6f 0%, #d09693 100%);",
      ][Math.floor(Math.random() * 10)];
      break;
    case "ANXIETYRAIN":
      gradient = [
        "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);",
        "linear-gradient(to top, #37ecba 0%, #72afd3 100%);",
        "linear-gradient(-20deg, #2b5876 0%, #4e4376 100%);",
        "linear-gradient(-225deg, #CBBACC 0%, #2580B3 100%);",
        "linear-gradient(to top, #30cfd0 0%, #330867 100%);",
        "linear-gradient(135deg, #667eea 0%, #764ba2 100%);",
        "linear-gradient(to right, #a8caba 0%, #5d4157 100%);",
        "linear-gradient(60deg, #29323c 0%, #485563 100%);",
        "linear-gradient(-20deg, #2b5876 0%, #4e4376 100%);",
        "linear-gradient(45deg, #874da2 0%, #c43a30 100%);",
      ][Math.floor(Math.random() * 10)];
      break;
    case "ANXIETYSNOW":
      gradient = [
        "linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%);",
        "linear-gradient(to top, #505285 0%, #585e92 12%, #65689f 25%, #7474b0 37%, #7e7ebb 50%, #8389c7 62%, #9795d4 75%, #a2a1dc 87%, #b5aee4 100%);",
        "linear-gradient(60deg, #29323c 0%, #485563 100%);",
        "linear-gradient(to top, #3b41c5 0%, #a981bb 49%, #ffc8a9 100%);",
        "linear-gradient(-225deg, #CBBACC 0%, #2580B3 100%);",
        "linear-gradient(to top, #dad4ec 0%, #dad4ec 1%, #f3e7e9 100%);",
        "linear-gradient(to top, #3b41c5 0%, #a981bb 49%, #ffc8a9 100%);",
        "linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%);",
        "linear-gradient(to top, #d5dee7 0%, #ffafbd 0%, #c9ffbf 100%);",
        "linear-gradient(to right, #243949 0%, #517fa4 100%);",
      ][Math.floor(Math.random() * 10)];
      break;
    case "ANXIETYSTORM":
      gradient = [
        "linear-gradient(to top, #4fb576 0%, #44c489 30%, #28a9ae 46%, #28a2b7 59%, #4c7788 71%, #6c4f63 86%, #432c39 100%);",
        "linear-gradient(to top, #30cfd0 0%, #330867 100%);",
        "linear-gradient(15deg, #13547a 0%, #80d0c7 100%);",
        "linear-gradient(-60deg, #16a085 0%, #f4d03f 100%);",
        "linear-gradient(to top, #3b41c5 0%, #a981bb 49%, #ffc8a9 100%);",
        "linear-gradient(-225deg, #CBBACC 0%, #2580B3 100%);",
        "inear-gradient(to top, #cc208e 0%, #6713d2 100%);",
        "linear-gradient(to right, #f9d423 0%, #ff4e50 100%);",
        "linear-gradient(to top, #0250c5 0%, #d43f8d 100%);",
        "linear-gradient(to top, #dbdcd7 0%, #dddcd7 24%, #e2c9cc 30%, #e7627d 46%, #b8235a 59%, #801357 71%, #3d1635 84%, #1c1a27 100%);",
      ][Math.floor(Math.random() * 10)];
      break;

    case "LOVESUN":
      gradient = [
        "linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%);",
        "linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%);",
        "linear-gradient(120deg, #f6d365 0%, #fda085 100%);",
        "linear-gradient(to top, #f77062 0%, #fe5196 100%);",
        "linear-gradient(to top, #e8198b 0%, #c7eafd 100%);",
        "linear-gradient(to right, #ffc3a0 0%, #ffafbd 100%);",
        "linear-gradient(-225deg, #B6CEE8 0%, #F578DC 100%);",
        "linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%);",
        "linear-gradient(to top, #d5dee7 0%, #ffafbd 0%, #c9ffbf 100%);",
        "linear-gradient(-45deg, #FFC796 0%, #FF6B95 100%);",
      ][Math.floor(Math.random() * 10)];
      break;
    case "LOVECLOUD":
      gradient = [
        "linear-gradient(to top, #fddb92 0%, #d1fdff 100%);",
        "linear-gradient(to top, #d9afd9 0%, #97d9e1 100%);",
        "linear-gradient(to top, #9795f0 0%, #fbc8d4 100%);",
        "linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%);",
        "linear-gradient(to top, #f77062 0%, #fe5196 100%);",
        "linear-gradient(to top, #dfe9f3 0%, white 100%);",
        "linear-gradient(to top, #dfe9f3 0%, white 100%);",
        "linear-gradient(-225deg, #2CD8D5 0%, #C5C1FF 56%, #FFBAC3 100%);",
        "#ECECEC",
        "#EEEEEE",
      ][Math.floor(Math.random() * 10)];
      break;
    case "LOVERAIN":
      gradient = [
        "linear-gradient(to top, #a8edea 0%, #fed6e3 100%);",
        "linear-gradient(to top, #e8198b 0%, #c7eafd 100%);",
        "linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%);",
        "linear-gradient(-225deg, #2CD8D5 0%, #C5C1FF 56%, #FFBAC3 100%);",
        "linear-gradient(to top, #9be15d 0%, #00e3ae 100%);",
        "linear-gradient(to top, #d5dee7 0%, #ffafbd 0%, #c9ffbf 100%);",
        "linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%);",
        "linear-gradient(to right, #74ebd5 0%, #9face6 100%);",
        "linear-gradient(to top, #d9afd9 0%, #97d9e1 100%);",
      ][Math.floor(Math.random() * 10)];
      break;
    case "LOVESNOW":
      gradient = [
        "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);",
        "linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);",
        "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);",
        "linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%);",
        "linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%);",
        "linear-gradient(to top, #d5dee7 0%, #ffafbd 0%, #c9ffbf 100%);",
        "linear-gradient(to top, #e8198b 0%, #c7eafd 100%);",
        "linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%);",
        "linear-gradient(to top, #d9afd9 0%, #97d9e1 100%);",
        "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);",
      ][Math.floor(Math.random() * 10)];
      break;
    case "LOVESTORM":
      gradient = [
        "linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%);",
        "linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%);",
        "linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%);",
        "linear-gradient(120deg, #f093fb 0%, #f5576c 100%);",
        "linear-gradient(to top, #ff0844 0%, #ffb199 100%);",
        "linear-gradient(120deg, #f093fb 0%, #f5576c 100%);",
        "linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%);",
        "linear-gradient(to top, #c471f5 0%, #fa71cd 100%);",
        "linear-gradient(to top, #c71d6f 0%, #d09693 100%);",
        "linear-gradient(-225deg, #A445B2 0%, #D41872 52%, #FF0066 100%);",
      ][Math.floor(Math.random() * 10)];
      break;

    case "EXPECTSUN":
      gradient = [
        "linear-gradient(to right, #92fe9d 0%, #00c9ff 100%);",
        "linear-gradient(to top, #ff0844 0%, #ffb199 100%);",
        "linear-gradient(to top, #f77062 0%, #fe5196 100%);",
        "linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%);",
        "linear-gradient(to top, #d5dee7 0%, #ffafbd 0%, #c9ffbf 100%);",
        "linear-gradient(-225deg, #A445B2 0%, #D41872 52%, #FF0066 100%);",
        "linear-gradient(to top, #e14fad 0%, #f9d423 100%);",
        "linear-gradient(to top, #d5dee7 0%, #ffafbd 0%, #c9ffbf 100%);",
        "linear-gradient(to right, #92fe9d 0%, #00c9ff 100%);",
        "linear-gradient(to right, #fa709a 0%, #fee140 100%);",
      ][Math.floor(Math.random() * 10)];
      break;
    case "EXPECTCLOUD":
      gradient = [
        "linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%);",
        "linear-gradient(to right, #92fe9d 0%, #00c9ff 100%);",
        "linear-gradient(to top, #d9afd9 0%, #97d9e1 100%);",
        "linear-gradient(to top, #9795f0 0%, #fbc8d4 100%);",
        "linear-gradient(to top, #accbee 0%, #e7f0fd 100%);",
        "linear-gradient(to top, #ebc0fd 0%, #d9ded8 100%);",
        "linear-gradient(to top, #a8edea 0%, #fed6e3 100%);",
        "linear-gradient(to top, #bdc2e8 0%, #bdc2e8 1%, #e6dee9 100%);",
        "linear-gradient(to top, #dad4ec 0%, #dad4ec 1%, #f3e7e9 100%);",
        "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);",
      ][Math.floor(Math.random() * 10)];
      break;
    case "EXPECTRAIN":
      gradient = [
        "linear-gradient(to top, #4fb576 0%, #44c489 30%, #28a9ae 46%, #28a2b7 59%, #4c7788 71%, #6c4f63 86%, #432c39 100%);",
        "linear-gradient(to top, #accbee 0%, #e7f0fd 100%);",
        "linear-gradient(to top, #00c6fb 0%, #005bea 100%);",
        "linear-gradient(to top, #7028e4 0%, #e5b2ca 100%);",
        "linear-gradient(to right, #0acffe 0%, #495aff 100%);",
        "linear-gradient(-20deg, #6e45e2 0%, #88d3ce 100%);",
        "linear-gradient(to top, #dad4ec 0%, #dad4ec 1%, #f3e7e9 100%);",
        "linear-gradient(to right, #0acffe 0%, #495aff 100%);",
        "linear-gradient(60deg, #3d3393 0%, #2b76b9 37%, #2cacd1 65%, #35eb93 100%);",
        "linear-gradient(to top, #b224ef 0%, #7579ff 100%);",
      ][Math.floor(Math.random() * 10)];
      break;
    case "EXPECTSNOW":
      gradient = [
        "linear-gradient(to top, #accbee 0%, #e7f0fd 100%);",
        "linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%);",
        "linear-gradient(-225deg, #2CD8D5 0%, #C5C1FF 56%, #FFBAC3 100%);",
        "linear-gradient(to top, #dad4ec 0%, #dad4ec 1%, #f3e7e9 100%);",
        "linear-gradient(to top, #bdc2e8 0%, #bdc2e8 1%, #e6dee9 100%);",
        "linear-gradient(to top, #dfe9f3 0%, white 100%);",
        "linear-gradient(-225deg, #2CD8D5 0%, #C5C1FF 56%, #FFBAC3 100%);",
        "linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%);",
        "linear-gradient(-225deg, #5D9FFF 0%, #B8DCFF 48%, #6BBBFF 100%);",
        "linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%);",
      ][Math.floor(Math.random() * 10)];
      break;
    case "EXPECTSTORM":
      gradient = [
        "linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%);",
        "linear-gradient(to top, #c471f5 0%, #fa71cd 100%);",
        "linear-gradient(to top, #0250c5 0%, #d43f8d 100%);",
        "linear-gradient(to top, #7028e4 0%, #e5b2ca 100%);",
        "linear-gradient(to top, #f43b47 0%, #453a94 100%);",
        "linear-gradient(-225deg, #5271C4 0%, #B19FFF 48%, #ECA1FE 100%);",
        "linear-gradient(-225deg, #A445B2 0%, #D41872 52%, #FF0066 100%);",
        "linear-gradient(-225deg, #FF3CAC 0%, #562B7C 52%, #2B86C5 100%);",
        "linear-gradient(-225deg, #FF057C 0%, #7C64D5 48%, #4CC3FF 100%);",
        "linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%);",
      ][Math.floor(Math.random() * 10)];
      break;
  }

  const navigate = useNavigate();
  const onShareButton = async () => {
    const message = {
      question: `${feelTag.feelTag.text}\n${GenreTag.GenreTag.text}\n${WeatherTag.WeatherTag.text}\n${userInput.inputText}`,
      answer: answer.answer,
      feelTag: `${feelTag.feelTag.tag}`,
      weatherTag: `${WeatherTag.WeatherTag.tag}`,
      genreTag: `${GenreTag.GenreTag.tag}`,
      gradient: gradient,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/post`,
        message,
        {
          headers: {
            Access_Token: `Bearer ${Cookies.get("auth")}`,
          },
        }
      );


      if (response.data.status === "OK") {
        const detailUrl = `/Detail/${response.data.data}`;
        navigate(detailUrl);
        feelTag.setFeelTag("");
        GenreTag.setGenreTag("");
        WeatherTag.setWeatherTag("");
        answer.setAnswerGpt("");
        userInput.setInputText("");
      }
    } catch (error) {
      toast.error("게시글 등록에 실패했습니다!");
    }
  };

  return (
    <div className="sidebar flex flex-col justify-between">
      <div className="flex flex-col justify-around">
        <Sidenav />
        {/* <Search /> */}
        {Object.values(today).map((today) => (
          <Select key={today.id} item={today} />
        ))}
      </div>
      <div>
        <button
          className="w-full bg-violet-300 py-3 text-lg"
          onClick={onShareButton}
        >
          공유하기
        </button>
      </div>
      
    </div>
  );
};

export default Side;
