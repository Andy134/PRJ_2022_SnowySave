import {
  BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title,
  Tooltip
} from 'chart.js';
import { useContext, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { AppContext } from '../pages/Root';
import { util } from '../utility';

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

    const [dataSet, setData] = useState({
      income : Array(12).fill(0),
      outcome : Array(12).fill(0),
    })

    const labels = [...Array(12).keys()].map(i => `Tháng ${i+1}`);

    const data = {
        labels,
        datasets: [
          {
            label: 'Thu nhập',
            data: dataSet.income,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
          {
            label: 'Chi tiêu',
            data: dataSet.outcome,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',

          }
        ],
    };

    const {history} = useContext(AppContext);

    useEffect(()=>{

      if(history.length > 0){
        const groupByMonthHistory = history.reduce((acc, obj) => {
          const key = util.getDate(obj["date"]).month;
          const curGroup = acc[key] ?? [];
      
          return { ...acc, [key]: [...curGroup, obj] };
        }, {});

        let result = {}

        result.income = [...Array(12).keys()].map((i => {
          const idx = i + 1
          const totalIncomeByMonth = groupByMonthHistory[idx]?.filter(itm => itm.type === 'I')?.reduce((curr, itm) => curr + +itm.amount, 0) || 0;
          return totalIncomeByMonth
        }));

        result.outcome = [...Array(12).keys()].map((i => {
          const idx = i + 1
          const totalOutcomeByMonth = groupByMonthHistory[idx]?.filter(itm => itm.type === 'O')?.reduce((curr, itm) => curr + +itm.amount, 0) || 0;
          return totalOutcomeByMonth
        }));

        setData(result);
      }

      // eslint-disable-next-line
    },[history])

    return  <div className="row justify-content-center">
      <div className="col-sm-12 col-md-9" >
          <Bar options={options} data={data} />
      </div>
    </div>
}