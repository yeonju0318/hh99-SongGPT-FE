import { styled } from "styled-components";

const GPTLoading = () => {
  return (
    <>
      <Background>
        <LoadingText>노래를 고르고있어요!</LoadingText>
        <LoadingText>잠시만 기다려주세요.</LoadingText>
        <img src={process.env.PUBLIC_URL + "/imgs/spinner1.gif"} />
      </Background>
    </>
  );
};

export const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoadingText = styled.div`
  font: 1rem "Noto Sans KR";
  text-align: center;
`;

export default GPTLoading;
