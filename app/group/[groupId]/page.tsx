'use client';
import Link from "next/link";
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
import PaymentsIcon from '@mui/icons-material/Payments';
import {Button} from '@mui/material';
import Chart from './chart';
import UsersTable from '../../table';
import styles from './page.module.css';
import { useRouter } from "next/navigation";


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

export default function PlaygroundPage() {
  const router = useRouter();


  const handleClick = () => {
    const query = { groupId: 'test' };
    const href = `/newexpensegroup?${new URLSearchParams(query).toString()}`;
    // Redirect to new page with query parameters
    window.location.href = href;
  };

    
  const users = [
    { id: 1, email: 'john.doe@example.com', name: 'John Doe', username: 'johndoe' },
    { id: 2, email: 'jane.doe@example.com', name: 'Jane Doe', username: 'janedoe' },
    { id: 3, email: 'bob.smith@example.com', name: 'Bob Smith', username: 'bobsmith' },
    { id: 1, email: 'john.doe@example.com', name: 'John Doe', username: 'johndoe' },
    { id: 2, email: 'jane.doe@example.com', name: 'Jane Doe', username: 'janedoe' },
    { id: 3, email: 'bob.smith@example.com', name: 'Bob Smith', username: 'bobsmith' }
  ];
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Metric>Group</Metric>

    <Button variant="contained" onClick={handleClick} style={{marginTop:"1.5rem"}} endIcon={<PaymentsIcon />}>ADD EXPENSE</Button>

      <Chart />
      <Flex justifyContent="center" alignItems="baseline">
        <Card className="mt-6 overflow-y-auto h-80 ">
        <Title className="mb-4" >Expense List</Title>
          <UsersTable users={users} />
        </Card>
      </Flex>
    </main>
  );
}
