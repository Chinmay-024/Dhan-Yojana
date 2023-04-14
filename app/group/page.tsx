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
  Button
} from '@tremor/react';
import { useRouter } from 'next/navigation';
import Chart from './chart';
import styles from './page.module.css';
const website = [
  { name: '/home', value: 1230 },
  { name: '/contact', value: 751 },
  { name: '/gallery', value: 471 },
  { name: '/august-discount-offer', value: 280 },
  { name: '/case-studies', value: 78 }
];

const shop = [
  { name: '/home', value: 453 },
  { name: '/imprint', value: 351 },
  { name: '/shop', value: 271 },
  { name: '/pricing', value: 191 }
];

const app = [
  { name: '/shop', value: 789 },
  { name: '/product-features', value: 676 },
  { name: '/about', value: 564 },
  { name: '/login', value: 234 },
  { name: '/downloads', value: 191 }
];

const data = [
  {
    groupId: 1,
    category: 'Website',
    stat: '10,234',
    data: website
  },
  {
    groupId: 2,
    category: 'Online Shop',
    stat: '12,543',
    data: shop
  },
  {
    groupId: 3,
    category: 'Mobile App',
    stat: '2,543',
    data: app
  },
  {
    groupId: 4,
    category: 'Mobile App',
    stat: '2,543',
    data: app
  },
  {
    groupId: 5,
    category: 'Mobile App',
    stat: '2,543',
    data: app
  }
];

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

export default function Groups() {
  const router = useRouter();
  console.log(data[0]);
  const valueFormatter = (number: number) =>
    `$ ${Intl.NumberFormat('us').format(number).toString()}`;

  const clickHandler = () => {
    router.replace('/newgroup');
  };
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap'
          }}
        >
          <Card
            decoration="top"
            decorationColor="emerald"
            style={{
              marginRight: '1rem',
              minWidth: '20rem',
              maxWidth: '35rem'
            }}
          >
            <Flex alignItems="start">
              <Text>Total Amount</Text>
            </Flex>
            <Flex
              className="space-x-3 truncate"
              justifyContent="start"
              alignItems="baseline"
            >
              <Metric>₹ 5000</Metric>
            </Flex>
          </Card>
          <Card
            decoration="top"
            decorationColor="emerald"
            style={{ minWidth: '20rem', maxWidth: '35rem' }}
          >
            <Flex alignItems="start">
              <Text>This Month</Text>
            </Flex>
            <Flex
              className="space-x-3 truncate"
              justifyContent="start"
              alignItems="baseline"
            >
              <Metric>₹ 5000</Metric>
            </Flex>
          </Card>
        </div>
        <Grid className="mt-5 gap-6" numColsSm={2} numColsLg={3}>
          {data.map((item) => (
            <Card
              key={item.category}
              className={styles.card}
              onClick={() => {
                router.push(
                  `/group/id=${item.groupId}?groupId=${item.groupId}`
                );
              }}
            >
              <Metric>{item.category}</Metric>
              <Flex
                className="space-y-6"
                justifyContent="between"
                alignItems="baseline"
              >
                <Text style={{ color: '#50C878' }}>Money Owed</Text>
                <Bold style={{ color: '#50C878' }}>{item.stat}</Bold>
              </Flex>
              <DonutChart
                className="mt-6"
                category="value"
                index="name"
                data={item.data}
                colors={['emerald', 'green', 'teal']}
                valueFormatter={dataFormatter}
              />
            </Card>
          ))}
        </Grid>
      </main>
    </>
  );
}
