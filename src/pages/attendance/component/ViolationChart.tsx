import React from 'react'
import { formatDate } from '@/utils/format'
import ReactEChart from 'echarts-for-react'
const ViolationChart = ({ title, renderList }) => {
  console.log(title)
  console.log(renderList)
  const xData = renderList.xData.map(item => formatDate(item))

  const option = {
    title: { text: title },
    tooltip: { trigger: 'axis' },
    yAxis: [{ type: 'value', minInterval: 1 }], // minInterVal  展示整数
    xAxis: [
      {
        type: 'category',
        data: xData
      }
    ],
    series: [
      {
        name: title + '人数',
        type: 'bar',
        data: renderList.yData
        // label: {
        //   show: true,
        //   precision: 1,
        //   position: 'top',
        //   valueAnimation: true
        // }
      }
    ]
  }
  return (
    <div className="violation-chart-comp">
      <ReactEChart option={option} style={{ width: '100%' }} />
    </div>
  )
}
export default ViolationChart
