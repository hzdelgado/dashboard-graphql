"use client";

import PaginatedTable from "@/components/table/PaginatedTable";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
const SidePanel = dynamic(() => import("@/components/panel/SidePanel"), { ssr: false });
import { FormStructure } from "@/components/panel/SidePanel";
import { useRouter } from "next/navigation";
import { useLoader } from "@/context/LoaderContext";
import { getUsers, updateUser as updateUserService } from "@/services/userService"; // Importa el servicio de usuarios

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Nombre Completo" },
  { key: "email", label: "Correo electrónico" },
  { key: "profile", label: "Perfil" },
  { key: "active", label: "Usuario activo?" },
];

const structure: FormStructure[] = [
  { key: "name", label: "Nombre Completo", },
  { key: "email", label: "Correo electrónico" },
  { key: "profile", label: "Perfil" },
  { key: "active", label: "Usuario activo?" },
];

export default function Users() {
  const { showLoader, hideLoader } = useLoader();
  const [users, setUsers] = useState<any[]>([]);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>({
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    profile: "",
    active: false,
  });
  const [originalUser, setOriginalUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    showLoader()
    const storedData = localStorage.getItem("userProfile");
    let isAdmin = storedData === 'ADMIN';
    console.log('isAdmin', isAdmin)
    if(!isAdmin) {
      router.push("/dashboard/access-denied");
      hideLoader()
    } else {
      setIsAdmin(isAdmin);
      const fetchUsers = async () => {
        try {
          const usersData = await getUsers();
          setUsers(usersData);
        } catch (error) {
          console.error("Error fetching users:", error);
        } finally { 
          hideLoader()
        }
      };
      fetchUsers();
    }
  }, [router]);

  const handleRowClick = (row: any) => {
    setSelectedUser(row);
    setOriginalUser(row); // Guarda los datos originales para comparar
    setIsSidePanelOpen(true);
  };

  const handleInputChange = (data: any) => {
    setTimeout(() => {
      setSelectedUser(data);
      // Compara los datos originales con los datos modificados
      const hasChanges = JSON.stringify(data) !== JSON.stringify(originalUser);
      setIsDirty(hasChanges); // Actualiza si hay cambios
      console.log('handleInputChange', data, hasChanges )
    }, 0);
  };

  const handleClose = () => {
    // No actualizamos el estado inmediatamente, sino que lo diferimos
    setTimeout(() => {
      setIsSidePanelOpen(false);
      setIsDirty(false);
    }, 0);
  };

  const handleSave = async () => {
    showLoader()
    const updateUser = async () => {
      try {
        const input = {
          id: selectedUser.id, 
          active: selectedUser.active,
          profile: selectedUser.profile
        };
        await updateUserService(input);
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.id === selectedUser.id ? selectedUser : user
          )
        );
        handleClose();
      } catch (error) {
        console.error("Error updating user:", error);
      } finally { 
        hideLoader()
      }
    };
    updateUser();
  };
  return (
    <div>
    {isAdmin &&<div className="p-4">
      <h1 className="text-2xl font-bold mb-1 dark:text-white">Gestión de Usuarios</h1>
      <h4 className="mb-4 text-gray-500 mb-8 dark:text-white">Gestiona los usuarios con acceso a la plataforma</h4>

      <PaginatedTable
        data={users}
        columns={columns}
        rowsPerPage={5}
        onRowClick={handleRowClick}
      />
       <SidePanel
        isOpen={isSidePanelOpen}
        formStructure={structure}
        onClose={handleClose}
        title="Detalle de Usuario"
        data={selectedUser}
        onChange={handleInputChange}
        footer={
          <div className="flex justify-between">
            <button
              onClick={() => setIsSidePanelOpen(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={!isDirty}
              className={`px-4 py-2 rounded text-white ${
                isDirty ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
              }`}>
              Guardar
            </button>
          </div>
        }
      />
    </div>
  }</div>
  );
}
