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
import { XMarkIcon } from '@heroicons/react/24/outline';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import { EyeIcon } from '@heroicons/react/24/outline';
import Chart from './chart';
import TransTable from './transtable';
import styles from './page.module.css';
import { useRouter, usePathname } from 'next/navigation';
import * as React from 'react';

import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { CircularProgress } from '@mui/material';
import Adduser from './formModal';
import { List, ListItem } from '@tremor/react';
import { useEffect } from 'react';

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

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

export default function GroupPage({ params }: { params: { groupId: string } }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  // console.log('got the params', params);
  const [allUser, setAllUser] = React.useState<any>([]);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [fetchedPayments, setFetchedPayments] = React.useState(false);
  const [allPayments, setAllPayments] = React.useState<any>([]);
  const handleOpen = () => setOpen(true);
  const handleOpen2 = () => setOpen2(true);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);

  const [userPayments, setUserPayments] = React.useState<any>([]);
  const [groupPayments, setGroupPayments] = React.useState<any>([]);

  useEffect(() => {
    const getData = async () => {
      const resData = await fetch('/api/user/getAllUser');
      const data: any = await resData.json();
      // console.log('all users', data.users);
      setAllUser([...data.users]);
    };

    getData();
    const expenseGroupData = async () => {
      var userMail = '20cs01009@iitbbs.ac.in';
      const res = await fetch(`/api/groups/getPayments/${params.groupId}`);
      const resData = await res.json();
      setAllPayments(resData.payments);
      setFetchedPayments(true);
      const filteredArray = resData.payments.filter(
        (obj: {
          name: string;
          email: string;
          amount: number;
          owned: boolean;
          paymentId: number;
          type: string;
          title: string;
          updatedAt: string;
        }) => obj.owned == false
      );
      const filteredArrayForUser = resData.payments.filter(
        (obj: {
          name: string;
          email: string;
          amount: number;
          owned: boolean;
          paymentId: number;
          type: string;
          title: string;
          updatedAt: string;
        }) => obj.owned == false && obj.email == userMail
      );

      const selectedColumnsArray = filteredArray.map(
        (obj: { updatedAt: any; amount: any }) => {
          return {
            Date: obj.updatedAt,
            Expense: obj.amount
          };
        }
      );
      const selectedColumnsArrayonUser = filteredArrayForUser.map(
        (obj: { updatedAt: any; amount: any }) => {
          return {
            Date: obj.updatedAt,
            Expense: obj.amount
          };
        }
      );
      setGroupPayments(selectedColumnsArray);
      setUserPayments(selectedColumnsArray);
    };
    expenseGroupData();
  }, [params.groupId]);

  const addCommentHandler = (event: any) => {
    event.preventDefault();
    // console.log('asd', 1);
    setOpen(false);
  };
  const addCommentHandler2 = (event: any) => {
    event.preventDefault();
    // console.log('qwe', 2);
    setOpen2(false);
  };

  const handleClick = () => {
    router.push(`/newexpensegroup/${params.groupId}`);
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

  return (
    <>
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
        <Button
          icon={UserPlusIcon}
          size="xl"
          onClick={handleOpen}
          style={{ marginTop: '1.5rem', marginLeft: '1rem' }}
          color="emerald"
        >
          Add User
        </Button>
        <Button
          icon={EyeIcon}
          size="xl"
          onClick={handleOpen2}
          style={{ marginTop: '1.5rem', marginLeft: '1rem' }}
          color="emerald"
        >
          See All User
        </Button>

        <Chart expenseData={userPayments} />
        <Chart expenseData={groupPayments} />
        <Flex justifyContent="center" alignItems="baseline">
          <Card className="mt-6 overflow-y-auto h-80 ">
            <Title className="mb-4">Expense List</Title>
            {!fetchedPayments && (
              <>
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
                </Box>
                <Text className="mt-2" color="blue">
                  {' '}
                  Fetching Expenses
                </Text>
              </>
            )}
            {fetchedPayments && allPayments.length > 0 && (
              <TransTable users={users} />
            )}
            {fetchedPayments && allPayments.length === 0 && (
              <Text>No Expense Yet!!!</Text>
            )}
            {fetchedPayments && allPayments.length > 0 && (
              <TransTable paymentData={allPayments} />
            )}
            {fetchedPayments && allPayments.length === 0 && (
              <Text>No Expense Yet!!!</Text>
            )}
          </Card>
        </Flex>
      </main>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <form>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Type Comment
              </Typography>
              <Adduser userData={allUser} />
              <Flex justifyContent="center">
                <Button
                  size="xl"
                  onClick={addCommentHandler}
                  style={{ marginTop: '1.5rem' }}
                  color="emerald"
                >
                  Add
                </Button>
              </Flex>
            </form>
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open2}
        onClose={handleClose2}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Fade in={open2}>
          <Box sx={style}>
            <form>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                All Users
              </Typography>
              <List>
                {categories.map((user, i) => (
                  <ListItem key={i + 1} className="block">
                    <div className="flex flex-col items-center justify-center">
                      <div>
                        <Flex>
                          <Text color="stone">{user.title}</Text>
                        </Flex>
                      </div>
                      <div>
                        <Text color="gray">{user.title}</Text>
                      </div>
                    </div>
                  </ListItem>
                ))}
              </List>
              <Flex justifyContent="center">
                <Button
                  icon={XMarkIcon}
                  size="xl"
                  onClick={addCommentHandler2}
                  style={{ marginTop: '1.5rem' }}
                  color="emerald"
                >
                  Close
                </Button>
              </Flex>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
