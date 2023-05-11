import axios from "axios";
import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useQueries } from "react-query";
import { getPosts, getUserLikes } from "../api/post";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import ListingCard from "../components/ListingCard";
import useAllPosts from "../hooks/useAllPosts";
import useFeelCategories from "../hooks/useFeelCategories";
import useGenreCategories from "../hooks/useGenreCategories";
import useWeatherCategories from "../hooks/useWeatherCategories";

function Main() {
  const feelCategories = useFeelCategories();
  const weatherCategories = useWeatherCategories();
  const genreCategories = useGenreCategories();
  const allPosts = useAllPosts();
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
  let totalPage = unusePosts.data?.totalPage;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const feelTag = feelCategories.feelCategories;
  const weatherTag = weatherCategories.weatherCategories;
  const genreTag = genreCategories.genreCategories;

  useEffect(() => {
    const fetchData = async () => {
      let i = 0;
      let postArr = [];
      try {
        while (i < totalPage) {
          const response = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/board?page=${i}&size=12&sort=createdAt,DESC`
          );
          postArr.push(response.data.data.postResponseDtos);
          i++;
        }
      } catch (err) {
        console.log(err);
      }
      allPosts.setAllPosts(postArr.flat());
    };

    fetchData();
  }, []);

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
  }, [page, setPosts]);

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
  }, [inView, loading]);

  //전체 게시글 데이터

  if (unusePosts.isLoading || loading) {
    return <div>로딩중입니다</div>;
  }

  if (unusePosts.isError) {
    return <div>게시글을 불러오는데 오류가 발생했습니다.</div>;
  }

  if (posts.length === 0 || posts === undefined) {
    return (
      <>
        <div className="md:ml-48 absolute inset-x-0 flex justify-center ">
          <EmptyState />
        </div>
      </>
    );
  } else {
    // 모두 선택되지 않았을 때
    if (feelTag === null && weatherTag === null && genreTag === null) {
      return (
        <>
          <Container>
            <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  2xl:grid-cols-6 gap-8">
              {posts.flat().map((item) => {
                return (
                  <>
                    <ListingCard
                      id={item.id}
                      feel={item?.feelTag}
                      weather={item?.weatherTag}
                      genre={item?.genreTag}
                      likeStatus={userLikes.data?.includes(item.id)}
                      likeCount={item?.likeCount}
                      gradient={item?.gradient}
                    />
                  </>
                );
              })}
            </div>
          </Container>
          <div ref={ref}></div>
        </>
      );
    } else if (feelTag !== null && weatherTag === null && genreTag === null) {
      // feel Tag만 선택
      let filteredArr = allPosts.allPosts.filter(
        (item) => item.feelTag === feelTag
      );
      if (filteredArr.length === 0 || filteredArr === undefined) {
        return (
          <>
            <div className="md:ml-48 absolute inset-x-0 flex justify-center ">
              <EmptyState showReset={true} />
            </div>
          </>
        );
      } else {
        return (
          <>
            <Container>
              <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  2xl:grid-cols-6 gap-8">
                {filteredArr.map((item) => {
                  return (
                    <>
                      <ListingCard
                        id={item.id}
                        feel={item?.feelTag}
                        weather={item?.weatherTag}
                        genre={item?.genreTag}
                        likeStatus={userLikes.data?.includes(item.id)}
                        likeCount={item?.likeCount}
                        gradient={item?.gradient}
                      />
                    </>
                  );
                })}
              </div>
            </Container>
            <div ref={ref}></div>
          </>
        );
      }
    } else if (feelTag === null && weatherTag !== null && genreTag === null) {
      // weather Tag만 선택
      let filteredArr = allPosts.allPosts.filter(
        (item) => item.weatherTag === weatherTag
      );
      if (filteredArr.length === 0 || filteredArr === undefined) {
        return (
          <>
            <div className="md:ml-48 absolute inset-x-0 flex justify-center ">
              <EmptyState showReset={true} />
            </div>
          </>
        );
      } else {
        return (
          <>
            <Container>
              <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  2xl:grid-cols-6 gap-8">
                {filteredArr.map((item) => {
                  return (
                    <>
                      <ListingCard
                        id={item.id}
                        feel={item?.feelTag}
                        weather={item?.weatherTag}
                        genre={item?.genreTag}
                        likeStatus={userLikes.data?.includes(item.id)}
                        likeCount={item?.likeCount}
                        gradient={item?.gradient}
                      />
                    </>
                  );
                })}
              </div>
            </Container>
            <div ref={ref}></div>
          </>
        );
      }
    } else if (feelTag === null && weatherTag === null && genreTag !== null) {
      // genre Tag만 선택
      let filteredArr = allPosts.allPosts.filter(
        (item) => item.genreTag === genreTag
      );
      if (filteredArr.length === 0 || filteredArr === undefined) {
        return (
          <>
            <div className="md:ml-48 absolute inset-x-0 flex justify-center ">
              <EmptyState showReset={true} />
            </div>
          </>
        );
      } else {
        return (
          <>
            <Container>
              <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  2xl:grid-cols-6 gap-8">
                {filteredArr.map((item) => {
                  return (
                    <>
                      <ListingCard
                        id={item.id}
                        feel={item?.feelTag}
                        weather={item?.weatherTag}
                        genre={item?.genreTag}
                        likeStatus={userLikes.data?.includes(item.id)}
                        likeCount={item?.likeCount}
                        gradient={item?.gradient}
                      />
                    </>
                  );
                })}
              </div>
            </Container>
            <div ref={ref}></div>
          </>
        );
      }
    } else if (feelTag !== null && weatherTag !== null && genreTag === null) {
      // feelTag, weatherTag 선택
      let filteredArr = allPosts.allPosts
        .filter((item) => item.feelTag === feelTag)
        .filter((item) => item.weatherTag === weatherTag);
      if (filteredArr.length === 0 || filteredArr === undefined) {
        return (
          <>
            <div className="md:ml-48 absolute inset-x-0 flex justify-center ">
              <EmptyState showReset={true} />
            </div>
          </>
        );
      } else {
        return (
          <>
            <Container>
              <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  2xl:grid-cols-6 gap-8">
                {filteredArr.map((item) => {
                  return (
                    <>
                      <ListingCard
                        id={item.id}
                        feel={item?.feelTag}
                        weather={item?.weatherTag}
                        genre={item?.genreTag}
                        likeStatus={userLikes.data?.includes(item.id)}
                        likeCount={item?.likeCount}
                        gradient={item?.gradient}
                      />
                    </>
                  );
                })}
              </div>
            </Container>
            <div ref={ref}></div>
          </>
        );
      }
    } else if (feelTag !== null && weatherTag === null && genreTag !== null) {
      // feelTag, genreTag 선택
      let filteredArr = allPosts.allPosts
        .filter((item) => item.feelTag === feelTag)
        .filter((item) => item.genreTag === genreTag);
      if (filteredArr.length === 0 || filteredArr === undefined) {
        return (
          <>
            <div className="md:ml-48 absolute inset-x-0 flex justify-center ">
              <EmptyState showReset={true} />
            </div>
          </>
        );
      } else {
        return (
          <>
            <Container>
              <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  2xl:grid-cols-6 gap-8">
                {filteredArr.map((item) => {
                  return (
                    <>
                      <ListingCard
                        id={item.id}
                        feel={item?.feelTag}
                        weather={item?.weatherTag}
                        genre={item?.genreTag}
                        likeStatus={userLikes.data?.includes(item.id)}
                        likeCount={item?.likeCount}
                        gradient={item?.gradient}
                      />
                    </>
                  );
                })}
              </div>
            </Container>
            <div ref={ref}></div>
          </>
        );
      }
    } else if (feelTag === null && weatherTag !== null && genreTag !== null) {
      // weatherTag, genreTag 선택
      let filteredArr = allPosts.allPosts
        .filter((item) => item.weatherTag === weatherTag)
        .filter((item) => item.genreTag === genreTag);
      if (filteredArr.length === 0 || filteredArr === undefined) {
        return (
          <>
            <div className="md:ml-48 absolute inset-x-0 flex justify-center ">
              <EmptyState showReset={true} />
            </div>
          </>
        );
      } else {
        return (
          <>
            <Container>
              <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  2xl:grid-cols-6 gap-8">
                {filteredArr.map((item) => {
                  return (
                    <>
                      <ListingCard
                        id={item.id}
                        feel={item?.feelTag}
                        weather={item?.weatherTag}
                        genre={item?.genreTag}
                        likeStatus={userLikes.data?.includes(item.id)}
                        likeCount={item?.likeCount}
                        gradient={item?.gradient}
                      />
                    </>
                  );
                })}
              </div>
            </Container>
            <div ref={ref}></div>
          </>
        );
      }
    } else if (feelTag !== null && weatherTag !== null && genreTag !== null) {
      // feelTag, weatherTag, genreTag 선택
      let filteredArr = allPosts.allPosts
        .filter((item) => item.feelTag === feelTag)
        .filter((item) => item.weatherTag === weatherTag)
        .filter((item) => item.genreTag === genreTag);
      if (filteredArr.length === 0 || filteredArr === undefined) {
        return (
          <>
            <div className="md:ml-48 absolute inset-x-0 flex justify-center ">
              <EmptyState showReset={true} />
            </div>
          </>
        );
      } else {
        return (
          <>
            <Container>
              <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  2xl:grid-cols-6 gap-8">
                {filteredArr.map((item) => {
                  return (
                    <>
                      <ListingCard
                        id={item.id}
                        feel={item?.feelTag}
                        weather={item?.weatherTag}
                        genre={item?.genreTag}
                        likeStatus={userLikes.data?.includes(item.id)}
                        likeCount={item?.likeCount}
                        gradient={item.gradient}
                      />
                    </>
                  );
                })}
              </div>
            </Container>
            <div ref={ref}></div>
          </>
        );
      }
    }
  }
}

export default Main;
