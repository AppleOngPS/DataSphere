import { Clerk } from "@clerk/clerk-js";
import axios from "axios";

const fetchWithAuth = async (url, data = {}, method = "post") => {
  try {
    const token = await Clerk.session.getToken({ template: "default" });
    console.log("Fetched Token:", token); // Debugging: Log the fetched token

    if (!token) {
      console.error("No token found. Ensure the user is signed in.");
      throw new Error("Authentication token missing.");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return axios[method](url, data, config);
  } catch (error) {
    console.error("Error in fetchWithAuth:", error.message);
    throw error;
  }
};

export default fetchWithAuth;


