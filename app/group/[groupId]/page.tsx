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
  Icon,
  Subtitle,
  Tab,
  TabList
} from '@tremor/react';
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
import { getServerSession } from 'next-auth/next';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { CircularProgress } from '@mui/material';
import Adduser from './formModal';
import { List, ListItem } from '@tremor/react';
import { useEffect } from 'react';
import { Session } from '@next-auth/sequelize-adapter/dist/models';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import UserChart from './userChart';
import Image from 'next/image';
import { groupDataSliceActions } from '../../store';
interface Transaction {
  owned: boolean;
  amount: number;
  email: string;
  name: string;
}

interface UserD {
  email: string;
  name: string;
  amount: number;
  owned: boolean;
}
interface NetAmounts {
  [email: string]: { amount: number; name: string };
}

interface Result {
  [email: string]: {
    payer: string;
    receiver: string;
    amount: number;
    name: string;
  };
}

const dataFormatter = (number: number) =>
  Intl.NumberFormat('us').format(number).toString();

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
  const [user, setUser] = React.useState<any>(null);
  // const dispatch = useDispatch();
  // const groupData = useSelector((state :any)=> state.groupData.group);
  // console.log("Group Data",groupData)
  const searchParams = useSearchParams();
  const router = useRouter();
  const [allUser, setAllUser] = React.useState<any>([]);
  const [friends, setFriends] = React.useState<any>([]);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [fetchedPayments, setFetchedPayments] = React.useState(false);
  const [allPayments, setAllPayments] = React.useState<any>([]);
  const [addingUser, setAddingUser] = React.useState(false);
  const [firstAdd, setFirstAdd] = React.useState(0);
  const [fetchingUsers, setFetchingUsers] = React.useState(true);
  const [finalAmount, setfinalAmount] = React.useState(0);
  const [owe, setOwe] = React.useState(false);
  const [settleFlag, setSettleFlag] = React.useState(false);
  const [submitLoader, setSubmitLoader] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleOpen2 = () => setOpen2(true);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);

  const [userPayments, setUserPayments] = React.useState<any>([]);
  const [groupPayments, setGroupPayments] = React.useState<any>([]);
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [result, setResult] = React.useState<Result>({});
  const [userMail, setUserMail] = React.useState<string>('');
  const [userName, setUserName] = React.useState<string>('');
  const [fetchGraph, setFetchGraph] = React.useState(true);
  const [showCard, setShowCard] = React.useState(true);

  

  // let k = groupData.findIndex((item:any)=>{
  //   return item.groupId==params.groupId
  // });
  // useEffect(()=>{
  //   if(k==-1){
  //     console.log("sent the request")
  //     const getGroupdata = async() => {
  //       const res = await fetch('/api/user/getAllGroupDetails');
  //       const resData = await res.json();
  //       //  dispatch(groupDataSliceActions.updateGroups(resData))

  //     }
  //     getGroupdata();
  //   }
  // },[k])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let user2 = localStorage.getItem('user') || '{}';
      setUser(JSON.parse(user2));
      setUserMail(JSON.parse(user2).email);
      setUserName(JSON.parse(user2).name);
    }
    let intial_user: any = [];
    let intial_friends: any = [];


    const userANDexpenseGroupData = async () => {
      const resData1 = await fetch('/api/user/getAllUser');
      const data: any = await resData1.json();
      // console.log('all users', data.users);
      intial_user = [...data.users];
      const resData2 = await fetch(`/api/groups/findFriends/${params.groupId}`);
      const data2: any = await resData2.json();
      intial_friends = [...data2.users];
      setFriends([...intial_friends]);
      // console.log('unfiltered', intial_user);
      intial_user = intial_user.filter(
        (itema: any) =>
          !intial_friends.some((itemb: any) => itemb.email === itema.email)
      );
      // console.log('filtered', intial_user);
      setAllUser([...intial_user]);
      setFetchingUsers(false);

      const res = await fetch(`/api/groups/getPayments/${params.groupId}`);
      const resData = await res.json();
      setAllPayments(resData.payments);
      console.log('boi', resData.payments);
      setFetchedPayments(true);
      const filteredArray = resData.payments.filter(
        (obj: {
          name: string;
          email: string;
          amount: number;
          owned: boolean;
          paymentId: number;
          totalAmount: number;
          type: string;
          title: string;
          createdAt: string;
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
          createdAt: string;
        }) => obj.email == userMail
      );
      const uniqueArray = Array.from(
        new Set(resData.payments.map((obj: any) => obj.paymentId))
      ).map((paymentId) => {
        return resData.payments.find((obj: any) => obj.paymentId === paymentId);
      });

      const selectedColumnsArray = uniqueArray.map(
        (obj: { createdAt: any; totalAmount: any }) => {
          return {
            Date: obj.createdAt,
            Expense: obj.totalAmount
          };
        }
      );
      const selectedColumnsArrayForTransaction = resData.payments.map(
        (obj: { email: any; amount: any; owned: any; name: any }) => {
          return {
            email: obj.email,
            amount: obj.amount,
            owned: obj.owned,
            name: obj.name
          };
        }
      );
      const selectedColumnsArrayonUser = filteredArrayForUser.map(
        (obj: { createdAt: any; owned: any; amount: any }) => {
          return {
            Date: obj.createdAt,
            Paid: !obj.owned ? 0 : obj.amount,
            Owed: !obj.owned ? obj.amount : 0
          };
        }
      );
      setGroupPayments(selectedColumnsArray);
      setUserPayments(selectedColumnsArrayonUser);

      const netAmounts: NetAmounts = {};
      const positiveNetAmounts: NetAmounts = {};
      const negativeNetAmounts: NetAmounts = {};

      // Calculate net amounts for each user
      for (const transaction of selectedColumnsArrayForTransaction) {
        if (!(transaction.email in netAmounts)) {
          netAmounts[transaction.email] = { amount: 0, name: transaction.name };
        }
        netAmounts[transaction.email].amount +=
          transaction.amount * (transaction.owned ? 1 : -1);
      }

      // Group users into positive and negative net amounts
      for (const email in netAmounts) {
        const netAmount = netAmounts[email].amount;
        if (netAmount > 0) {
          positiveNetAmounts[email] = {
            amount: netAmount,
            name: netAmounts[email].name
          };
        } else if (netAmount < 0) {
          negativeNetAmounts[email] = {
            amount: netAmount * -1,
            name: netAmounts[email].name
          };
        }
      }
      var sumPositive = 0;
      for (const posEmail in positiveNetAmounts)
        sumPositive += positiveNetAmounts[posEmail].amount;

      var sumNegative = 0;
      for (const negEmail in negativeNetAmounts)
        sumNegative += negativeNetAmounts[negEmail].amount;

      let result2: Result = {};

      if (userMail in negativeNetAmounts) {
        setOwe(false);
        const netAmountToPay = negativeNetAmounts[userMail]?.amount;
        setfinalAmount(netAmountToPay ? netAmountToPay : 0);
        for (const posEmail in positiveNetAmounts) {
          const posAmount = positiveNetAmounts[posEmail].amount;
          const amountToGive =
            ((netAmountToPay * posAmount) / sumPositive) * 1.0;
          if (!(posEmail in result2)) {
            result2[posEmail] = {
              payer: userMail,
              receiver: posEmail,
              amount: 0,
              name: positiveNetAmounts[posEmail].name
            };
          }
          result2[posEmail].amount += amountToGive;
          // setResult(result2);
        }
      } else if (userMail in positiveNetAmounts) {
        setOwe(true);
        const netAmountToTake = positiveNetAmounts[userMail]?.amount;
        setfinalAmount(netAmountToTake ? netAmountToTake : 0);
        for (const negEmail in negativeNetAmounts) {
          const negAmount = negativeNetAmounts[negEmail].amount;
          const amountToGive =
            ((netAmountToTake * negAmount) / sumNegative) * 1.0;
          if (!(negEmail in result2)) {
            result2[negEmail] = {
              payer: negEmail,
              receiver: userMail,
              amount: 0,
              name: negativeNetAmounts[negEmail].name
            };
          }
          result2[negEmail].amount += amountToGive;
          // setResult(result2);
        }
      }
      console.log(result2);
      setResult(result2);
      setFetchGraph(false);
    };
    userANDexpenseGroupData();

    // console.log(result);
  }, [params.groupId, addingUser, userMail, settleFlag]);

  console.log('param : ', transactions);

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

  const handleSubmit = async (event: any) => {
    setSubmitLoader(true);
    event.preventDefault();
    const users: {
      [key: string]: {
        email: string;
        name: string;
        amount: number;
        owned: boolean;
      };
    } = {};
    const usersData: UserD[] = [];
    // console.log(result);
    let user;
    for (const usermail in result) {
      user = {
        email: usermail,
        name: result[usermail].name,
        amount: result[usermail].amount,
        owned: owe
      };
      usersData.push(user);
    }
    user = {
      email: userMail,
      name: userName,
      amount: finalAmount,
      owned: !owe
    };
    usersData.push(user);
    // console.log(usersData);
    var submitdata = {
      title: `Settle Up of ${userMail.split('@')[0]}`,
      type: 'Settle',
      totalAmount: finalAmount,
      currency: 'INR',
      groupId: parseInt(params.groupId),
      users: usersData
    };
    console.log(submitdata);

    const JSONdata = JSON.stringify(submitdata);
    const endpoint = '/api/payments/addPayment';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSONdata
    };

    const response = await fetch(endpoint, options);
    await response.json();

    setSubmitLoader(false);
    setSettleFlag((prev) => !prev);
    setOpen2(false);
  };

  return (
    <>
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <Card
          style={{
            overflowX: 'hidden',
            overflowY: 'hidden',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}
          className="bg-no-repeat bg-center bg-cover bg-blend-mulitply"
        >
          {/* <Metric className="text-white	">{k!=-1 && groupData[k].title} {k==-1 && <>Loading....</>}</Metric> */}
          {/* <Subtitle className="text-white	mt-5 ml-2">{k!=-1 && groupData[k].description}</Subtitle> */}
          {/* {user && <Metric>{user.name}</Metric>} */}
          <Image
            // src={pic}
            src={' https://source.unsplash.com/1200x1200/?group'}
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              zIndex: '-1  ',
              opacity: '1',
              width: '1200px'
            }}
            width={500}
            height={500}
            alt="Food pic"
          />
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
        </Card>
        <Card className="mt-2">
          <>
            <TabList
              defaultValue="1"
              onValueChange={(value) => setShowCard(value === '1')}
              className="mt-1"
            >
              <Tab value="1" text="Group Analysis" />
              <Tab value="2" text="Individual Analysis" />
            </TabList>
          </>

          {showCard === true ? (
            <div className="mt-6">
              {!fetchGraph && <Chart expenseData={groupPayments} />}
            </div>
          ) : (
            <div className="mt-6">
              {!fetchGraph && (
                <>
                  <UserChart expenseData={userPayments} />{' '}
                </>
              )}
            </div>
          )}
        </Card>
        <Flex justifyContent="center" alignItems="baseline">
          <Card className="mt-6 overflow-y-auto h-100 ">
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
              <TransTable
                paymentData={allPayments}
                userName={userName}
                userMail={userMail}
              />
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
              SELECT User&apos;s to ADD
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
                  <div
                    key={i + 1}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <ListItem className="block">
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
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      ></div>
                    </ListItem>

                    <Title
                      className="mt-4"
                      style={{ color: owe == true ? 'green' : 'red' }}
                    >
                      {result[user.email] ? result[user.email].amount : 0}
                    </Title>
                  </div>
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
                <Box sx={{ m: 1, position: 'relative' }}>
                  <Button
                    icon={BanknotesIcon}
                    size="xl"
                    onClick={handleSubmit}
                    style={{ marginTop: '1.5rem', marginLeft: '1rem' }}
                    color="emerald"
                    disabled={!finalAmount || submitLoader}
                  >
                    Settle Group
                  </Button>
                  {submitLoader && (
                    <CircularProgress
                      size={24}
                      sx={{
                        color: 'emerald',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-4px',
                        marginLeft: '-4px'
                      }}
                    />
                  )}
                </Box>
              </Flex>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
