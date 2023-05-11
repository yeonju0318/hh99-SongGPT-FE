import axios from "axios";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { changeProfile } from "../api/auth";
import useCloudinaryUrl from "../hooks/useCloudinaryUrl";
import { Image } from "cloudinary-react";
import { toast } from "react-hot-toast";
import AWS from "aws-sdk"
import Cookies from "js-cookie";


function Profile() {
  //AWS이미지 업로드
  const region = "ap-northeast-2";
  const bucket = "song-github-actions-s3-bucket";

  AWS.config.update({
    region: region,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  });

  const handleFileInput = async (e) => {
    const file = e.target.files[0];
    console.log(file)
    await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/member/profile`,
      {
        image:"123",
      },
      {
        headers: {
          Access_Token: `Bearer ${Cookies.get("auth")}`,
        },
      }
    );

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: bucket, // 버킷 이름
        Key: "123" + ".png", // 유저 아이디
        Body: file, // 파일 객체
      },
    });

    const promise = upload.promise();
    promise.then(
      function () {
        // 이미지 업로드 성공
        window.setTimeout(function () {
          window.location.reload();
        }, 2000);
      },
      function (err) {
        toast.error(err.response.data.message);
        // 이미지 업로드 실패
      }
    );
  };

  // 클라우디너리에 이미지 업로드하는 코드
  const cloudinaryUrl = useCloudinaryUrl();
  const [imageSelected, setImageSelected] = useState(null);
  const [publicId, setPublicId] = useState(null);

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "tuwroqix");

    return axios
      .post("https://api.cloudinary.com/v1_1/dsav9fenu/image/upload", formData)
      .then((response) => {
        setPublicId(response.data.public_id);
        return response.data.url;
      });
  };

  // react-query
  const queryClient = useQueryClient();
  const profileMutation = useMutation(changeProfile, {});

  // 프로필사진 변경하는 요청
  const handleSubmitButtonClick = async (event) => {
    try {
      const imageUrl = await uploadImage();
      profileMutation.mutate(imageUrl);
      setImageSelected(null);
      setPublicId(null);
      cloudinaryUrl.cloudinaryUrl = "";
    } catch (error) {
      toast.error("이미지 업로드에 실패했습니다.");
    }
  };

  return (
    <>
      <div className="justify-center items-center flex inset-0 outline-none focus:outline-none ">
        <div className=" w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto  ">
          {/* CONTENT */}

          <div className={`translate duration-300 h-full`}>
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
              <div style={{ gap: "1px" }}>
                {publicId ? (
                  <Image
                    style={{ width: "100%" }}
                    cloudName="dsav9fenu"
                    publicId={publicId}
                  />
                ) : (
                  <div className="flex flex-col justify-center items-center">
                    <img
                      className="w-[200px] h-[200px] "
                      src={process.env.PUBLIC_URL + "/imgs/placeholder.jpg"}
                    />
                    <div> 이미지를 등록해주세요!</div>
                  </div>
                )}
                <div className="flex justify-end mt-2 gap-3">
                  <input
                  // onClick={handleFileInput}
                    onChange={
                      handleFileInput
                    //   (e) => {
                    //   setImageSelected(e.target.files[0]);
                    // }
                  }
                    type="file"
                    class="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100
                  "
                  />

                  <button
                    className={` rounded-lg hover:opacity-80 transition w-20
                        bg-blue-500 border-blue-500 text-white py-0.5 text-sm font-semibold border-2 
                        `}
                    onClick={
                      
                      uploadImage
                    }
                  >
                    미리보기
                  </button>
                </div>
                <button
                  className={`mt-1 rounded-lg hover:opacity-80 transition w-full
                bg-blue-500 border-blue-500 text-white py-0.5 text-sm font-semibold border-2 
                `}
                  onClick={handleSubmitButtonClick}
                >
                  프로필사진 변경하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
