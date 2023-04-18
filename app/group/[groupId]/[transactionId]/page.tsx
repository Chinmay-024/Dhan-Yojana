'use client';
import {
  Card,
  Metric,
  Text,
  Flex,
  Grid,
  Col,
  List,
  ListItem,
  Title,
  Subtitle,
  Icon
} from '@tremor/react';
import { useRouter } from 'next/navigation';
import Chart from './chart';
import styles from './page.module.css';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Button } from '@tremor/react';
import TextField from '@mui/material/TextField';
import pic from './food.jpg';
import Image from 'next/image';
import { PlusIcon } from '@heroicons/react/24/outline';
import { MinusIcon } from '@heroicons/react/24/outline';
import { CircularProgress } from '@mui/material';

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

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

const messages = [
  { username: 'Alice', message: 'Hey, how are you?' },
  {
    username: 'Bob',
    message: "I'm doing well, thanks for asking. How about you?"
  },
  { username: 'Alice', message: "I'm good too, thanks!" },
  { username: 'Bob', message: 'Glad to hear it.' },
  { username: 'Charlie', message: "Hey guys, what's up?" },
  { username: 'Alice', message: 'Not much, just chatting with Bob.' },
  { username: 'Bob', message: "Yeah, we're just catching up." },
  { username: 'Charlie', message: 'Cool, mind if I join i n?' },
  { username: 'Alice', message: 'Of course not, the more the merrier!' },
  { username: 'Bob', message: 'Yeah, come on in.' },
  { username: 'Charlie', message: 'Thanks!' }
];

const myLoader = () => {
  return `./food.jpg`;
};

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
  },
  {
    title: 'Customers',
    metric: '1,072',
    metricPrev: '856'
  }
];

