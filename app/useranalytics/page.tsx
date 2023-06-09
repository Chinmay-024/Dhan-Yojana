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
// import UsersTable from '../table';
import TransTable from '../group/[groupId]/transtable';
import { NoSsr } from '@mui/material';
import { useEffect, useState } from 'react';
import UserChart from './userChart';
import NotAuthenticated from '../notAuth';
import Loading from '../loading';

const dataFormatter = (number: number) =>
  Intl.NumberFormat('us').format(number).toString();

export default function PlaygroundPage() {
  const router = useRouter();
  const [payments, setPayments] = useState<any>([]);
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState({});
  const [userName, setUserName] = useState('');
  const [tableData, setTableData] = useState([]);
  const [userMail, setUserMail] = useState('');

  useEffect(() => {
    const a = setTimeout(() => {
      if (typeof window !== 'undefined') {
        let user2 =
          localStorage.getItem('user') ||
          '{"id":"none","name":"none","email":"none"}';
        setUser(JSON.parse(user2));
        setUserMail(JSON.parse(user2).email);
        setUserName(JSON.parse(user2).name);
        setUserId(JSON.parse(user2).id);
        // //console.log(user2);
      }
    }, 2000);

    const expenseData = async () => {
      const res = await fetch('/api/user/getPayments');
      const resData: any = await res.json();
      // //console.log('sadada', resData.payments);user
      setTableData(resData.payments);
      const selectedColumnsArray = resData.payments.reduce(
        (acc: any, payment: any) => {
          const existingPayment = acc.find(
            (p: any) => p.Date.toString() === payment.createdAt.toString()
          );
          if (existingPayment) {
            if (payment.owned) {
              existingPayment.Owed += parseFloat(payment.amount);
            } else {
              existingPayment.Paid += parseFloat(payment.amount);
            }
          } else {
            acc.push({
              Date: payment.createdAt,
              Paid: payment.owned ? 0 : parseFloat(payment.amount),
              Owed: payment.owned ? parseFloat(payment.amount) : 0
            });
          }
          return acc;
        },
        []
      );
      setPayments(selectedColumnsArray);
      // console.log(selectedColumnsArray);
    };
    expenseData();
    return () => {
      clearTimeout(a);
    };
  }, []);

  if (userMail == '') {
    return (
      <>
        <Loading />
      </>
    );
  }
  if (userId == undefined || userId == 'none') {
    return (
      <>
        <NotAuthenticated></NotAuthenticated>
      </>
    );
  }
  const handleClick = () => {
    router.push('/newexpense');
  };

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
          <Card className="mt-6">
            <Title className="mb-4">Expense List</Title>
            {tableData && (
              <TransTable
                paymentData={tableData}
                userName={userName}
                userMail={userMail}
              />
            )}
          </Card>
        </Flex>
      </main>
    </NoSsr>
  );
}
