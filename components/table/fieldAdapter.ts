type FieldType = 'text' | 'email' | 'switch' | 'date'; // Puedes extender este tipo según sea necesario.

export interface FieldConfig {
  label: string;
  name: string;
  type: FieldType;
  value: any;
  editable: boolean;
  visible: boolean;
}

export const fieldsAdapter = (data: Record<string, any>, editable: boolean): FieldConfig[] => {
  return Object.entries(data).map(([key, value]) => {
    let type: FieldType = 'text'; // Tipo predeterminado.
    let isEditable = editable;
    let isVisible = true;

    // Determinar el tipo del campo basado en el valor.
    if (typeof value === 'boolean') {
      type = 'switch';
    } else if (key.toLowerCase().includes('email')) {
      isEditable = false
      type = 'email';
    } else if (key.toLowerCase().includes('date')) {
      type = 'date';
    } else {
      isVisible = false
    }

    return {
      label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalizar el nombre del campo.
      name: key,
      type,
      value,
      editable: isEditable, // Puedes cambiar esto dinámicamente.
      visible: isVisible
    };
  });
};
