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
    category: 'Website',
    stat: '10,234',
    data: website
  },
  {
    category: 'Online Shop',
    stat: '12,543',
    data: shop
  },
  {
    category: 'Mobile App',
    stat: '2,543',
    data: app
  },
  {
    category: 'Mobile App',
    stat: '2,543',
    data: app
  },
  {
    category: 'Mobile App',
    stat: '2,543',
    data: app
  }
];

const dataFormatter = (number: number) =>
  Intl.NumberFormat('us').format(number).toString();

const categories: {
  title: string;
  metric: string;
  metricPrev: string;
}[] = [
  {
    title: 'Sales',
    metric: '$ 12,699',
    metricPrev: '$ 9,456'
  },
  {
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
  }  
  return (
    <>
    <Flex className='mt-8' alignItems="end" justifyContent='center'>
            <Button
              className='mt-1'
              size="xl"
              color='green'
              variant="secondary"
              onClick={clickHandler}
            >
              Create Group
            </Button>
          </Flex>
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Grid className="gap-6" numColsSm={2} numColsLg={2}>
        {categories.map((item) => (
          <Card key={item.title}>
            <Flex alignItems="start">
              <Metric>{item.title}</Metric>
              <Metric>{item.metric}</Metric>
            </Flex>

            <Text className="truncate">from {item.metricPrev}</Text>
          </Card>
        ))}
        {/* <Card className='bg-transparent '> */}
          
        {/* </Card> */}
      </Grid>
      <Grid className="mt-8 gap-6" numColsSm={2} numColsLg={3}>
        {data.map((item) => (
          <Card
            key={item.category}
            className={styles.card}
            onClick={() => {
              router.push(`/group/${item.category}`);
            }}
          >
            <Metric>{item.category}</Metric>
            <Flex
              className="space-y-6"
              justifyContent="between"
              alignItems="baseline"
            >
              <Title style={{ color: '#ef4444' }}>Money Owed</Title>
              <Bold style={{ color: '#ef4444' }}>{item.stat}</Bold>
            </Flex>
            <Flex justifyContent="between" alignItems="baseline">
              <Title style={{ color: '#22c55e' }}>Money You Owe</Title>
              <Bold style={{ color: '#22c55e' }}>{item.stat}</Bold>
            </Flex>
            <Flex className="mt-4">
              <Text>
                <Bold>Category</Bold>
              </Text>
              <Text>
                <Bold>Amount</Bold>
              </Text>
            </Flex>
            <DonutChart
              className="mt-6"
              category="value"
              index="name"
              data={item.data}
              valueFormatter={dataFormatter}
            />
          </Card>
        ))}
      </Grid>
    </main>
    </>
  );
}
