"use client";

import { useState } from "react";
import { fieldsAdapter, FieldConfig } from "@/components/table/fieldAdapter";

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: Record<string, any>;
  onSave: (updatedData: Record<string, any>) => void;
  editable: boolean;
  footer?: React.ReactNode;
}

export default function SidePanel({
  isOpen,
  onClose,
  title,
  data,
  onSave,
  footer,
  editable
}: SidePanelProps) {
  const [fields, setFields] = useState<FieldConfig[]>(fieldsAdapter(data, editable));
  const [formData, setFormData] = useState<Record<string, any>>(data);

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
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
        {fields.map(({ label, name, type, value, editable }) => (
          <div key={name} className="mb-4">
            <label className="block mb-1 font-medium">{label}</label>
            {type === "switch" ? (
               <input
               type="checkbox"
               checked={formData[name]}
               disabled={!editable}
               onChange={(e) => handleInputChange(name, e.target.checked)}
               className="h-4 w-4 text-blue-600 border-gray-300 rounded dark:bg-slate-500"
             />
            ) : (
              <input
                type={type}
                value={formData[name]}
                disabled={!editable}
                onChange={(e) => handleInputChange(name, e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 dark:bg-slate-500"
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
