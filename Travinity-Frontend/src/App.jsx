import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./MainComponents/components/Navbar";
import Footer from "./MainComponents/components/Footer";
import UserDashboard from "./MainComponents/Dashboard/UserDashboard";
import LoginForm from "./MainComponents/Registration/LoginForm";
import RegisterForm from "./MainComponents/Registration/RegisterForm";
import Flight from "./MainComponents/Dashboard/flight";
import Hotel from "./MainComponents/Dashboard/hotel";


const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<UserDashboard />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/flight" element={<Flight />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/hotel" element={<Hotel />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
