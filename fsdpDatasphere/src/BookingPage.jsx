import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './BookingPage.css';
import logo from './assets/logo.png'; // Ensure the image path is correct

function BookingPage() {
  const [selectedDate, setSelectedDate] = useState(new Date("2024-12-19"));
  const [children, setChildren] = useState([]);
  const [showChildForm, setShowChildForm] = useState(false);
  const pricePerChild = 788;

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddChild = () => {
    setChildren([
      ...children,
      { name: '', school: '', preferredLearningStyle: [], specialNeeds: '' }
    ]);
    setShowChildForm(true); // Ensure the form is displayed after adding a new child
  };

  const handleChildChange = (index, field, value) => {
    const updatedChildren = [...children];
    updatedChildren[index][field] = value;
    setChildren(updatedChildren);
  };

  const handleCheckboxChange = (index, field, value) => {
    const updatedChildren = [...children];
    const currentStyles = updatedChildren[index][field];
    const newStyles = currentStyles.includes(value)
      ? currentStyles.filter((style) => style !== value)
      : [...currentStyles, value];
    updatedChildren[index][field] = newStyles;
    setChildren(updatedChildren);
  };

  const handleRemoveChild = (index) => {
    const updatedChildren = children.filter((_, childIndex) => childIndex !== index);
    setChildren(updatedChildren);
  };

  return (
    <div className="CheckoutPage">
      <div className="card">
        <h2>${pricePerChild * (children.length || 1)}*</h2>
        <p><s>Was ${pricePerChild + 200}</s></p>
        <p>Beginner</p>
        <ul>
          <li>✓ Class size: 15 - 20</li>
          <li>✓ Duration: 3.5 days</li>
          <li>✓ Lunch provided</li>
          <li>✓ Lesson materials provided</li>
        </ul>
        <p>Complimentary 1-year membership with access to resources and member rates for all programs</p>
      </div>

      <div className="form-container">
        <img src={logo} alt="Brand Logo" className="logo" />

        <div className="add-child-container">
          <label>Add a Child</label>
          <button onClick={handleAddChild}>+ Add a Child</button>
        </div>

        {showChildForm && children.map((child, index) => (
          <div key={index} className="child-inputs">
            <input
              type="text"
              placeholder="Child's Name"
              value={child.name}
              onChange={(e) => handleChildChange(index, 'name', e.target.value)}
            />
            <input
              type="text"
              placeholder="Primary School"
              value={child.school}
              onChange={(e) => handleChildChange(index, 'school', e.target.value)}
            />
            <textarea
              placeholder="Special Needs or Considerations"
              value={child.specialNeeds}
              onChange={(e) => handleChildChange(index, 'specialNeeds', e.target.value)}
            />
            <button onClick={() => handleRemoveChild(index)} className="remove-child-button">Remove Child</button>
          </div>
        ))}

        <div className="program-dates">
          <p>Program Date: 16 Dec 2024 to 20 Dec 2024</p>
          <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
        </div>

        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          inline
        />

        <button className="checkout-button">Checkout</button>
      </div>
    </div>
  );
}

export default BookingPage;










