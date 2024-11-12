import React from "react";
import { Link } from "react-router-dom";
import "./News.css"; // Ensure News.css exists and is styled similarly to Blog.css
import realEstateImg from "./assets/real_estate.jpg";

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

      <footer className="footer">
        <img
          src="./src/assets/logo.png"
          alt="Mindsphere Logo"
          className="mindsphere-logo"
        />
        <nav className="footer-nav">
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/programmes">Programmes</a>
          <a href="/privacy-policy">Privacy Policy</a>
        </nav>
        <div className="social-media">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>
        <address>
          60 Paya Lebar Road, #07-54 Paya Lebar Square, Singapore 409501
        </address>
        <p>
          Copyright © 2024 Mindsphere Singapore Pte. Ltd. All rights reserved.
        </p>
      </footer>
    </section>
  );
};

export default News;
