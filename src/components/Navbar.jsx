import React from "react";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <ul className="flex justify-center space-x-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/quiz">Quiz</Link>
        </li>
        <li>
          <Link to="/results">Results</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