// paymentDetails
// :
// createdAt
// :
// "2023-04-17T19:11:12.000Z"
// currency
// :
// "US dollar (USD)"
// groupId
// :
// 1
// paymentId
// :
// 2
// title
// :
// "hi"
// totalAmount
// :
// "100.00"
// type
// :
// "Food"
// updatedAt
// :
// "2023-04-18T16:56:59.000Z"
export default function TransactionId({
  params
}: {
  params: { groupId: string; transactionId: string };
}) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [expanded, setExpanded] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const [fetchingComm, setFetchingComm] = React.useState(true);
  const [submittingComm, setsubmittingComm] = React.useState(false);
  const [anyCommup, setanyCommup] = React.useState(false);
  const [success, setSucess] = React.useState(false);
  const [commentsArray, setCommentsArray] = React.useState<any>([]);
  const [paymentDetails, setPaymentDetails] = React.useState<any>({});
  const [paymentList, setPaymentList] = React.useState<any>([]);
  const [fetchingList, setfetchingList] = React.useState<any>(false);

  React.useEffect(() => {
    const getData = async () => {
      const resData = await fetch('/api/comments/' + params.transactionId);
      const data: any = await resData.json();
      console.log('comments', data.comments);
      setCommentsArray(data.comments);
      setFetchingComm(false);
      // setAllUser([...data.users]);
    };
    const getpaymentslist = async () => {
      setfetchingList(true);
      const resData = await fetch('/api/payments/' + params.transactionId);
      const data: any = await resData.json();
      console.log('payments involment', data);
      setfetchingList(false);
      setPaymentDetails(data.paymentDetails);
      setPaymentList(data.users);
    };

    getData();
    getpaymentslist();
  }, [params.transactionId]);

  const addtolist = (description: any) => {
    setCommentsArray((prevState: any) => [
      {
        //TODO: change this to user email
        email: '20cs01009@iitbbs.ac.in',
        image:
          'https://lh3.googleusercontent.com/a/AGNmyxZ3wGdjsI-9N8G4fFZzTApyood-npkmt6W5KVxU=s96-c',
        name: 'ANKIT JAGDISHBHAI PATEL',
        description: description
      },
      ...prevState
    ]);
  };

  const uploadComment = async (description: any) => {
    setsubmittingComm(true);
    setanyCommup(true);
    const response = await fetch('/api/comments/addComment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description: description,
        paymentId: params.transactionId,
        //TODO: change this to user email
        email: '20cs01009@iitbbs.ac.in'
      })
    });
    const resData = await response.json();
    console.log('added ', resData);
    setsubmittingComm(false);
    if (response.ok) {
      setSucess(true);
      addtolist(description);
    }
  };

  console.log('param : ', params);

  const valueFormatter = (number: number) =>
    `$ ${Intl.NumberFormat('us').format(number).toString()}`;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onChangeHandler = (event: any) => {
    setComment(event.target.value);
  };

  const addCommentHandler = (event: any) => {
    event.preventDefault();
    console.log(comment);
    uploadComment(comment);
    setOpen(false);
  };
  // https://www.gstatic.com/webp/gallery/4.sm.jpg
  return (
    <>
      <main className="p-4 md:p-10 mx-auto max-w-5xl ">
        <Grid numCols={2} className="gap-2">
          <Col numColSpan={1}>
            <Card
              style={{
                height: '500px',
                overflowX: 'hidden',
                overflowY: 'hidden',
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
              }}
              className="bg-no-repeat bg-center bg-cover bg-blend-mulitply"
            >
              {Object.keys(paymentDetails).length === 0 && (
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      marginTop: '15px',
                      marginBottom: '15px'
                    }}
                  >
                    <CircularProgress />
                  </Box>
                  <Text className="mt-2" color="blue">
                    {' '}
                    Loading Payment Details
                  </Text>
                </>
              )}

              {Object.keys(paymentDetails).length != 0 && (
                <>
                  <Metric className="text-5xl	text-white	">
                    {paymentDetails.title}
                  </Metric>
                  <Text
                    className="mt-3 text-1xl text-slate-100	"
                    style={{ marginLeft: '7px' }}
                  >
                    Created At:{' '}
                    {
                      new Date(paymentDetails.createdAt)
                        .toLocaleString()
                        .split(',')[0]
                    }
                  </Text>
                  <Image
                    // src={pic}
                    src={
                      ' https://source.unsplash.com/600x600/?' +
                      paymentDetails.type
                    }
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      zIndex: '-1  ',
                      opacity: '1',
                      height: '100%'
                    }}
                    width={500}
                    height={500}
                    alt="Food pic"
                  />
                  <Text
                    className="text-1xl text-slate-100"
                    style={{ marginLeft: '7px' }}
                  >
                    Updated At:{' '}
                    {
                      new Date(paymentDetails.updatedAt)
                        .toLocaleString()
                        .split(',')[0]
                    }
                  </Text>
                  <Flex justifyContent="start">
                    {/* <Title className="text-1xl text-white	">Type </Title> */}
                    <Subtitle className="text-2xl text-slate-200	">
                      {paymentDetails.type}
                    </Subtitle>
                  </Flex>
                  <Flex justifyContent="start">
                    {/* <Title className="text-1xl text-white	">Type </Title> */}
                    <Subtitle className="text-2xl text-slate-200	">
                      {paymentDetails.totalAmount}
                    </Subtitle>
                  </Flex>
                </>
              )}
            </Card>
            <Card
              style={{
                height: '500px',
                overflowX: 'auto',
                overflowY: 'auto'
              }}
            >
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                className="text-center"
              >
                PAYMENT DETAILS
              </Typography>
              {fetchingList && (
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
                    Fetching payment Details
                  </Text>
                </>
              )}
              {!fetchingList && (
                <List>
                  {paymentList.map((user: any, i: any) => (
                    <ListItem key={i + 1} className="block">
                      <Flex>
                        <Text color="stone">{user.name}</Text>
                        {user.owned === 1 && (
                          <div
                            className="pl-2 pr-2 pt-1 pb-1"
                            style={{
                              backgroundColor: 'rgba(132, 204, 22, 0.3)',
                              borderRadius: '10px',
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <Icon size="xs" color="emerald" icon={PlusIcon} />
                            <Text color="emerald">{user.amount}</Text>
                          </div>
                        )}
                        {user.owned === 0 && (
                          <div
                            className="pl-2 pr-2 pt-1 pb-1"
                            style={{
                              backgroundColor: 'rgba(244, 63, 94, 0.3)',
                              borderRadius: '10px',
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <Icon size="xs" color="red" icon={MinusIcon} />
                            <Text color="red">{user.amount}</Text>
                          </div>
                        )}
                      </Flex>
                    </ListItem>
                  ))}
                </List>
              )}
            </Card>
          </Col>

          <Col numColSpan={1}>
            <Card
              style={{ height: '100%', maxHeight: '1000px', overflowY: 'auto' }}
            >
              <Flex>
                <Metric>Comments</Metric>
                <div>
                  <Button
                    onClick={handleOpen}
                    size="xs"
                    variant="primary"
                    color="emerald"
                  >
                    Add Comment
                  </Button>
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
                            Enter Comment
                          </Typography>
                          <TextField
                            value={comment}
                            onChange={onChangeHandler}
                            className="mt-2 mb-3"
                            fullWidth
                            label="fullWidth"
                            id="fullWidth"
                          />
                          <Button onClick={addCommentHandler}>Add</Button>
                        </form>
                      </Box>
                    </Fade>
                  </Modal>
                </div>
              </Flex>
              {/* <Card
                style={{ height:"100%",maxHeight:"100%", marginTop: '15px' ,overflowY:'scroll' }}
                // className="overflow-y-auto"
              > */}
              {submittingComm && (
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      marginTop: '15px',
                      marginBottom: '15px'
                    }}
                  >
                    <CircularProgress />
                  </Box>
                  <Text className="mt-2" color="blue">
                    {' '}
                    Uploading comments
                  </Text>
                </>
              )}
              {!submittingComm && anyCommup && success && (
                <Text className="mt-2" color="green">
                  {' '}
                  Successfully Created Comments
                </Text>
              )}
              {!submittingComm && anyCommup && !success && (
                <Text className="mt-2" color="green">
                  {' '}
                  Failed to Create Comments
                </Text>
              )}
              <List>
                {!fetchingComm &&
                  commentsArray.length > 0 &&
                  commentsArray.map((item: any, i: any) => (
                    <Card key={i} className="p-0 m-3" style={{ width: '97%' }}>
                      <CardHeader
                        avatar={
                          // <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                          //   R
                          // </Avatar>

                          <Avatar alt="username" src={item.image} />
                        }
                        title={item.name}
                        subheader={item.email}
                      />

                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          {item.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                {!fetchingComm && commentsArray.length === 0 && (
                  <>
                    <Text className="mt-2"> No Comments Yet!!!</Text>
                  </>
                )}
                {fetchingComm && (
                  <>
                    <Box sx={{ display: 'flex' }}>
                      <CircularProgress />
                    </Box>
                    <Text className="mt-2" color="blue">
                      {' '}
                      Fetching Comments
                    </Text>
                  </>
                )}
              </List>
              {/* </Card> */}
            </Card>
          </Col>
          {/* <Col numColSpan={1}>
            
          </Col> */}
        </Grid>
      </main>
    </>
  );
}
