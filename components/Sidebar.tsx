import Link from "next/link";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("userProfile");
    let isAdmin = storedData === 'ADMIN';
    setIsAdmin(isAdmin);
  }, []);

  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
    <h2 className="text-xl font-bold">Dashboard</h2>
    <nav className="mt-4">
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