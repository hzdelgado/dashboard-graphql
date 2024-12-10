"use client";

import React from "react";
import { useEffect, useState } from "react";

export interface Column {
  key: string;
  label: string;
}

interface PaginatedTableProps {
  data: any[];
  columns: Column[];
  rowsPerPage?: number;
  onRowClick?: (row: any) => void;
}

export default function PaginatedTable({
  data,
  columns,
  rowsPerPage = 5,
  onRowClick,
}: PaginatedTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentRows, setCurrentRows] = useState<any[]>([]);

  // Calcular las filas para la página actual
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  
  // Actualizar filas cuando los datos cambian o la página cambia
  useEffect(() => {
    setCurrentRows(data.slice(indexOfFirstRow, indexOfLastRow));
  }, [data, currentPage]);

  // Cambiar página
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <table className="table-auto w-full border-collapse border bg-white border-gray-300 dark:bg-black">
        <thead>
          <tr className="bg-gray-200 dark:bg-slate-400">
            {columns.map((column) => (
              <th
                key={column.key}
                className="border border-gray-300 px-4 py-2 text-left"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, index) => (
            <tr
              key={index}
              className="hover:bg-gray-100 cursor-pointer dark:hover:bg-slate-500 dark:text-white"
              onClick={() => onRowClick && onRowClick(row)}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="border border-gray-300 px-4 py-2"
                >
                  {typeof row[column.key] === 'boolean' ? (
            row[column.key] ? 'Sí' : 'No'
          ) : (
            row[column.key]
          )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(data.length / rowsPerPage) },
          (_, i) => i + 1
        ).map((pageNumber) => (
          <button
            data-testid={'nav'+pageNumber}
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`mx-1 px-3 py-1 rounded ${
              pageNumber === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-black dark:text-white"
            }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
}
