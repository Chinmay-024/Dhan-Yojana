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
  LineChart,
  Button
} from '@tremor/react';
import { BanknotesIcon } from '@heroicons/react/24/outline';
import { useRouter, usePathname } from 'next/navigation';
import UsersTable from '../table';
import { NoSsr } from '@mui/material';
import { useEffect, useState } from 'react';
import UserChart from './userChart';

const dataFormatter = (number: number) =>
  Intl.NumberFormat('us').format(number).toString();

export default function PlaygroundPage() {
  const router = useRouter();
  const [payments, setPayments] = useState<any>([]);

  useEffect(() => {
    const expenseData = async () => {
      const res = await fetch('/api/user/getPayments');
      const resData = await res.json();
      console.log('sadada', resData.payments);

      const selectedColumnsArray = resData.payments.map(
        (obj: { owned: any; updatedAt: any; amount: any }) => {
          return {
            Date: obj.updatedAt,
            Paid: !obj.owned ? 0 : obj.amount,
            Owed: !obj.owned ? obj.amount : 0
          };
        }
      );
      setPayments(selectedColumnsArray);
    };
    expenseData();
  }, []);

  const handleClick = () => {
    router.push('/newexpense');
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
    },
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
  return (
    <NoSsr>
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <Metric>ANALYTICS</Metric>
        <Button
          icon={BanknotesIcon}
          size="xl"
          onClick={handleClick}
          style={{ marginTop: '1.5rem' }}
          color="emerald"
        >
          ADD EXPENSE
        </Button>
        <UserChart expenseData={payments} />
        <Flex justifyContent="center" alignItems="baseline">
          <Card className="mt-6 overflow-y-auto h-80 ">
            <Title className="mb-4">Expense List</Title>
            <UsersTable users={users} />
          </Card>
        </Flex>
      </main>
    </NoSsr>
  );
}
