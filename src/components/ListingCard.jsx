import React from "react";
import {  useNavigate } from "react-router-dom";
import styled from "styled-components";
import LikeButton from "./LikeButton";

function ListingCard({
  id,
  feel,
  weather,
  genre,
  likeStatus,
  likeCount,
  likeLists,
  gradient,
}) {
  const navigate = useNavigate();

  return (
    <div className="group col-span-1 cursor-pointer">
      <div className="flex flex-col gap-2 w-full animate-slideup ">
        <div
          onClick={(e) => { navigate(`/detail/${id}`);
          }}
        >
          <div className="aspect-square w-full relative overflow-hidden rounded-xl">
            <StyledDiv gradient={gradient} />

            <div className="absolute top-3 right-3">
              <LikeButton
                likeStatus={likeStatus}
                likeCount={likeCount}
                itemId={id}
                likeLists={likeLists}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="flex">
            <button className="text-xs lg:text-sm  sm:font ">{`#${feel} `}</button>
            <button className="text-xs lg:text-sm  pl-3">
              {`#${weather} `}{" "}
            </button>
            <button className="text-xs lg:text-sm  pl-3">
              {`#${genre} `}{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const StyledDiv = styled.div`
  background-image: ${(props) => props.gradient};
  width: 100%;
  height: 100%;
`;

export default ListingCard;
