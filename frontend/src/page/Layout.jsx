import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto custom-scroll">
        <div className="min-h-full p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
