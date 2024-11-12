import { v4 as generateId } from "uuid"; 
import { useCallback, useEffect, useRef, useState } from "react";
import { Realtime } from "@superviz/realtime/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const apiKey = import.meta.env.VITE_SUPERVIZ_API_KEY; // Ensure this is defined in your environment
const PARTICIPANT_ID = generateId();

export default function App() {
  const initialized = useRef(false);
  const [message, setMessage] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [msToWait, setMsToWait] = useState(1000);
  const [loading, setLoading] = useState(false);

  const initialize = useCallback(async () => {
    if (initialized.current) return;

    const realtime = new Realtime(apiKey, {
      participant: {
        id: PARTICIPANT_ID,
        name: "participant-name",
      },
      debug: true,
    });

    initialized.current = true;

    const channel = await realtime.connect("notification-topic");

    channel.subscribe("new-notification", (data) => {
      if (typeof data === "string") return;

      toast.info(data.data, {
        position: "top-right",
        autoClose: 3000,
      });
    });
  }, [initialized]);

  const notify = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/send-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: recipientEmail,
          subject: "New Notification",
          message,
        }),
      });

      if (response.ok) {
        toast.success("Notification sent via email!", {
          position: "top-right",
          autoClose: 1000,
        });
      } else {
        const errorData = await response.json();
        throw new Error(`Failed to send email: ${errorData.message}`);
      }

      setMessage("");
      setRecipientEmail("");
      setMsToWait(1000);
    } catch (error) {
      console.error("Error sending notification:", error);
      toast.error("Failed to send notification!", {
        position: "top-right",
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  }, [message, recipientEmail]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <>
      <ToastContainer />
      <div className="w-full h-full bg-[#e9e5ef] flex items-center justify-center flex-col">
        <header className="w-full p-5 bg-[#39363e] flex items-center justify-between">
          <h1 className="text-white text-2xl font-bold">Realtime Notifications</h1>
        </header>
        <main className="flex-1 p-20 flex w-full gap-2 items-center justify-center">
          <form>
            <h2 className="text-xl font-bold">Send Notification</h2>
            <p className="text-gray-500">Schedule a notification to be sent to all participants in the room.</p>
            <hr className="my-5" />

            <label htmlFor="recipientEmail" className="text-lg font-bold">Recipient Email</label>
            <input
              type="email"
              id="recipientEmail"
              name="recipientEmail"
              placeholder="recipient@example.com"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
            />
            <hr className="my-5" />

            <label htmlFor="message" className="text-lg font-bold">Message</label>
            <input
              type="text"
              id="message"
              name="message"
              placeholder="Hello, World!"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <hr className="my-5" />
            <label htmlFor="msToWait" className="text-lg font-bold">Time to wait (ms)</label>
            <input
              type="number"
              id="msToWait"
              name="msToWait"
              placeholder="1000"
              className="w-full p-3 border border-gray-300 rounded-md"
              min={1000}
              value={msToWait}
              onChange={(e) => setMsToWait(Number(e.target.value))}
            />
            <hr className="my-5" />
            <button
              type="button"
              onClick={notify}
              className="bg-[#39363e] text-white p-3 rounded-md disabled:bg-gray-300"
              disabled={!message || !recipientEmail || loading}
            >
              {loading ? "Sending..." : "Confimation Email"}
            </button>
          </form>
        </main>
      </div>
    </>
  );
}
