import React from "react";
import { Link } from "react-router-dom";
import "./News.css"; // Ensure News.css exists and is styled similarly to Blog.css
import realEstateImg from "./assets/real_estate.jpg";
import Footer from "./Footer"; // Import Footer component

const News = () => {
  const newsArticles = [
    {
      id: 1,
      date: "3 September 2024",
      source: "PRNewswire",
      title: "Real Estate Veteran Leverages Two Decades of Training Expertise",
      image: realEstateImg,
      readTime: "2 minutes read",
    },
  ];

  return (
    <section className="news-page">
      <header className="news-header">
        <h1>News</h1>
        <p>Stay up-to-date with the latest industry news</p>
      </header>
      <div className="news-articles">
        {newsArticles.map((article) => (
          <Link
            to={`/news/${article.id}`}
            key={article.id}
            className="news-article-link"
          >
            <div className="news-article">
              <img
                src={article.image}
                alt={article.title}
                className="article-image"
              />
              <div className="article-info">
                <span className="article-date">{article.date}</span>
                <span className="article-source">{article.source}</span>
                <h2 className="article-title">{article.title}</h2>
                <p className="article-read-time">{article.readTime}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* Import and use Footer component */}
      <Footer />
    </section>
  );
};

export default News;
