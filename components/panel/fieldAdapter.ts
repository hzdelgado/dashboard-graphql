import { FormStructure } from "./SidePanel";

export type FieldType = 'text' | 'email' | 'switch' | 'date' | 'select'; // Puedes extender este tipo según sea necesario.

export interface FieldConfig {
  label: string;
  name: string;
  type: FieldType;
  value: any;
  editable: boolean;
  options?: { value: string; label: string }[];
}

// Opciones globales para campos select
const selectOptions: Record<string, { value: string; label: string }[]> = {
  profile: [
    { value: "ADMIN", label: "Administrador" },
    { value: "OPERATOR", label: "Operador" },
  ],
  // Puedes agregar más opciones aquí para otros campos select.
};

export const fieldsAdapter = (data: Record<string, any>, structure: FormStructure[]): FieldConfig[] => {
  let keys: String[] = structure.map((s) => s.key)
  return Object.entries(data)
  .filter(([key]) => keys.includes(key.toLowerCase()))
  .map(([key, value]) => {
    let type: FieldType = 'text';
    let isEditable = false;
    let options: { value: string; label: string }[] | undefined;

    if(key.toLowerCase() === 'email') {
      type = 'email';
    }else if(typeof value === 'boolean') {
      type = 'switch';
      isEditable = true;
    } else if (selectOptions[key.toLowerCase()]) {
      type = "select";
      isEditable = true;
      options = selectOptions[key.toLowerCase()];
    }

    return {
      label: structure.find(e => e.key === key)!.label, // Capitalizar el nombre del campo.
      name: key,
      type,
      value,
      editable: isEditable, // Puedes cambiar esto dinámicamente.
      options
    };
  });
}