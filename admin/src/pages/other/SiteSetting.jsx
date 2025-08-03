import React, { useEffect, useRef } from "react";
import io from "socket.io-client";

export default function SiteSetting() {
   const socketRef = useRef(null);
  const [maintenanceMode, setMaintenanceMode] = React.useState(false);

  const handleMaintenanceToggle = () => {
    setMaintenanceMode(!maintenanceMode);
    if (socketRef.current) {
      socketRef.current.emit("maintenance", !maintenanceMode);
    }
  };

  useEffect(() => {
    const socket = io(import.meta.env.VITE_STATIC_URL);

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connected to socket server");
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    socket.on("maintenanceMode", (data) => {
      // setMaintenanceMode(data);
      console.log("Maintenance mode status:", data);
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("maintenanceMode");
    };
  }, []);

  return (
    <section className="p-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Site Settings</h1>
        <p>Configure your site settings here.</p>
      </div>

      <div className="mb-6 realtive">
        <h1 className="text-xl font-semibold mb-2">Maintence Mode</h1>
        <div className="ml-1">
          <ToggleSwitch
            checked={maintenanceMode}
            onChange={handleMaintenanceToggle}
          />
        </div>
      </div>
    </section>
  );
}

export const ToggleSwitch = ({ checked, onChange }) => {
  return (
    <label htmlFor="toogleA" className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          id="toogleA"
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={onChange}
        />

        <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>

        <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
      </div>
    </label>
  );
};
