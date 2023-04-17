'use client';
import {
  Card,
  Metric,
  Text,
  Flex,
  Grid,
  Title,
  BarList,
  Bold,
  DonutChart,
  Button,
  Subtitle
} from '@tremor/react';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useRouter } from 'next/navigation';
import Chart from './chart';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const dataFormatter = (number: number) =>
  Intl.NumberFormat('us').format(number).toString();

const categories: {
  groupId: number;
  title: string;
  metric: string;
  metricPrev: string;
}[] = [
  {
    groupId: 1,
    title: 'Sales',
    metric: '$ 12,699',
    metricPrev: '$ 9,456'
  },
  {
    groupId: 2,
    title: 'Profit',
    metric: '$ 40,598',
    metricPrev: '$ 45,564'
  }
];

interface Group {
  groupId: number;
  title: string;
  image: string;
  description: string;
}

interface Payment {
  total: number;
  type: string;
}
interface Payment1 {
  total: string;
  type: string;
}

interface MyObject {
  groups: Group[];
  paymentDetails: Payment[][];
  totalAmount: number;
  totalAmountForGroups: number[];
  totalAmountForMonth: number;
}
export default function Groups() {
  const router = useRouter();
  const [fetchData, setFetchData] = useState<MyObject>();

  const valueFormatter = (number: number) =>
    `$ ${Intl.NumberFormat('us').format(number).toString()}`;

  const clickHandler = () => {
    router.replace('/newgroup');
  };

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('/api/user/getAllGroupDetails');
      const resData = await res.json();
      console.log('sadada', resData);
      const newData = resData!!.paymentDetails.map((item: Payment1[]) => {
        return item.map((payment) => {
          return {
            total: parseFloat(payment.total),
            type: payment.type
          };
        });
      });
      const data12 = Array.from(newData);
      console.log('123', {
        groups: resData.groups,
        paymentDetails: newData,
        totalAmount: resData.totalAmount,
        totalAmountForGroups: resData.totalAmountForGroups,
        totalAmountForMonth: resData.totalAmountForMonth
      });
      setFetchData({
        groups: resData.groups,
        paymentDetails: newData,
        totalAmount: resData.totalAmount,
        totalAmountForGroups: resData.totalAmountForGroups,
        totalAmountForMonth: resData.totalAmountForMonth
      });
    };
    getData();
  }, []);

  return (
    <>
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <Flex
          alignItems="end"
          justifyContent="center"
          style={{ marginBottom: '1.5rem' }}
        >
          <Button
            className="mt-1"
            color="emerald"
            size="xl"
            // variant="secondary"
            onClick={clickHandler}
          >
            Create Group
          </Button>
        </Flex>
        <Grid className="mt-5 gap-6" numColsSm={2} numColsLg={3}>
          {fetchData && (
            <Card
              decoration="top"
              decorationColor={
                fetchData
                  ? fetchData.totalAmount >= 0
                    ? fetchData.totalAmount === 0
                      ? 'gray'
                      : 'emerald'
                    : 'red'
                  : 'gray'
              }
            >
              <Flex alignItems="start">
                <Text>Total Amount</Text>
              </Flex>
              <Flex
                className="space-x-3 truncate"
                justifyContent="start"
                alignItems="baseline"
              >
                <Metric>
                  {fetchData ? fetchData.totalAmount : '0'}{' '}
                  <CurrencyRupeeIcon />
                </Metric>
              </Flex>
            </Card>
          )}
          {fetchData && (
            <Card
              decoration="top"
              decorationColor={
                fetchData
                  ? fetchData.totalAmountForMonth >= 0
                    ? fetchData.totalAmountForMonth === 0
                      ? 'gray'
                      : 'emerald'
                    : 'red'
                  : 'gray'
              }
            >
              <Flex alignItems="start">
                <Text>This Month</Text>
              </Flex>
              <Flex
                className="space-x-3 truncate"
                justifyContent="start"
                alignItems="baseline"
              >
                <Metric>
                  {fetchData ? fetchData.totalAmountForMonth : '0'}
                  <CurrencyRupeeIcon />
                </Metric>
              </Flex>
            </Card>
          )}
          {fetchData && (
            <Card
              decoration="top"
              decorationColor={
                fetchData
                  ? fetchData.paymentDetails.length >= 0
                    ? fetchData.paymentDetails.length === 0
                      ? 'gray'
                      : 'emerald'
                    : 'red'
                  : 'gray'
              }
            >
              <Flex alignItems="start">
                <Text>No of Users</Text>
              </Flex>
              <Flex
                className="space-x-3 truncate"
                justifyContent="start"
                alignItems="baseline"
              >
                <Metric>
                  {fetchData ? fetchData.paymentDetails.length : '0'}
                </Metric>
              </Flex>
            </Card>
          )}
        </Grid>
        {!fetchData && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        )}
        <Grid className="mt-5 gap-6" numColsSm={2} numColsLg={3}>
          {fetchData &&
            fetchData.groups.map((item, i) => (
              <Card
                key={item.groupId}
                className={styles.card}
                onClick={() => {
                  router.push(`/group/${item.groupId}`);
                }}
              >
                <Metric>{item.title}</Metric>
                <Flex
                  className="space-y-6"
                  justifyContent="between"
                  alignItems="baseline"
                >
                  <Subtitle>Money Owed</Subtitle>
                  <Bold
                    style={{
                      color:
                        fetchData.totalAmountForGroups[i] >= 0
                          ? fetchData.totalAmountForGroups[i] === 0
                            ? 'grey'
                            : '#50C878'
                          : 'red'
                    }}
                  >
                    {fetchData.totalAmountForGroups[i]}
                  </Bold>
                </Flex>
                <DonutChart
                  className="mt-6"
                  category="total"
                  index="type"
                  data={
                    fetchData.paymentDetails[i].length > 0
                      ? fetchData.paymentDetails[i]
                      : [{ total: 0.00000000000001, type: 'noPaymentDetails' }]
                  }
                  colors={
                    fetchData.paymentDetails[i].length > 0
                      ? ['emerald', 'green', 'teal']
                      : ['gray']
                  }
                  valueFormatter={dataFormatter}
                />
              </Card>
            ))}
        </Grid>
      </main>
    </>
  );
}
