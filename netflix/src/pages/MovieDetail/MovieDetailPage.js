import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import "./MovieDetailPage.style.css";
import { Badge } from "react-bootstrap";

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useMovieDetailQuery({ id });
  console.log(data);
  return (
    <Container>
      <Row>
        <Col className="center-col">
          <div
            style={{
              backgroundImage:
                "url(" +
                `https://image.tmdb.org/t/p/w300_and_h450_bestv2${data?.poster_path}` +
                ")",
            }}
            className="detail-img"
          ></div>
        </Col>
        <Col>
          <div>
            {data?.genres.map((id, name) => (
              <Badge bg="danger" key={id.id} style={{ margin: "5px" }}>
                {id.name}
              </Badge>
            ))}
            <h1 style={{ color: "white" }}>{data?.title}</h1>
            <div className="overview-box">
              <h4 style={{ color: "white" }}>줄거리</h4>
              <p style={{ color: "white" }}>{data?.overview}</p>
            </div>
            <Row>
              <Col className="left-col">개봉일</Col>
              <Col className="right-col">{data?.release_date}</Col>
            </Row>
            <Row>
              <Col className="left-col">상영시간</Col>
              <Col className="right-col">{data?.runtime}분</Col>
            </Row>
            <Row>
              <Col className="left-col">평점</Col>
              <Col className="right-col">{data?.vote_average}</Col>
            </Row>
            <Row>
              <Col className="left-col">인기</Col>
              <Col className="right-col">{data?.popularity}</Col>
            </Row>
            <Row>
              <Col className="left-col">상영연령</Col>
              <Col className="right-col">{data?.adult ? "over18" : "under18"}</Col>
            </Row>
            <Row>
              <Col className="left-col">예산</Col>
              <Col className="right-col">{data?.budget.toLocaleString("en-US", { style: "currency", currency: "USD" })}</Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1 style={{ color: "white" }}>리뷰</h1>
          <div>
              <h4 style={{ color: "white" }}>리뷰 제목</h4>
              <p style={{ color: "white" }}>{data?.tagline}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetailPage;
