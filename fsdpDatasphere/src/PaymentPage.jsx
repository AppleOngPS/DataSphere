import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PaymentPage.css";

const PaymentPage = () => {
  const { programID } = useParams(); // Get programID from the URL
  const [program, setProgram] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch program details from the backend API
    fetch(`http://localhost:3000/programs/${programID}`) // Updated endpoint to match new route
      .then((response) => response.json())
      .then((data) => setProgram(data))
      .catch((error) => console.error("Error fetching program:", error));
  }, [programID]);

  const initiatePayment = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3000/create-paynow-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: program ? program.programPrice * 100 : 5000, // Amount in cents
            currency: "sgd",
          }),
        }
      );

      const data = await response.json();
      setQrCodeUrl(data.qrCode); // Set the QR code URL from the response
    } catch (error) {
      console.error("Error creating payment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!program) {
    return <p>Loading program details...</p>;
  }

  return (
    <div className="payment-page">
      <h1 className="payment-title">Complete Your Payment</h1>
      <div className="programme-details">
        <h2>{program.name}</h2>
        <p>{program.description}</p>
        <p>Price: ${program.programPrice.toFixed(2)}</p>
      </div>

      <p className="payment-instructions">
        Please scan the QR code below with your mobile banking app to complete
        the payment via PayNow.
      </p>

      <div className="qr-code-container">
        {isLoading ? (
          <p>Loading QR code...</p>
        ) : qrCodeUrl ? (
          <img src={qrCodeUrl} alt="PayNow QR Code" className="qr-code-image" />
        ) : (
          <button onClick={initiatePayment} className="generate-qr-button">
            Generate QR Code
          </button>
        )}
      </div>

      <p className="payment-note">
        Once your payment is completed, please return to the website to confirm
        your order.
      </p>
    </div>
  );
};

export default PaymentPage;

// // import React from "react";

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import "./PaymentPage.css";

// const PaymentPage = () => {
//   const { programID } = useParams(); // Get programID from the URL
//   const [program, setProgram] = useState(null);

//   useEffect(() => {
//     // Fetch program details from the backend API
//     fetch(`http://localhost:3000/programs/${programID}`) // Updated endpoint to match new route
//       .then((response) => response.json())
//       .then((data) => setProgram(data))
//       .catch((error) => console.error("Error fetching program:", error));
//   }, [programID]);

//   if (!program) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="payment-page">
//       <h1>Complete Your Payment</h1>
//       <div className="programme-details">
//         <h2>{program.name}</h2>
//         <p>{program.description}</p>
//         <p>Price: ${program.programPrice.toFixed(2)}</p>
//       </div>
//       {/* Placeholder for QR code */}
//       <img src="https://via.placeholder.com/300" alt="QR Code for Payment" />
//     </div>
//   );
// };

// export default PaymentPage;
