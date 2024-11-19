import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
    <h2 className="text-xl font-bold">Dashboard</h2>
    <nav className="mt-4">
      <ul>
        <li className="mb-2">
          <Link href="/dashboard">
            <span className="hover:underline">Home</span>
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/dashboard/profile">
            <span className="hover:underline">Users</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/settings">
            <span className="hover:underline">Settings</span>
          </Link>
        </li>
      </ul>
    </nav>
  </aside>

  );
};

export default Sidebar;