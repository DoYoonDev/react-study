import { useState } from "react";
import "./Review.style.css";

const Review = ({ author, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const previewLength = 150;
  const isLong = content.length > previewLength;

  return (
    <div className="review-card">
      <h4 className="review-author">{author}의 리뷰</h4>
      <p className="review-content">
        {isExpanded || !isLong
          ? content
          : content.slice(0, previewLength) + "..."}
      </p>
      {isLong && (
        <button className="review-toggle" onClick={toggleExpanded}>
          {isExpanded ? "접기 ▲" : "더보기 ▼"}
        </button>
      )}
    </div>
  );
};

export default Review;
