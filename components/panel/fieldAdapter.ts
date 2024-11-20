import { FormStructure } from "./SidePanel";

export type FieldType = 'text' | 'email' | 'switch' | 'date'; // Puedes extender este tipo según sea necesario.

export interface FieldConfig {
  label: string;
  name: string;
  type: FieldType;
  value: any;
  editable: boolean;
}

export const fieldsAdapter = (data: Record<string, any>, structure: FormStructure[]): FieldConfig[] => {
  let keys: String[] = structure.map((s) => s.key)
  return Object.entries(data)
  .filter(([key]) => keys.includes(key.toLowerCase()))
  .map(([key, value]) => {
    let type: FieldType = 'text';
    let isEditable = false;

    if(key.toLowerCase() === 'email') {
      type = 'email';
    }else if(typeof value === 'boolean') {
      type = 'switch';
      isEditable = true;
    } else {
      type = 'text'
    }

    return {
      label: structure.find(e => e.key === key)!.label, // Capitalizar el nombre del campo.
      name: key,
      type,
      value,
      editable: isEditable, // Puedes cambiar esto dinámicamente.
    };
  });
}