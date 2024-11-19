"use client";
import DashboardLayout from "./layout";

const DashboardPage = ({
    children,
  }: {
    children: React.ReactNode;
  })  => {

  return (
    <DashboardLayout>
        {children}
    </DashboardLayout>
  );
};

export default DashboardPage;
