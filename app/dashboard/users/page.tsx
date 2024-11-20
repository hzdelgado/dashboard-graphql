"use client";

import { gql, useQuery } from "@apollo/client";
import PaginatedTable from "@/components/table/PaginatedTable";
import { useEffect, useState } from "react";
import SidePanel from "@/components/panel/SidePanel";
import { useRouter } from "next/navigation";
import { useLoader } from "@/context/LoaderContext";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

export default function Users() {
  const { showLoader, hideLoader } = useLoader();

  const { loading, error, data } = useQuery(GET_USERS);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  const [selectedUser, setSelectedUser] = useState<any>({
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    active: true,
    createdAt: "2023-11-19",
  });

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Nombre Completo" },
    { key: "email", label: "Correo electrónico" },
  ];

  useEffect(() => {
    const storedData = localStorage.getItem("userProfile");
    let isAdmin = storedData === 'ADMIN';
    if(!isAdmin) {
      router.push("/dashboard/access-denied");
    } else {
      setIsAdmin(isAdmin);
    }
  }, [router]);

  const handleRowClick = (row: any) => {
    setSelectedUser(row);
    setIsSidePanelOpen(true);
  };

  const handleFieldChange = (key: string, value: any) => {
    setSelectedUser((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Usuarios</h1>
      <PaginatedTable
        data={data.users}
        columns={columns}
        rowsPerPage={5}
        onRowClick={handleRowClick}
      />
       <SidePanel
        isOpen={isSidePanelOpen}
        onClose={() => setIsSidePanelOpen(false)}
        title="Detalle de Usuario"
        data={selectedUser}
        editable={isAdmin}
        onSave={() => setIsSidePanelOpen(false)}
        footer={
          <div className="flex justify-between">
            <button
              onClick={() => setIsSidePanelOpen(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                console.log("Saved User:", selectedUser);
                setIsSidePanelOpen(false);
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Guardar
            </button>
          </div>
        }
      />
    </div>
  );
}
