import React from "react";
import "./News.css";
import realEstateImg from "./assets/real_estate.jpg"; // Import the image

const News = () => {
  const newsArticles = [
    {
      date: "3 September 2024",
      source: "PRNewswire",
      title:
        "Real Estate Veteran Leverages Two Decades of Training Expertise to Transform Education with Mindsphere Singapore",
      image: realEstateImg, // Use imported image
      readTime: "2-mins read",
    },
  ];

  return (
    <div className="news-page">
      <header className="news-header">
        <h1>News</h1>
        <p>Stay tuned for more updates here</p>
      </header>
      <div className="news-articles">
        {newsArticles.map((article, index) => (
          <div className="news-article" key={index}>
            <img
              src={article.image}
              alt={article.title}
              className="article-image"
            />
            <div className="article-content">
              <span className="article-date">{article.date}</span>
              <span className="article-source">{article.source}</span>
              <h2 className="article-title">{article.title}</h2>
              <p className="article-read-time">{article.readTime}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
