import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaHeart } from "react-icons/fa";

function Footer() {
  const currentUser = localStorage.getItem("currentUser");
  return (
    <div
      className="footer p-6"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",

        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <h4 className="text-gray-200">"Welcome home, Mortys!"</h4>
      <div className="flex items-center">
        <Link to="/">
          <FaHome className="text-red-500 mr-4" />
        </Link>
        <div>
          {currentUser && (
            <Link to="/favorites">
              <FaHeart className="text-red-500" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Footer;
