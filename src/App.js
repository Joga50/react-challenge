import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Favorites from "./pages/Favorites/Favorites";
import {
  Home,
  Locations,
  Episodes,
  Characters,
  Register,
  Login,
} from "./pages";
import React from "react";
import { Footer, NavBar } from "./components";
import { AuthProvider } from "./AuthContext";
import { configureStore } from "@reduxjs/toolkit";
import { toggleDarkMode } from "../src/redux/features/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
function App() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  const [themeClass, setThemeClass] = useState("");

  useEffect(() => {
    if (isDarkMode) {
      setThemeClass("dark");
    } else {
      setThemeClass("");
    }
  }, [isDarkMode]);

  return (
    <div className={`App ${themeClass}`}>
      <Router>
        <NavBar isDarkMode={isDarkMode} toggleDarkMode={handleToggleDarkMode} />

        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/episodes" element={<Episodes />} />

            <Route path="/characters" element={<Characters />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </AuthProvider>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
