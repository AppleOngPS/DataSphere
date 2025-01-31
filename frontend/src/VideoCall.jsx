// src/pages/VideoCall.jsx
import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Navbar from "./assets/components/Navbar";
import "../src/assets/components/Navbar.jsx";

export default function VideoCall() {
  const dailyRoomUrl = "https://mindsphere.daily.co/Jayden";

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
