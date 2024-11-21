"use client";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  redirect("/dashboard/home");
  return null; // No se renderiza nada porque redirige inmediatamente
}