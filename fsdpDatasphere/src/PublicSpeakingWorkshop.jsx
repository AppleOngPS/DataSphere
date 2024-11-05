import React from "react";
import "./PublicSpeakingWorkshop.css";

const PublicSpeakingWorkshop = () => {
  const navigate = useNavigate();

  const handleBuyProgramme = () => {
    // Redirect to the payment page
    navigate("/payment");
  };

  return (
    <section className="workshop-container">
      <h2 className="workshop-title">Public Speaking Workshops</h2>
      <p className="workshop-description">
        We identify with what makes a speaker influential and his presence
        compelling.
      </p>
      <p className="workshop-description">
        Our tiered public speaking workshops are thoughtfully designed to
        transform your child into a seasoned stage storyteller through
        comprehensive training.
      </p>
      <p className="workshop-description">
        From dynamic activities to ample stage time, your child will acquire the
        skills and confidence to shine under the spotlight.
      </p>
      <p className="workshop-description">
        Watch them thrive as they learn the art and science of impactful
        speaking in a supportive and energetic environment.
      </p>
      <p className="workshop-description">
        Gift your child a breakthrough in powerful communication today, reach
        out to us for the programme synopsis and workshop coverage!
      </p>

      <div className="program-cards">
        {/* Card 1 */}
        <div className="program-card">
          <h3 className="program-price">$788*</h3>
          <p className="program-original-price">Was $988</p>
          <p className="program-level">Beginner</p>
          <p className="program-details">Just getting started.</p>
          <button className="program-button" onClick={handleBuyProgramme}>
            Buy Programme
          </button>
        </div>

        {/* Card 2 */}
        <div className="program-card program-card-highlight">
          <h3 className="program-price">$988*</h3>
          <p className="program-original-price">Was $1188</p>
          <p className="program-level">Beginner</p>
          <p className="program-details">Just getting started.</p>
          <button
            className="program-button program-button-highlight"
            onClick={handleBuyProgramme}
          >
            Buy Programme
          </button>
        </div>

        {/* Card 3 */}
        <div className="program-card">
          <h3 className="program-price">$1388*</h3>
          <p className="program-level">Beginner</p>
          <p className="program-details">Just getting started.</p>
          <button className="program-button" onClick={handleBuyProgramme}>
            Buy Programme
          </button>
        </div>
      </div>
    </section>
  );
};

export default PublicSpeakingWorkshop;
