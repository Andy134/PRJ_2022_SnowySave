import {
  BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title,
  Tooltip
} from 'chart.js';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { AppContext } from '../pages/Root';

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
        text: 'Thống kê giao dịch theo tháng ($year)',
    },
},
};

export default function Chart(params) {

    const [dataSet, setData] = useState({
      income : Array(12).fill(0),
      outcome : Array(12).fill(0),
    })

    const labels = [...Array(12).keys()].map(i => `Tháng ${i+1}`);

    const data = {
        labels,
        datasets: [
          {
            label: 'Income',
            data: dataSet.income,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Outcome',
            data: dataSet.outcome,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          }
        ],
    };

    const {history} = useContext(AppContext);

    useEffect(()=>{

      if(history.length > 0){
        function getDate(date){
          var check = moment(date, 'YYYY/MM/DD');
          return {
            day: check.format('D'),
            month: check.format('M'),
            year: check.format('YYYY')
          }
        }

        const groupByMonthHistory = history.reduce((acc, obj) => {
          const key = getDate(obj["date"]).month;
          const curGroup = acc[key] ?? [];
      
          return { ...acc, [key]: [...curGroup, obj] };
        }, {});

        [...Array(12).keys()].map((i => {
          const idx = i + 1
          const currentGroupByMonthHistory = groupByMonthHistory[idx]
          
        }))

        // labels.forEach 
      }

      // eslint-disable-next-line
    },[history])

    return  <div className="row justify-content-center">
      <div className="col-sm-12 col-md-9" >
          <Bar options={options} data={data} />
      </div>
    </div>
}