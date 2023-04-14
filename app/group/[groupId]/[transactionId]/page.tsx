'use client';
import {
  Card,
  Metric,
  Text,
  Flex,
  Grid,
  Col,
  Title,
  AreaChart
} from '@tremor/react';
import { useRouter } from 'next/navigation';
import Chart from './chart';
import styles from './page.module.css';


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
export default function TransactionId() {
  const router = useRouter();
  const valueFormatter = (number: number) =>
    `$ ${Intl.NumberFormat('us').format(number).toString()}`;
  return (
    <>
      <main className="p-4 md:p-10 mx-auto max-w-7xl ">
        <Grid numCols={1} numColsSm={2} numColsLg={3} className="gap-2">
        <Col numColSpan={3}>
            <Card>
              <Text>Title</Text>
              <Metric>KPI 3</Metric>
            </Card>
        </Col>
          <Col numColSpan={1} numColSpanLg={2}>
            <Card>
              <Title>Performance</Title>
              <Text>Comparison between Sales and Profit</Text>

              <AreaChart
                className="mt-6"
                data={data}
                index="Month"
                categories={['Profit']}
                colors={['blue']}
                valueFormatter={valueFormatter}
                // yAxisWidth={40}
              />
            </Card>
          </Col>
          <Card>
            <Metric>Comments</Metric>
            
          </Card>
        </Grid>
      </main>
    </>
  );
}
