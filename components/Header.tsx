"use client"
import useLogout from '@/hooks/useLogout';

const Header = () => {
  const { logout } = useLogout();
  const handleLogout = async () => {
    await logout();
  };
    return (
      <div className="bg-white p-4 shadow flex justify-between items-center">
        <div className="font-bold text-xl">Dashboard Header</div>
        <div>
          <button onClick={handleLogout} className="bg-blue-600 text-white px-4 py-2 rounded">Log Out</button>
        </div>
      </div>
    );
  };
  
  export default Header;