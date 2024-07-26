import { Chart } from 'primereact/chart';
import React, { useState, useEffect } from 'react';

export default function PieChart({label,values,colors}) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
      setTimeout(()=>{
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: label,
            datasets: [
                {
                    data: values,
                    backgroundColor: [
                        documentStyle.getPropertyValue(colors[0]), 
                        documentStyle.getPropertyValue(colors[1]), 
                    ]
                }
            ]
        }
        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true  
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
      },1000)
    }, []);

    return (
        <div className="card flex justify-content-center">
            <Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-40rem" />
        </div>
    )
}
    