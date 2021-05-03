import React, { useState, useEffect } from 'react'
import './Chard.module.scss'
import { fetchDailyData } from '../../api'
import { Line, Bar } from 'react-chartjs-2'

import styles from './Chard.module.scss'

const Chart = ({ data: {confirmed, deaths, recovered }, country }) => {
  const [dailyData, setDailyData] = useState([])

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData())
    }
    console.log(dailyData)
    fetchAPI()
  }, [])

  const lineChartData = (canvas) => {
    const ctx = canvas.getContext("2d")
    const gradient = ctx.createLinearGradient(0, 0, 0, 800);
    gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)');
    gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

    const gradient2 = ctx.createLinearGradient(0, 0, 0, 800);
    gradient2.addColorStop(0, 'rgba(51, 51, 255, 0.5)');
    gradient2.addColorStop(0.5, 'rgba(51, 51, 255, 0.25)');
    gradient2.addColorStop(1, 'rgba(51, 51, 255, 0)');

    return {
      labels: dailyData.map(({ date }) => date),
      datasets: [{
        data: dailyData.map((data) => data.confirmed),
        label: 'Infected',
        borderColor: '#3333ff',
        borderWidth: 1,
        backgroundColor: gradient2,
        fill: true,
      }, {
        data: dailyData.map((data) => data.deaths),
        label: 'Deaths',
        borderColor: '#911215',
        borderWidth: 1,
        backgroundColor: gradient,
        fill: true,
      },
      ],
    }
  }

  const lineChart = (
    dailyData.length ? (
      <Line data={lineChartData} />
    ) : null
  );

  const barChart = (
    confirmed ? (
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
              data: [confirmed.value, recovered.value, deaths.value],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}` },
        }}
      />
    ) : null
  );

  return (
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
  )
}

export default Chart
