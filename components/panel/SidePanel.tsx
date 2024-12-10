"use client";

import { useEffect, useState } from "react";
import { fieldsAdapter, FieldConfig } from "@/components/panel/fieldAdapter";
import React from "react";

export interface FormStructure {
  key: string;
  label: string;
}

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: Record<string, any>;
  footer?: React.ReactNode;
  onChange: (formData: any) => void;
  formStructure: FormStructure[];
}

export default function SidePanel({
  isOpen,
  onClose,
  title,
  data,
  footer,
  onChange,
  formStructure
}: SidePanelProps) {
  
  const [fields, setFields] = useState<FieldConfig[]>(fieldsAdapter(data, formStructure));
  const [formData, setFormData] = useState<Record<string, any>>(data);

  useEffect(() => {
    setFormData(data); // Actualiza formData con el nuevo data
    setFields(fieldsAdapter(data, formStructure));
  }, [data, formStructure]);

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => {
      const newData = { ...prev, [name]: value }
      onChange(newData)
      return newData
  });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-lg border-l p-4 z-50 dark:bg-black dark:text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 font-bold text-lg"
        >
          ×
        </button>
      </div>

      {/* Contenido dinámico */}
      <div className="flex-1 overflow-y-auto">
        {fields.map(({ label, name, type, editable, options }) => (
          <div key={name} className="mb-4">
            <label htmlFor={label} className="block mb-1 font-medium">{label}</label>
            {type === "select" ? (
              <select
                id={label}
                value={formData[name]}
                disabled={!editable}
                onChange={(e) => handleInputChange(name, e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 dark:bg-slate-500 disabled:bg-gray-100 dark:disabled:text-gray-800"
              >
                {options?.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            ): type === "switch" ? (
               <input
               id={label}
               type="checkbox"
               checked={formData[name]}
               disabled={!editable}
               onChange={(e) => handleInputChange(name, e.target.checked)}
               className="h-4 w-4 text-blue-600 border-gray-300 rounded dark:bg-slate-500"
             />
            ) : (
              <input
                id={label}
                type={type}
                value={formData[name]}
                disabled={!editable}
                onChange={(e) => handleInputChange(name, e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 dark:bg-slate-500 disabled:bg-gray-100 dark:disabled:text-gray-800"
              />
            )}
          </div>
        ))}
      </div>

      {/* Barra de Navegación Inferior */}
      {footer && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-100 border-t dark:bg-slate-400">
          {footer}
        </div>
      )}
    </div>
  );
}
