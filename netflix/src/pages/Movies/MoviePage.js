import React, { useState, useEffect } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import { Alert, Container, Row, Col, Form } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import Spinner from "react-bootstrap/Spinner";
import ReactPaginate from "react-paginate";

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const pageParam = parseInt(query.get("page")) || 1;
  const [page, setPage] = useState(pageParam);
  const [genre, setGenre] = useState("");
  const [sortOrder, setSortOrder] = useState("popularity.desc");
  const keyword = query.get("q");
  const MAX_PAGE = 500;
  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
    genre,
    sortOrder,
  });

  const handlePageClick = ({ selected }) => {
    const newPage = selected + 1;
    setPage(selected + 1);
    setQuery({ 
      q: keyword ?? "", 
      page: newPage.toString(), 
      genre: genre ?? "", 
      sortOrder: sortOrder ?? "popularity.desc"
    });
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

  console.log(data);

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
            <Form.Select aria-label="정렬 기준" onChange={handleSortChange}>
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
            onPageChange={handlePageClick}
            pageRangeDisplayed={8}
            marginPagesDisplayed={1}
            pageCount={Math.min(30, Math.ceil((data?.total_results || 0) / 10))}
            previousLabel="< 이전"
            nextLabel="다음 >"
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
