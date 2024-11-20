import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";

const Sidebar = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("userProfile");
    let isAdmin = storedData === 'ADMIN';
    setIsAdmin(isAdmin);
  }, []);

  return (
    <aside className="w-64 bg-gray-800 text-white px-4 py-6">
    <Logo src="/images/logo-white.svg" />

    <nav className="mt-8">
      <ul>
        <li className="mb-2">
          <Link href="/dashboard/home">
            <span className="hover:underline">Dashboard</span>
          </Link>
        </li>
        {isAdmin && <li className="mb-2">
          <Link href="/dashboard/users">
            <span className="hover:underline">Usuarios</span>
          </Link>
        </li>}
        <li>
          <Link href="/dashboard/settings">
            <span className="hover:underline">Configuración</span>
          </Link>
        </li>
      </ul>
    </nav>
  </aside>

  );
};

export default Sidebar;