'use client';

import {
  Card,
  AreaChart,
  Title,
  Text,
  SelectBox,
  SelectBoxItem,
  Flex,
  Grid,
  Metric
} from '@tremor/react';
import { useState } from 'react';

interface MonthwiseData {
  [key: string]: { Paid: number; Owed: number };
}

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat('us').format(number).toString()}`;

export default function UserChart({ expenseData, title }: any) {
  // //console.log(expenseData);
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString()
  );
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().getMonth() <= 8
      ? `0${new Date().getMonth() + 1}`
      : (new Date().getMonth() + 1).toString()
  );

  const [selectedYear2, setSelectedYear2] = useState<string>(
    new Date().getFullYear().toString()
  );
  const [maxValue, setMaxValue] = useState<number>(0);
  const monthwiseData: MonthwiseData = {};

  let max = 0;
  let max2 = 0;
  expenseData.forEach(
    (item: {
      Date: { split: (arg0: string) => [any, any] };
      Paid: string;
      Owed: string;
    }) => {
      max = Math.max(max, parseFloat(item.Paid), parseFloat(item.Owed), max);
      const [itemYear, itemMonth] = item.Date.split('-');
      if (itemYear == selectedYear2.toString()) {
        if (monthwiseData[itemMonth]) {
          monthwiseData[itemMonth].Paid += parseFloat(item.Paid);
          monthwiseData[itemMonth].Owed += parseFloat(item.Owed);
        } else {
          monthwiseData[itemMonth] = {
            Paid: parseFloat(item.Paid),
            Owed: parseFloat(item.Owed)
          };
        }
        max2 = Math.max(
          max2,
          monthwiseData[itemMonth].Paid,
          monthwiseData[itemMonth].Owed
        );
      }
    }
  );

  const chartData = Object.keys(monthwiseData).map((month) => ({
    Month: `${selectedYear2}-${month}`,
    Paid: monthwiseData[month].Paid,
    Owed: monthwiseData[month].Owed
  }));
  // //console.log(monthwiseData);
  return (
    <Grid className="mt-5 gap-6" numColsSm={2} numColsLg={2}>
      <Card>
        <Title> {title}</Title>
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
          data={expenseData.filter(
            (item: any) =>
              item.Date.substr(0, 4) === selectedYear &&
              item.Date.substr(5, 2) === selectedMonth
          )}
          index="Date"
          autoMinValue={true}
          maxValue={max}
          categories={['Paid', 'Owed']}
          colors={['blue', 'red']}
          valueFormatter={valueFormatter}
          // yAxisWidth={40}
        />
      </Card>
      <Card>
        <Title> {title}</Title>
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
          categories={['Paid', 'Owed']}
          colors={['blue', 'red']}
          maxValue={max2}
          valueFormatter={valueFormatter}
          // yAxisWidth={40}
        />
      </Card>
      {/* </div> */}
    </Grid>
  );
}
