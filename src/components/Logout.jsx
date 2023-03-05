import React from "react";

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    alert("You logged out successfully!");
    window.location.reload();
  };

  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 m-4"
      onClick={handleLogout}
    >
      Log out
    </button>
  );
};

export default Logout;
