import React from "react";
import { Link } from "react-router-dom";

const SimpleNavbar = () => {
  return (
    <nav className="bg-gray-100 text-black p-4 flex justify-between items-center border-b border-gray-300">
      <Link to="/" className="text-sm font-medium hover:underline">
        Home
      </Link>
      <div>
        <Link
          to="/login"
          className="font-medium py-1 px-3 rounded hover:bg-brown-600 transition duration-300"
          style={{
            backgroundColor: "#D2B48C", // Light brown
            color: "#fff", // White text
          }}
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default SimpleNavbar;
