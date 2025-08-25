import React from "react";
import { useSettingsStore } from "../store/useSettingsStore";
import { Sun, Moon, Bell, BellOff } from "lucide-react";

const SettingsPage = () => {
  const { theme, notifications, toggleTheme, toggleNotifications } =
    useSettingsStore();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 border dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center">⚙️ Settings</h2>

        {/* Theme Toggle */}
        <div className="flex justify-between items-center py-3">
          <span className="text-lg font-medium flex items-center gap-2">
            {theme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            Theme
          </span>
          <button
            onClick={toggleTheme}
            className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors ${
              theme === "dark" ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                theme === "dark" ? "translate-x-7" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        <hr className="border-gray-300 dark:border-gray-600 my-3" />

        {/* Notifications Toggle */}
        <div className="flex justify-between items-center py-3">
          <span className="text-lg font-medium flex items-center gap-2">
            {notifications ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
            Notifications
          </span>
          <button
            onClick={toggleNotifications}
            className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors ${
              notifications ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                notifications ? "translate-x-7" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
