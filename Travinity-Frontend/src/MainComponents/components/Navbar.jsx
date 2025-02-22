import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Travel Agency</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:underline">Login</Link>
          </li>
          <li>
            <Link to="/register" className="hover:underline">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
