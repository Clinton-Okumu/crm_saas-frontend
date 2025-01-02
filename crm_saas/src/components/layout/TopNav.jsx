import React, { useContext } from "react";
import { Bell } from "lucide-react";

// Mock user context (replace with your actual context or state)
const UserContext = React.createContext({
  name: "John Doe",
});

const TopNav = () => {
  const { name } = useContext(UserContext);

  // Function to extract initials
  const getInitials = (fullName) => {
    if (!fullName) return "NA"; // Default initials for missing name
    const nameParts = fullName.split(" ");
    const initials = nameParts
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
    return initials.slice(0, 2); // Limit to 2 characters
  };

  return (
    <header className="bg-gray-50 shadow-md px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800">Personal Dashboard</h1>

        {/* Icons and Avatar */}
        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          <button className="relative group">
            <Bell className="w-6 h-6 text-gray-500 group-hover:text-gray-800 transition-colors" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* Dynamic Avatar */}
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            <span className="text-gray-700 font-medium">
              {getInitials(name)}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

// Mock App with UserContext Provider
const App = () => {
  const user = { name: "Clinton Okumu" }; // Replace with actual user data

  return (
    <UserContext.Provider value={user}>
      <TopNav />
    </UserContext.Provider>
  );
};

export default App;
