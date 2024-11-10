import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registering chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ReportStatusChart = ({ statistics }) => {
  // Data untuk chart
  const data = {
    labels: ['Pending', 'In Progress', 'Completed'],
    datasets: [
      {
        label: 'Reports Status',
        data: [
          statistics.pendingReports,
          statistics.inProgressReports,
          statistics.completedReports
        ],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1
      }
    ]
  };

  // Opsi untuk chart
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Laporan Statistik'
      }
    }
  };

  return <Line data={data} options={options} />;
};

export default ReportStatusChart;
