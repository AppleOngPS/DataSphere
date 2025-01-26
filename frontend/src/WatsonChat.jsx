// src/components/WatsonChat.jsx
import React, { useEffect } from "react";

const WatsonChat = () => {
  useEffect(() => {
    window.watsonAssistantChatOptions = {
      integrationID: "1f611f3e-3d56-4213-ab2f-bbb1cd48bbd0", // Replace with your Watson Assistant integration ID
      region: "us-south", // Replace with your Watson Assistant region
      serviceInstanceID: "e16bcf8f-8198-49bd-b342-ee8613282727", // Replace with your Watson Assistant service instance ID
      onLoad: async (instance) => {
        await instance.render();
      },
    };

    setTimeout(() => {
      const script = document.createElement("script");
      script.src =
        "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" +
        (window.watsonAssistantChatOptions.clientVersion || "latest") +
        "/WatsonAssistantChatEntry.js";
      document.head.appendChild(script);
    }, 0);
  }, []);

  return null; // This component does not render anything visible
};

export default WatsonChat;
