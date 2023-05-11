import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useQueries } from "react-query";
import { getPosts, getUserLikes } from "../api/post";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import ListingCard from "../components/ListingCard";
import Loading from "../components/Loading";

function Like() {
  const [ref, inView] = useInView();
  const [unusePosts, userLikes] = useQueries(
    [
      { queryKey: "posts", queryFn: getPosts },
      { queryKey: "userLikes", queryFn: getUserLikes },
    ],
    {
      refetchOnWindowFocus: false,
    }
  );
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [likeLists, setLikeLists] = useState(null);

  useEffect(() => {
    const lists = posts?.filter(
      (item) => userLikes.data?.includes(item.id) === true
    );
    setLikeLists(lists);
  }, [posts, userLikes.data]);
  let totalPage = unusePosts.data?.totalPage;

  // 서버에서 아이템을 가지고 오는 함수
  const getItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/board?page=${page}&size=12&sort=createdAt,DESC`
      );
      const newPosts = response.data.data.postResponseDtos;
      setPosts([...posts, ...newPosts]);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, [page]);

  // `getItems` 가 바뀔 때 마다 함수 실행
  useEffect(() => {
    getItems();
  }, [getItems]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading && page < totalPage) {
      const newPage = page + 1;
      setPage(newPage);
    }
  }, [inView]);

  if (unusePosts.isLoading || userLikes.isLoading || loading) {
    return  <Loading/>;
  }

  if (unusePosts.isError || userLikes.isError) {
    return <div>게시글을 불러오는데 오류가 발생했습니다.</div>;
  }
  if (likeLists?.length === 0 || likeLists === undefined) {
    return (
      <>
        <div className="md:ml-48 absolute inset-x-0 flex justify-center ">
          <EmptyState />
        </div>
      </>
    );
  } else {
    return (
      <div ref={ref}>
        <Container>
          <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  2xl:grid-cols-6 gap-8">
            {likeLists &&
              likeLists.map((item) => {
                return (
                  <>
                    <ListingCard
                      id={item.id}
                      feel={item?.feelTag}
                      weather={item?.weatherTag}
                      genre={item?.genreTag}
                      likeStatus={userLikes.data?.includes(item.id)}
                      likeCount={item?.likeCount}
                      likeLists={likeLists}
                      gradient={item?.gradient}
                    />
                  </>
                );
              })}
          </div>
        </Container>
      </div>
    );
  }
}

export default Like;
