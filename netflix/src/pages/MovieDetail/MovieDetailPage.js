import React, { useState } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import "./MovieDetailPage.style.css";
import { Badge, Button } from "react-bootstrap";
import Review from "./components/Review/Review";
import Recommend from "./components/Recommend/Recommend";
import { Tabs, Tab } from "react-bootstrap";

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useMovieDetailQuery({ id });
  const movieData = data?.movie;
  const reviewsData = data?.reviews;
  const recommendations = data?.recommendations;
  const videos = data?.videos;
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [show, setShow] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");

  const handleShow = () => {
    // 예고편만 필터링
    const trailers = videos?.filter(
      (video) => (video.type === "Trailer" || video.type === "Clip") && video.site === "YouTube"
    );

    if (trailers && trailers.length > 0) {
      const randomTrailer = trailers[Math.floor(Math.random() * trailers.length)];
      setTrailerKey(randomTrailer.key);
      setShow(true);
    } else {
      alert("예고편이 없습니다.");
    }
  };

  const handleClose = () => {
    setShow(false);
    setTrailerKey("");
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <Container>
      <Row>
        <Col className="center-col">
          <div
            style={{
              backgroundImage:
                "url(" +
                `https://image.tmdb.org/t/p/w300_and_h450_bestv2${movieData?.poster_path}` +
                ")",
            }}
            className="detail-img"
          ></div>
        </Col>
        <Col>
          <div>
            {movieData?.genres.map((id, name) => (
              <Badge bg="danger" key={id.id} style={{ margin: "5px" }}>
                {id.name}
              </Badge>
            ))}
            <h1 style={{ color: "white" }}>{movieData?.title}</h1>
            <div className="overview-box">
              <h4 style={{ color: "white" }}>줄거리</h4>
              <p style={{ color: "white" }}>{movieData?.overview}</p>
            </div>
            <Row>
              <Col className="left-col">개봉일</Col>
              <Col className="right-col">{movieData?.release_date}</Col>
            </Row>
            <Row>
              <Col className="left-col">상영시간</Col>
              <Col className="right-col">{movieData?.runtime}분</Col>
            </Row>
            <Row>
              <Col className="left-col">평점</Col>
              <Col className="right-col">{movieData?.vote_average}</Col>
            </Row>
            <Row>
              <Col className="left-col">인기</Col>
              <Col className="right-col">{movieData?.popularity}</Col>
            </Row>
            <Row>
              <Col className="left-col">상영연령</Col>
              <Col className="right-col">
                {movieData?.adult ? "over18" : "under18"}
              </Col>
            </Row>
            <Row>
              <Col className="left-col">예산</Col>
              <Col className="right-col">
                {movieData?.budget.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Row className="row-center">
        <Col>
          <div className="button-wrapper">
            <Button
              variant="primary"
              onClick={handleShow}
              className="mb-3"
            >
              예고편 보기
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Tabs
            defaultActiveKey="review"
            id="movie-detail-tabs"
            className="mb-3"
            variant="pills"
            fill
          >
            <Tab eventKey="review" title="리뷰">
              {reviewsData?.length > 0 ? (
                reviewsData.map((review, index) => (
                  <Review
                    key={index}
                    author={review.author}
                    content={review.content}
                  />
                ))
              ) : (
                <p style={{ color: "#ccc" }}>리뷰가 없습니다.</p>
              )}
            </Tab>
            <Tab eventKey="recommend" title="추천 영화">
              <Recommend recommendations={recommendations} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        centered
        contentClassName="trailer-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>🎞️ 영화 예고편</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {trailerKey && (
            <div className="video-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="YouTube Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MovieDetailPage;
