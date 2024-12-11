# CRM Dashboard Example

## Descripción
Este proyecto es un CRM (Customer Relationship Management) básico con funcionalidades de gestión y visualización de datos.

## Instalación y Despliegue
### Pre-requisitos
- Las variables de entorno ya deben estar configuradas.
### Instalar dependencias
```bash
npm install
```
### Compilación para producción
```bash
npm run build
npm run start
```
### Ejecutas pruebas unitarias
- Es necesario tener configurado la propiedad jsx como `react-jsx` en el archivo `tsconfig.json`.

```bash
npm run test:jest
```
### Ejecutas pruebas E2E
```bash
npm run test:playright
```
