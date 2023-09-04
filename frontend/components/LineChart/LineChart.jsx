import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

import { COLORS } from '@/utils/theme'

const LineChart = ({ chartData }) => {
  /// chat GPT ///
  const gradientFill = (context) => {
    const chart = context.chart
    const { ctx, chartArea } = chart

    if (!chartArea) {
      return null
    }

    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
    gradient.addColorStop(0, 'white') // Start with white color
    gradient.addColorStop(1, `${COLORS.light_purple}`) // End with black color

    return gradient
  }
  /// chat GPT konec ///

  const CHART_DATA = {
    labels: chartData.map(
      (data) => `${new Date(data.last_updated).getDate()}.${new Date(data.last_updated).getMonth() + 1}.` //${new Date(data.last_updated).getFullYear()
    ),
    datasets: [
      {
        label: 'price',
        data: chartData.map((data) => data.price),
        fill: true,
        backgroundColor: gradientFill,
        borderColor: `${COLORS.very_dark_purple}`,
        tension: 0.3,
      },
    ],
  }

  const STYLE = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return '$' + value.toFixed(2)
          },
          color: `${COLORS.very_dark_purple}`,
        },
      },
      x: {
        ticks: {
          color: `${COLORS.very_dark_purple}`,
        },
      },
    },
  }
  return <Line data={CHART_DATA} options={STYLE} />
}

export default LineChart
