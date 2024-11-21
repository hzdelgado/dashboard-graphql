import React from 'react';

type SalesData = {
  id: number;
  title: string;
  amount: number;
  date: string;
  thumbnail: string;
};

interface SalesListProps {
  salesData: SalesData[];
}

const SalesList: React.FC<SalesListProps> = ({ salesData }) => {
  return (
    <div className="mt-8 bg-white shadow-sm rounded-md p-6 dark:bg-black">
      <h2 className="text-xl font-semibold mb-4">Últimas Ventas</h2>
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100 dark:bg-slate-600">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">Producto</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">Fecha</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">Monto</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">Thumbnail</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50 dark:hover:bg-slate-500">
              <td className="px-4 py-2 text-sm text-gray-700 dark:text-white">{item.title}</td>
              <td className="px-4 py-2 text-sm text-gray-700 dark:text-white">{item.date}</td>
              <td className="px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white">${item.amount}</td>
              <td className="px-4 py-2">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-10 h-10 object-cover rounded-full"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesList;
