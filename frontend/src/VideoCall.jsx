// src/pages/VideoCall.jsx
import React from "react";
import Footer from "./Footer";

export default function VideoCall() {
  const dailyRoomUrl = "https://mindsphere.daily.co/Jayden"; // Replace with an actual Daily.co room URL

  return (
    <div className="container">
      <h1>Coaching Session</h1>
      <iframe
        title="Daily Video Call"
        src={dailyRoomUrl}
        allow="camera; microphone; fullscreen; display-capture"
        style={{ width: "100%", height: "70vh", border: "none" }}
      />
    </div>
  );
}
