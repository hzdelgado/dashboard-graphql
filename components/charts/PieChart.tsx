import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

interface PieChartProps {
  data: any;
  options: any;
}

const PieChart: React.FC<PieChartProps> = ({ data, options }) => {
  return <Pie data={data} options={options} />;
};

export default PieChart;
