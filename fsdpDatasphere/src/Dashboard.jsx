import { UserButton, useUser } from "@clerk/clerk-react";
import { useState } from "react";

const Dashboard = () => {
  const { user } = useUser(); // Only using useUser for accessing user data
  const [preferredLunch, setPreferredLunch] = useState('');
  const [children, setChildren] = useState([{ name: '', school: '', interest: '' }]); // Initialize with one child

  const handleChildChange = (index, field, value) => {
    const newChildren = [...children];
    newChildren[index][field] = value;
    setChildren(newChildren);
  };

  const addChild = () => {
    setChildren([...children, { name: '', school: '', interest: '' }]); // Add a new child entry
  };

  return (
    <div>
      {user ? (
        <>
          <h1>Welcome to Home, {user.firstName}!</h1>
          <UserButton />

          {/* Profile Section */}
          <div className="profile-section">
            <h2>Profile</h2>
            <div>
              <label>
                Preferred Lunch:
                <input 
                  type="text" 
                  value={preferredLunch} 
                  onChange={(e) => setPreferredLunch(e.target.value)} 
                  placeholder="Enter preferred lunch"
                />
              </label>
            </div>

            <h3>Children</h3>
            {children.map((child, index) => (
              <div key={index} className="child-info">
                <label>
                  Name:
                  <input 
                    type="text" 
                    value={child.name} 
                    onChange={(e) => handleChildChange(index, 'name', e.target.value)} 
                    placeholder="Child's name"
                  />
                </label>
                <label>
                  School:
                  <input 
                    type="text" 
                    value={child.school} 
                    onChange={(e) => handleChildChange(index, 'school', e.target.value)} 
                    placeholder="Child's school"
                  />
                </label>
                <label>
                  Interest:
                  <input 
                    type="text" 
                    value={child.interest} 
                    onChange={(e) => handleChildChange(index, 'interest', e.target.value)} 
                    placeholder="Child's interest"
                  />
                </label>
              </div>
            ))}
            <button onClick={addChild}>Add Another Child</button>
          </div>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Dashboard;
