// src/components/MonthlyColumnChart.js

import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const MonthlyColumnChart = ({chartTitle}) => {
  const [chartOptions] = useState({
    chart: {
      id: 'monthly-column-chart',
      type: 'bar',
    },
    xaxis: {
      categories: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ]
    },
    colors: ['#FFCB82'], // Set the bar color here
    title: {
      text: `${chartTitle}`,
      align: 'center',
      style: {
        fontSize: '20px',
        color: '#263238'
      }
    },
    dataLabels: {
        enabled: true,
        style: {
          colors: ['#000000'] // Set the data labels text color to black
        }
      }
  });

  const [chartSeries] = useState([{
    name: 'Data',
    data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 132, 110, 95] // Example data
  }]);

  return (
    <div className="chart my-8 w-full">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height="350"
      />
    </div>
  );
}

export default MonthlyColumnChart;
