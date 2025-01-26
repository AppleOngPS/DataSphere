// src/pages/homepage.jsx
// eslint-disable-next-line no-unused-vars
import React from "react";
import "./homepage.css"; // Ensure this CSS aligns with your design style
// eslint-disable-next-line no-unused-vars
import homeImage from "./assets/home.png"; // Import the main image
import Footer from "./Footer"; // Import the Footer component
import WatsonChat from "./WatsonChat"; // Import WatsonChat


// Import each logo (replace with actual paths if available)
import fundigoLogo from "./assets/fundigo.png";
import ieaLogo from "./assets/iea.png";
import jcuLogo from "./assets/jcu.png";
import orchidLogo from "./assets/orchid.png";
import classLivingLogo from "./assets/classLiving.png";
// eslint-disable-next-line no-unused-vars
import learningApproachImage from "./assets/logohome.png";
import GuyLogo from "./assets/homepageguy1.jpg";
// eslint-disable-next-line no-unused-vars
import Mindsphere from "./assets/logo.png";
import learningImg from "./assets/logoright.png";
import homeImg from "./assets/homeimg.jpg";

const Homepage = () => (
  <div className="hero-section">
    <div className="overlay">
      <img src={homeImg} alt="Mindsphere Conference" className="hero-image" />
      <p>
        Learn Impactful Speaking Skills From Seasoned Speakers
        <h2>We make it longer lasting</h2>
        <a href="https://api.whatsapp.com/send/?phone=6581804413&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
  <button className="cta-button">Learn How</button>
</a>

      </p>
    </div>

    {/* Trusted by local companies section */}
    <section className="trusted-section">
      <h2>Trusted by Local Companies</h2>
      <div className="trusted-logos">
        <img src={fundigoLogo} alt="Fundigo" className="company-logo" />
        <img src={ieaLogo} alt="IEA" className="company-logo" />
        <img
          src={jcuLogo}
          alt="James Cook University"
          className="company-logo"
        />
        <img
          src={orchidLogo}
          alt="Orchid Country Club"
          className="company-logo"
        />
        <img
          src={classLivingLogo}
          alt="Class Living"
          className="company-logo"
        />
      </div>
    </section>

    <section className="about-section">
      <h2>Our Story</h2>
      <p>
        With technology advancement at a rapid rate, the skills relevant for
        competency evolve continuously. As seasoned professionals in training
        and coaching, Simon and Christine face the challenge of innovating and
        tailoring their curriculum and methodologies to the different
        generations. After a spontaneous sharing of their vision with each
        other, Simon and Christine&apos;s common goals led to the birth of
        Mindsphere Singapore. A purpose driven by passion, Mindsphere is the
        union of their compassion, dedication and expertise in training and
        coaching. Together, the founding partners came out with the Learning
        Sphere which you will find incorporated in all our programmes and the
        Curriculum Pyramid which guides the development of our curriculum.
        Backed by their impressive training record, they have painstakingly
        designed the curriculum of our signature programmes from scratch. At
        Mindsphere, we constantly seek new methods and ideas to deliver
        effective teaching with workforce relevance in mind. Regardless how you
        define success, we believe every learner deserves a chance at it. We
        uphold the highest standards of integrity and ethics, and more than a
        learning hub, we are a community committed to fostering growth,
        inspiring confidence, and nurturing the leaders of tomorrow. We welcome
        you onboard our journey to shape the future, one mind at a time.
      </p>
    </section>

    <section className="programs-section">
      <h2>Our Learning Approach</h2>
      <h4>Inspiring our avid learners</h4>
      <div className="learning-approach-image">
        <img src={learningImg} alt="Our Learning Approach" />
      </div>
    </section>

    <div className="about-us">
      <header className="about-header">
        <h1>About Us</h1>
        <p>Introducing the leadership team and their journey.</p>
      </header>
      <section className="leadership-team">
        <img
          src="./src/assets/founders.png"
          alt="Leadership Team"
          className="leadership-image"
        />
        <div className="team-info">
          <h2>Simon, Founder</h2>
          <p>
            Simon has over 32 years of experience in real estate and
            international partnerships. He holds a Bachelor of Arts in Business
            Management from Kingston University and has pursued:
            <ul>
              <li>
                Cambridge International Diploma in Teaching and Training from
                the University of Cambridge
              </li>
              <li>
                Certified Professional Coach by the International Coaches
                Federation
              </li>
              <li>
                ACTA Certified Trainer by Singapore Workforce Skills
                Qualifications
              </li>
            </ul>
            He spent over a decade at OrangeTee & Tie Pte Ltd (OTT), one of
            Singapore&apos;s top real estate agencies, rising through the ranks
            to Board of Director and Chief Operating Officer where he trained
            thousands of real estate agents and team leaders. He spearheaded
            integration efforts during OTT&apos;s merger and acquisition,
            integrating over 95% of the salesforce, exceeding 1,000 salespeople.
            <br />
            <br />
            Always up for a challenge, Simon left OTT to become Managing
            Director at Singapore&apos;s first geospatial technology company
            Mogul.sg, securing a significant public-private partnership with the
            Ministry of National Development, marking a significant milestone in
            Singapore&apos;s real estate industry. This pioneer initiative sets
            a new standard for industry-government cooperation and drives
            sustainable urban development strategies.
            <br />
            <br />
            Currently, Simon serves as a consultant and advisor to several
            organizations in Singapore and is involved in entrepreneurship,
            driven by his mission to give back to society.
          </p>

          <h2>Christine, Co-Founder</h2>
          <p>
            Graduated with a Bachelor in Business Management from the Royal
            Melbourne Institute of Technology, Christine embodies multi-talent;
            she started teaching at the tender age of 17 and with patience as
            her strongest virtue, she advocates inclusive education for both
            neurotypical and special needs children. For close to 20 years now,
            she pursues her passion as an educator fervently, with an
            inclination towards guiding students who struggle with passing exams
            to eventually pass with flying colors. At 35, she took up the role
            of Adjunct Lecturer at the School of Business and Accountancy with
            Ngee Ann Polytechnic, extending her impact to adult teaching and
            motivating them to greater heights in their careers. She has
            impacted over 10,000 students to date.
            <br />
            <br />
            Concurrently, Christine hones her People skills through Business
            Development in the Banking and Finance sector. Currently a Talent
            Development Lead with the Singapore FinTech Association, she
            identifies with the sector’s hiring needs and gaps and commits to
            growing talents within Singapore to feed into the sector. Her
            expertise in both education and talent development harmonize
            complementarily, enabling her to become the bridge between employers
            and the future pillars of our economy.
          </p>
        </div>
      </section>

      <section>
        <h2 className="comments-title">Loved By Parents Locally</h2>
        <p className="comments-subtitle">
          Learning is easy when you focus on what truly matters.
        </p>
      </section>

      <section className="testimonials">
        <div className="testimonials-container">
          {/* Main testimonial */}
          <div className="main-testimonial">
            <img
              src={GuyLogo}
              alt="Main testimonial profile"
              className="testimonial-profile main-profile"
            />
            <blockquote>
              <p>
                &quot;From the time they joined, the growth has been amazing.
                Improving confidence, boosting grades—it all feels like magic.&quot;
              </p>
              <p className="testimonial-author">Becky Nelson</p>
              <div className="rating">
                <span>⭐️⭐️⭐️⭐️⭐️</span>
              </div>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Add Footer component here */}
      <Footer />
    </div>
      {/* Add WatsonChat here */}
      <WatsonChat />
  </div>
);

export default Homepage;
