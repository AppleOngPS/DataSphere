import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Navigation</h2>
      <ul>
        <li>
          <Link to="/book-session">Book Session</Link>
        </li>
        <li>
          <Link to="/time-slots">Time Slots</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
