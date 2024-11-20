"use client"
import useLogout from '@/hooks/useLogout';
import { useEffect, useState } from 'react';

const Header = () => {
  const { logout } = useLogout();
  const [userName, setUserName] = useState<string | null>(null);

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    const storedData = localStorage.getItem("userName");
    setUserName(storedData);
  }, []);

    return (<div>
      {userName && <div className="bg-white p-4 shadow flex justify-between items-center dark:bg-slate-400">
        <div className="font-bold text-xl">Bienvenid@, {userName}</div>
        <div>
          <button onClick={handleLogout} className="bg-blue-600 text-white px-4 py-2 rounded">Salir</button>
        </div>
      </div>}</div>
    );
  };
  
  export default Header;