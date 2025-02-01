// services/daily.js
const fetch = require("node-fetch");

exports.createDailyRoom = async (sessionTime) => {
  try {
    const expiration = new Date(sessionTime);
    expiration.setHours(expiration.getHours() + 2);

    const response = await fetch("https://api.daily.co/v1/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DAILY_API_KEY}`,
      },
      body: JSON.stringify({
        properties: {
          exp: Math.floor(expiration.getTime() / 1000),
          enable_prejoin_ui: false,
        },
      }),
    });

    const room = await response.json();
    return room.url;
  } catch (error) {
    throw new Error(`Daily.co API error: ${error.message}`);
  }
};
