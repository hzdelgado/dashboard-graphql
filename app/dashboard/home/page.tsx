"use client"
import BarChart from '@/components/charts/BarChart';
import PieChart from '@/components/charts/PieChart';
import SalesList from '@/components/dashboard/SalesList';
import NotificationList from '@/components/dashboard/NotificationList';

// Datos estáticos para el listado de ventas
const staticSalesData = [
  { id: 1, title: 'Venta de Producto A', amount: 200, date: '2024-11-20', thumbnail: 'https://via.placeholder.com/80' },
  { id: 2, title: 'Venta de Producto B', amount: 150, date: '2024-11-19', thumbnail: 'https://via.placeholder.com/80' },
  { id: 3, title: 'Venta de Producto C', amount: 300, date: '2024-11-18', thumbnail: 'https://via.placeholder.com/80' },
  { id: 4, title: 'Venta de Producto D', amount: 120, date: '2024-11-17', thumbnail: 'https://via.placeholder.com/80' },
  { id: 5, title: 'Venta de Producto E', amount: 250, date: '2024-11-16', thumbnail: 'https://via.placeholder.com/80' },
];

const staticNotifications = [
  { id: 1, message: 'Nueva venta realizada', time: 'Hace 2 minutos' },
  { id: 2, message: 'Nuevo producto añadido a tu tienda', time: 'Hace 10 minutos' },
  { id: 3, message: 'Revisión completada para el producto B', time: 'Hace 30 minutos' },
  { id: 4, message: 'Stock de Producto A casi agotado', time: 'Hace 1 hora' },
  { id: 5, message: 'Nuevo comentario en Producto C', time: 'Hace 2 horas' },
];

const Home = () => {

  const barChartData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [
      {
        label: 'Ventas por mes',
        data: [65, 59, 80, 81, 56],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ['Masculino', 'Femenino'],
    datasets: [
      {
        label: 'Porcentaje de Compradores por Género',
        data: [60, 40],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div className="p-8 dark:text-white" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <h1 className="text-2xl font-bold mb-4">Dashboard de Ventas</h1>

      <div className="grid grid-cols-2 gap-8">
        <div className="col-span-1">
          <h2 className="text-xl mb-4">Ventas por Mes (Gráfico de Barras)</h2>
          <div className="w-full" style={{ maxWidth: '600px', margin: '0 auto', overflow: 'auto' }}>
            <BarChart data={barChartData} options={{ responsive: true }} />
          </div>
        </div>

        <div className="col-span-1">
          <h2 className="text-xl mb-4">Compradores por Género (Gráfico de Pastel)</h2>
          <div className="w-full" style={{ maxWidth: '400px', margin: '0 auto', overflow: 'auto' }}>
            <PieChart data={pieChartData} options={{ responsive: true }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="col-span-1">
          <SalesList salesData={staticSalesData} />
        </div>

        <div className="col-span-1">
          <NotificationList notifications={staticNotifications} />
        </div>
      </div>
    </div>
  );
};

export default Home;
