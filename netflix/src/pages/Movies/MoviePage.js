import React, { useState, useEffect } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import { Alert, Container, Row, Col, Form } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import Spinner from "react-bootstrap/Spinner";
import ReactPaginate from "react-paginate";

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState("");
  const [sortOrder, setSortOrder] = useState("popularity.desc");
  const keyword = query.get("q");
  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
    genre,
    sortOrder,
  });

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
    setQuery({ q: keyword, page: selected + 1 });
  };

  const handleGenreChange = (genre) => {
    setGenre(genre);
    setQuery({ q: "", page: 1 });
    setPage(1);
  };
  
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setPage(1);
  };


  useEffect(() => {
    if (keyword) setGenre("");
  }, [keyword]);

  if (isLoading) {
    return (
      <div className="spinner-area">
        <Spinner
          animation="border"
          variant="danger"
          style={{
            width: "3rem",
            height: "3rem",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    );
  }
  if (isError) {
    return <Alert variant="danger">Error: {error.message}</Alert>;
  }
  return (
    <Container>
      <Row>
        <Col lg={4} xs={12} className="mb-3">
          <Form.Group controlId="genreSelect">
            <Form.Label>장르 선택</Form.Label>
            <Form.Select
              aria-label="장르 선택"
              onChange={(e) => handleGenreChange(e.target.value)}
            >
              <option value="">장르 선택</option>
              <option value="28">액션</option>
              <option value="35">코미디</option>
              <option value="18">드라마</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="sortOrderSelect">
            <Form.Label>정렬 기준</Form.Label>
            <Form.Select
              aria-label="정렬 기준"
              onChange={handleSortChange}
            >
              <option value="popularity.desc">인기순</option>
              <option value="release_date.desc">최신순</option>
              <option value="vote_average.desc">평점순</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col lg={8} xs={12}>
          <Row>
            {data?.results.map((movie, index) => (
              <Col
                key={index}
                lg={4}
                sm={6}
                xs={12}
                className="d-flex justify-content-center"
              >
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={data?.total_pages} //전체페이지가 총 몇개인지?
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={page - 1}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
