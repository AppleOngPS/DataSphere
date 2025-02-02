import React, { useState } from "react";
import { useEffect } from "react";
import "../styles/BookingPage.css";
import Step1ChildForm from "./Step1ChildForm";
import Step2ChildList from "./Step2ChildList";
import Step3EditChild from "./Step3EditChild";
import Step4Schedule from "./Step4Schedule";
import Step5Checkout from "./Step5Checkout";

function BookingPage() {
  const [step, setStep] = useState(1);
  const [children, setChildren] = useState([]); // ✅ Ensuring `children` is always an array
  const [editingChildIndex, setEditingChildIndex] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  useEffect(() => {
    document.body.classList.add("custom-body");

    return () => {
      document.body.classList.remove("custom-body"); // Cleanup when leaving page
    };
  }, []);


  return (
    <div className="checkout-container">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(step / 5) * 100}%` }}></div>
      </div>

      {step === 1 && (
        <Step1ChildForm 
          children={children}  // ✅ Pass `children` correctly
          setChildren={setChildren} 
          setStep={setStep} 
        />
      )}

      {step === 2 && (
        <Step2ChildList 
          children={children} 
          setChildren={setChildren} 
          setStep={setStep} 
          setEditingChildIndex={setEditingChildIndex} 
        />
      )}

      {step === 3 && (
        <Step3EditChild 
          children={children} 
          setChildren={setChildren} 
          setStep={setStep} 
          editingChildIndex={editingChildIndex} 
        />
      )}

      {step === 4 && (
        <Step4Schedule 
          selectedSchedule={selectedSchedule} 
          setSelectedSchedule={setSelectedSchedule} 
          setStep={setStep} 
        />
      )}

      {step === 5 && (
        <Step5Checkout 
          setStep={setStep} 
          children={children} 
          selectedSchedule={selectedSchedule} 
        />
      )}
    </div>
  );
}

export default BookingPage;
