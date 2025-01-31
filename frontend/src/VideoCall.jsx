// src/pages/VideoCall.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "./assets/logo.png"; // Make sure this path is correct

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
