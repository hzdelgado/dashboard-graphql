"use client";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* Barra lateral */}
        <Sidebar/>
      {/* Contenido principal */}
      <div className="flex flex-col flex-1 bg-gray-100">
        <Header />
        {children}
      </div>
    </div>
  );
}
