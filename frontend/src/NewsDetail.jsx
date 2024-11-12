import React from "react";
import { useParams } from "react-router-dom";
import newsArticles from "./assets/news"; // Import the hardcoded news data
import Footer from "./Footer"; // Import the Footer component
import "./NewsDetail.css"; // Link to the CSS file

const NewsDetail = () => {
  const { id } = useParams();
  const article = newsArticles.find((item) => item.id === parseInt(id));

  if (!article) return <p>News article not found.</p>;

  return (
    <div className="news-detail">
      <img src={article.image} alt={article.title} className="detail-image" />
      <h1>{article.title}</h1>
      <span className="detail-date">{article.date}</span>
      <span className="detail-source">{article.source}</span>
      <div className="detail-content">
        {article.content.split("\n\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {/* Add Footer component here */}
      <Footer />
    </div>
  );
};

export default NewsDetail;
