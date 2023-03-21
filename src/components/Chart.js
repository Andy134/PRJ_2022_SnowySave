import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
);

export const options = {
responsive: true,
plugins: {
    legend: {
        position: 'right',
    },
    title: {
        display: true,
        text: 'Thống kê giao dịch theo tháng',
    },
},
};

export default function Chart(params) {

    const labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

    const data = {
        labels,
        datasets: [
          {
            label: 'Income',
            data: [21,32,43,54,43,54,32],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Outcome',
            data: labels.map(() => 65),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          }
        ],
    };

    return <div className='p-5'>
        <Bar options={options} data={data} />
    </div>
}