'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
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
  LineChart
} from '@tremor/react';
import { Button } from '@tremor/react';
import { BanknotesIcon } from '@heroicons/react/24/outline';
import Chart from './chart';
import TransTable from './transtable';
import styles from './page.module.css';
import { useRouter, usePathname } from 'next/navigation';

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
  },
  {
    title: 'Customers',
    metric: '1,072',
    metricPrev: '856'
  }
];

export default function GroupPage({
  params,
}: {
  params: { groupId: string };
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  console.log('got the params',params);

  const handleClick = () => {
    const query = { groupId: params.groupId};
    const href = `/newexpensegroup?${new URLSearchParams(query).toString()}`;
    router.replace(href)
    // Redirect to new page with query parameters
    // window.location.href = href;
  };

  const users = [
    {
      id: 1,
      email: 'john.doe@example.com',
      name: 'John Doe',
      username: 'johndoe'
    },
    {
      id: 2,
      email: 'jane.doe@example.com',
      name: 'Jane Doe',
      username: 'janedoe'
    },
    {
      id: 3,
      email: 'bob.smith@example.com',
      name: 'Bob Smith',
      username: 'bobsmith'
    }
  ];

  const userData = [
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
  const groupData = [
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
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Metric>Group</Metric>
      <Button
        icon={BanknotesIcon}
        size="xl"
        onClick={handleClick}
        style={{ marginTop: '1.5rem' }}
        color="emerald"
      >
        ADD EXPENSE
      </Button>
      <Chart data={userData} />
      <Chart data={groupData} />
      <Flex justifyContent="center" alignItems="baseline">
        <Card className="mt-6 overflow-y-auto h-80 ">
          <Title className="mb-4">Expense List</Title>
          <TransTable users={users} />
        </Card>
      </Flex>
    </main>
    
  );
}
