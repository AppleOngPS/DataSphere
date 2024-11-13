import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import './BookingPage.css';
import logo from './assets/logo.png';

function BookingPage() {
  const [selectedSlot, setSelectedSlot] = useState("09 Dec - 12 Dec, 9am - 6pm");
  const [children, setChildren] = useState([]);
  const [showChildForm, setShowChildForm] = useState(false);
  const pricePerChild = 788;

  // Combined date and time options with availability status (green for available, red for taken)
  const slotOptions = [
    { slot: "09 Dec - 12 Dec, 9am - 6pm", available: true },
    { slot: "12 Dec - 15 Dec, 9am - 6pm", available: false },
    { slot: "16 Dec - 19 Dec, 9am - 6pm", available: true },
    { slot: "20 Dec - 23 Dec, 9am - 6pm", available: false }
  ];

  const handleSlotChange = (e) => {
    setSelectedSlot(e.target.value);
  };

  const handleAddChild = () => {
    setChildren([
      ...children,
      { 
        name: '', 
        school: '', 
        preferredLearningStyle: [], 
        specialNeeds: '',
        lunchChoice: 'Fish' // Default lunch choice
      }
    ]);
    setShowChildForm(true);
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
            
            <div>
              <label>Preferred Learning Style:</label>
              {['Visual', 'Auditory', 'Kinesthetic', 'Collaborative', 'Independent'].map((style) => (
                <label key={style}>
                  <input
                    type="checkbox"
                    checked={child.preferredLearningStyle.includes(style)}
                    onChange={() => handleCheckboxChange(index, 'preferredLearningStyle', style)}
                  />
                  {style}
                </label>
              ))}
            </div>

            <textarea
              placeholder="Special Needs or Considerations"
              value={child.specialNeeds}
              onChange={(e) => handleChildChange(index, 'specialNeeds', e.target.value)}
            />

            <div className="dropdown-container">
              <label>Preferred Lunch:</label>
              <select
                value={child.lunchChoice}
                onChange={(e) => handleChildChange(index, 'lunchChoice', e.target.value)}
              >
                <option value="Fish">Fish</option>
                <option value="Chicken">Chicken</option>
                <option value="Vegan">Vegan</option>
                <option value="Non-Vegan">Non-Vegan</option>
              </select>
            </div>

            <button onClick={() => handleRemoveChild(index)} className="remove-child-button">Remove Child</button>
          </div>
        ))}

        <div className="program-dates">
          <label>Program Slot:</label>
          <select value={selectedSlot} onChange={handleSlotChange}>
            {slotOptions.map(({ slot, available }) => (
              <option 
                key={slot} 
                value={slot} 
                style={{ color: available ? 'green' : 'red' }}
              >
                {slot} {available ? '(Available)' : '(Taken)'}
              </option>
            ))}
          </select>
        </div>

        <button className="checkout-button">Checkout</button>
      </div>
    </div>
  );
}

export default BookingPage;


