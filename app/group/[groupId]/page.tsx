'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, Metric, Text, Flex, Grid, Title, Icon } from '@tremor/react';
import { Button } from '@tremor/react';
import { BanknotesIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import { EyeIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/outline';
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
  const [friends, setFriends] = React.useState<any>([]);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [fetchedPayments, setFetchedPayments] = React.useState(false);
  const [allPayments, setAllPayments] = React.useState<any>([]);
  const [addingUser, setAddingUser] = React.useState(false);
  const [firstAdd, setFirstAdd] = React.useState(0);
  const [fetchingUsers, setFetchingUsers] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleOpen2 = () => setOpen2(true);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);

  // console.log('alluser', allUser);
  React.useEffect(() => {
    let intial_user: any = [];
    let intial_friends: any = [];
    const getData = async () => {
      const resData = await fetch('/api/user/getAllUser');
      const data: any = await resData.json();
      console.log('all users', data.users);
      intial_user = [...data.users];
      const resData2 = await fetch(`/api/groups/findFriends/${params.groupId}`);
      const data2: any = await resData2.json();
      // console.log('response of friends', data);
      // console.log("setFriends",data.users);
      intial_friends = [...data2.users];
      // console.log("Friends :->",intial_friends)
      setFriends([...intial_friends]);
      console.log('unfiltered', intial_user);
      intial_user = intial_user.filter(
        (itema: any) =>
          !intial_friends.some((itemb: any) => itemb.email === itema.email)
      );
      console.log('filtered', intial_user);
      setAllUser([...intial_user]);
      setFetchingUsers(false);
    };
    const getFriends = async () => {
      // const resData = await fetch(`/api/groups/findFriends/${params.groupId}`);
      // const data: any = await resData.json();
      // // console.log('response of friends', data);
      // // console.log("setFriends",data.users);
      // intial_friends = [...data.users];
      // // console.log("Friends :->",intial_friends)
      // setFriends([...intial_friends]);
    };

    getData();
    // getFriends();

    
  }, [addingUser]);

  useEffect(() => {
    const getPayments = async () => {
      const test_url = `/api/groups/getPayments/${params.groupId}`;
      const res = await fetch(test_url);
      console.log(test_url);
      const resData = await res.json();
      console.log('Yo', resData.payments);
      setAllPayments(resData.payments);
      setFetchedPayments(true);
    };
    // getData();
    getPayments();
  }, [params.groupId]);

  // console.log('param : ', params);

  const addUserToSql = async (addedUser: any) => {
    if (addedUser.length === 0) {
      return;
    }
    setAddingUser(true);
    // console.log('added req :', addedUser);
    const response = await fetch('/api/groups/addUserToGroup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        emails: addedUser.map((user: any) => user.email),
        groupId: params.groupId
      })
    });
    const resData = await response.json();
    // console.log(resData);
    if (response.ok) {
      setFirstAdd(1);
      setAddingUser(false);
    } else {
      setFirstAdd(-1);
      setAddingUser(false);
    }
  };

  const addCommentHandler = (addedUser: any) => {
    // event.preventDefault();
    addUserToSql(addedUser);
    // console.log('add user array ', addedUser);
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
          disabled={fetchingUsers}
        >
          Add User
        </Button>
        <Button
          icon={EyeIcon}
          size="xl"
          onClick={handleOpen2}
          style={{ marginTop: '1.5rem', marginLeft: '1rem' }}
          color="emerald"
          disabled={fetchingUsers}
        >
          See All User
        </Button>
        {addingUser && (
          <>
            <Box
              sx={{
                display: 'flex',
                marginTop: '15px',
                marginBottom: '15px',
                justifyContent: 'center'
              }}
            >
              <CircularProgress />
            </Box>
            <Text className="mt-2 text-center " color="blue">
              {' '}
              Adding Users
            </Text>
          </>
        )}
        {!addingUser && firstAdd === -1 && (
          <Text className="mt-2 text-center " color="red">
            {' '}
            Error Adding Users
          </Text>
        )}
        {!addingUser && firstAdd === 1 && (
          <Text className="mt-2 text-center " color="emerald">
            {' '}
            <Icon size="xs" color="emerald" icon={CheckIcon} />
            Added Users
          </Text>
        )}
        <Chart data={userData} />
        <Chart data={groupData} />
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
            {/* <form> */}
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="text-center"
            >
              SELECT User's to ADD
            </Typography>
            <Adduser userData={allUser} addCommentHandler={addCommentHandler} />
            <Flex justifyContent="center">
              {/* <Button
                  size="xl"
                  onClick={addCommentHandler}
                  style={{ marginTop: '1.5rem' }}
                  color="emerald"
                >
                  Add
                </Button> */}
            </Flex>
            {/* </form> */}
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
                {friends.map((user: any, i: any) => (
                  <ListItem key={i + 1} className="block">
                    <div className="flex flex-col items-center justify-center">
                      <div>
                        <Flex>
                          <Text color="stone">{user.name}</Text>
                        </Flex>
                      </div>
                      <div>
                        <Text color="gray">{user.email}</Text>
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
