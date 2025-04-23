import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./Recommend.style.css"; 
import MovieCard from "../../../../common/MovieCard/MovieCard"; // 경로 수정

const Recommend = ({ recommendations }) => {
  const [visibleCount, setVisibleCount] = useState(8);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  if (!recommendations || recommendations.length === 0) {
    return <p>추천 영화가 없습니다.</p>;
  }

  const visibleRecommendations = recommendations.slice(0, visibleCount);

  return (
    <div className="recommend-section">
      <h3>추천 영화</h3>
      <Row>
        {visibleRecommendations.map((movie) => (
          <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>

      {/* 더보기 버튼 */}
      {visibleCount < recommendations.length && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={handleLoadMore}>
            더보기
          </button>
        </div>
      )}
    </div>
  );
};

export default Recommend;