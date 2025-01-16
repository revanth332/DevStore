"use client";

import Nav from "@/components/Nav";
import Sidebar from "@/components/Sidebar";
import { CategoryProvider } from "@/context/CategoryContext";
import { useState } from "react";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarOpen = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="h-full grid grid-cols-12 grid-rows-12">
      <CategoryProvider>
        <Nav handleSidebarOpen={handleSidebarOpen} />
        <Sidebar isSidebarOpen={isSidebarOpen} handleSidebarOpen={handleSidebarOpen} />
        {children}
      </CategoryProvider>
    </div>
  );
}
