'use client';

import {
  Card,
  AreaChart,
  Title,
  Text,
  SelectBox,
  SelectBoxItem,
  Flex,
  Grid
} from '@tremor/react';
import { useState } from 'react';

const data = [
  {
    Date: '2021-01-01',
    Expense: 2400
  },
  {
    Date: '2021-02-01',
    Expense: 1398
  },
  {
    Date: '2021-02-05',
    Expense: 130
  },
  {
    Date: '2021-03-01',
    Expense: 100
  },
  {
    Date: '2021-04-01',
    Expense: 200
  },
  {
    Date: '2021-04-05',
    Expense: -100
  },
  {
    Date: '2021-04-25',
    Expense: 300
  },
  {
    Date: '2022-01-01',
    Expense: 2980
  }
];
interface MonthwiseData {
  [key: string]: number;
}

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat('us').format(number).toString()}`;

export default function Chart() {
  const [selectedYear, setSelectedYear] = useState<string>('2021');
  const [selectedMonth, setSelectedMonth] = useState<string>('01');

  const [selectedYear2, setSelectedYear2] = useState<string>('2021');

  const monthwiseData: MonthwiseData = {};
  data.forEach((item) => {
    const [itemYear, itemMonth] = item.Date.split('-');

    if (itemYear === selectedYear2.toString()) {
      if (monthwiseData[itemMonth]) {
        monthwiseData[itemMonth] += item.Expense;
      } else {
        monthwiseData[itemMonth] = item.Expense;
      }
    }
  });
  const chartData = Object.keys(monthwiseData).map((month) => ({
    Month: `${selectedYear2}-${month}`,
    Expense: monthwiseData[month]
  }));
  return (
    // <div
    //   style={{
    //     display: 'flex',
    //     justifyContent: 'center',
    //     flexWrap: 'wrap'
    //   }}
    // >

    <Grid className="mt-5 gap-6" numColsSm={2} numColsLg={2}>
      <Card>
        <Title>EXPENSES</Title>
        <Text>For current year</Text>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ margin: '0.5rem' }}>
            <SelectBox
              style={{
                maxWidth: '1rem'
              }}
              value={selectedYear}
              onValueChange={(e) => setSelectedYear(e)}
            >
              <SelectBoxItem value="2018">2018</SelectBoxItem>
              <SelectBoxItem value="2019">2019</SelectBoxItem>
              <SelectBoxItem value="2021">2021</SelectBoxItem>
              <SelectBoxItem value="2022">2022</SelectBoxItem>
              <SelectBoxItem value="2023">2023</SelectBoxItem>
            </SelectBox>
          </div>
          <div style={{ margin: '0.5rem' }}>
            <SelectBox
              style={{
                maxWidth: '1rem'
              }}
              value={selectedMonth}
              onValueChange={(e) => setSelectedMonth(e)}
            >
              <SelectBoxItem value="01">January</SelectBoxItem>
              <SelectBoxItem value="02">February</SelectBoxItem>
              <SelectBoxItem value="03">March</SelectBoxItem>
              <SelectBoxItem value="04">April</SelectBoxItem>
              <SelectBoxItem value="05">May</SelectBoxItem>
              <SelectBoxItem value="06">June</SelectBoxItem>
              <SelectBoxItem value="07">July</SelectBoxItem>
              <SelectBoxItem value="08">August</SelectBoxItem>
              <SelectBoxItem value="09">September</SelectBoxItem>
              <SelectBoxItem value="10">October</SelectBoxItem>
              <SelectBoxItem value="11">November</SelectBoxItem>
              <SelectBoxItem value="12">December</SelectBoxItem>
            </SelectBox>
          </div>
        </div>
        <AreaChart
          className="mt-6"
          data={data.filter(
            (item) =>
              item.Date.substr(0, 4) === selectedYear &&
              item.Date.substr(5, 2) === selectedMonth
          )}
          index="Date"
          categories={['Expense']}
          colors={['blue']}
          valueFormatter={valueFormatter}
          // yAxisWidth={40}
        />
      </Card>
      <Card>
        <Title>EXPENSES</Title>
        <Text>For selected year</Text>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1rem'
          }}
        >
          <SelectBox
            style={{
              maxWidth: '1rem'
            }}
            value={selectedYear2}
            onValueChange={(e) => setSelectedYear2(e)}
          >
            <SelectBoxItem value="2018">2018</SelectBoxItem>
            <SelectBoxItem value="2019">2019</SelectBoxItem>
            <SelectBoxItem value="2021">2021</SelectBoxItem>
            <SelectBoxItem value="2022">2022</SelectBoxItem>
            <SelectBoxItem value="2023">2023</SelectBoxItem>
          </SelectBox>
        </div>
        <AreaChart
          className="mt-6"
          data={chartData}
          index="Month"
          categories={['Expense']}
          colors={['blue']}
          valueFormatter={valueFormatter}
          // yAxisWidth={40}
        />
      </Card>
      {/* </div> */}
    </Grid>
  );
}
