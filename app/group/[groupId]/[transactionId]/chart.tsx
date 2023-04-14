'use client';

import { Card, AreaChart, Title, Text,LineChart } from '@tremor/react';

const data = [
  {
    Month: 'Jan 21',
    Sales: 2890,
    Profit: 2400
  },
  {
    Month: 'Feb 21',
    Sales: 1890,
    Profit: 1398
  },
  {
    Month: 'Mar 21',
    Sales: 1890,
    Profit: 100
  },
  {
    Month: 'Apr 21',
    Sales: 1890,
    Profit: 200
  },
  {
    Month: 'Jan 22',
    Sales: 3890,
    Profit: 2980
  }
];

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat('us').format(number).toString()}`;

export default function Chart() {
  return (
    <Card className="mt-8">
      <Title>Performance</Title>
      <Text>Comparison between Sales and Profit</Text>

      <AreaChart
      className="mt-6"
      data={data}
      index="Month"
      categories={[ 'Profit']}
      colors={["blue"]}
      valueFormatter={valueFormatter}
      // yAxisWidth={40}
    />
    </Card>
  );
}
