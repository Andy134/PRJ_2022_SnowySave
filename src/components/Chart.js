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
    position: 'top',
    },
    title: {
    display: true,
    text: 'Chart.js Bar Chart',
    },
},
};

export default function Chart(params) {

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

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

    return <>
        <Bar options={options} data={data} />
    </>
}