"use client";
import { redirect } from "next/navigation";
import DashboardLayout from "./layout";
import { useEffect } from "react";

const DashboardPage = ({
    children,
  }: {
    children: React.ReactNode;
  })  => {
  
    redirect("/dashboard/home");

    
  return (
    <DashboardLayout>
       <main>{children}</main>
    </DashboardLayout>
  );
};

export default DashboardPage;
