import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const MonthlyColumnChart = ({ chartTitle }) => {
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

  const [chartSeries, setChartSeries] = useState([{
    name: 'Data',
    data: [] // Initialize with an empty array
  }]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get authToken from session storage
        const authToken = sessionStorage.getItem('authToken');

        if (!authToken) {
          console.error('No authToken found in session storage');
          return;
        }

        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/students/students/graph`, {
          headers: {
            'Authorization': `Bearer ${authToken}` // Include the authToken in the headers
          }
        });

        const responseData = response.data;

        // Map the response data to the chart data format
        const chartData = responseData.map(item => {
          const monthName = Object.keys(item)[0]; // Get the month name (e.g., "January")
          return item[monthName]; // Get the value for that month
        });

        setChartSeries([{
          name: 'Data',
          data: chartData
        }]);
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on component mount

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
