'use client';
interface paymentData {
  amount: string;
  createdAt: string;
  email: string;
  name: string;
  owned: number;
  paymentId: number;
  title: string;
  totalAmount: string;
  type: string;
}
interface paymentData1 {
  amount: number;
  createdAt: string;
  email: string;
  name: string;
  owned: number;
  paymentId: number;
  title: string;
  totalAmount: string;
  type: string;
}

interface Props {
  paymentData: paymentData[];
  userName: string;
  userMail: string;
}

interface combinedData {
  [key: string]: paymentData1;
}

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TablePagination,
  NoSsr
} from '@mui/material';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { Text, Title } from '@tremor/react';
import { Margin } from '@mui/icons-material';
// import { useSession } from "next-auth/react"

export default function TransTable({ paymentData, userName, userMail }: Props) {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    // Initialize state only on the client- side
    setPage(0);
    setRowsPerPage(5);
  }, []);

  const theme = useTheme();

  const combinedData: combinedData = {};
  // //console.log('users', paymentData);
  if (paymentData === undefined) {
    return <></>;
  }
  //console.log("payment data",paymentData)
  paymentData.forEach((item: any) => {
    const key: string = `${item.paymentId}`;
    if (!combinedData[key]) {
      let userAmount = 0;
      let one_payment = false;
      paymentData.forEach((data: any) => {
        if (
          data.owned === 1 &&
          data.paymentId === item.paymentId &&
          data.email === userMail
        ) {
          // //console.log(data.paymentId,item.paymentId , data.email,userMail)
          one_payment = true;
          userAmount = userAmount + parseFloat(data.amount);
          // //console.log(item.amount)
        } else if (
          data.owned === 0 &&
          data.paymentId === item.paymentId &&
          data.email === userMail
        ) {
          // //console.log(data)
          one_payment = true;
          userAmount = userAmount - parseFloat(data.amount);
          // //console.log(item.amount)
        }
      });
      if (one_payment) {
        combinedData[key] = { ...item };
        combinedData[key].amount = userAmount;
        if (userAmount > 0) {
          combinedData[key].owned = 1;
        } else {
          combinedData[key].owned = 0;
        }
      } else {
        combinedData[key] = { ...item };
        combinedData[key].amount = userAmount;
        combinedData[key].owned = -1;
      }
    }
  });

  const finalData: paymentData1[] = Object.values(combinedData);
  //console.log("Combined Daga",combinedData)
  finalData.sort((a, b) => {
    const k: any = new Date(b.createdAt);
    const z: any = new Date(a.createdAt);
    return k - z;
  });
  //console.log("Final data",finalData)
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const { data: session } = useSession()
  const handleClick = async (event: any) => {
    //console.log(event.currentTarget.getAttribute('data-id'));
    const id = event.currentTarget.getAttribute('data-id');
    router.push(window.location.href.split('?')[0] + '/' + id);
  };

  const start = page * rowsPerPage;
  const end = start + rowsPerPage;
  const currentPayment = finalData.slice(start, end);

  return (
    <NoSsr>
      <TableContainer>
        <Table>
          <TableBody>
            {currentPayment.map((payment: any, index) => (
              <TableRow key={payment.paymentId}>
                <Card
                  data-id={`${payment.paymentId}`}
                  onClick={handleClick}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    cursor: 'pointer',
                    background:
                      'linear-gradient(135deg, #fbfbfc 0%,#f6f7f9 100%)',
                    margin: '5px',
                    border: '0px',
                    borderRadius: '15px',
                    boxShadow: 'none'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      backgroundColor: 'whitesmoke',
                      flex: '0 1 180px'
                    }}
                  >
                    <CardContent
                      sx={{ flex: '0 1 auto' }}
                      className="text-center"
                    >
                      {/* <Typography variant="h6">Category</Typography> */}
                      <Title>Category</Title>
                      <Text
                        // variant="subtitle1"
                        color="gray"
                        // className="text-center"
                      >
                        {payment.type}
                      </Text>
                    </CardContent>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      flex: '0 1 auto'
                    }}
                  >
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        className="text-center ml-6"
                      >
                        <Text>
                          {
                            new Date(payment.createdAt)
                              .toLocaleString()
                              .split(',')[0]
                          }
                        </Text>
                      </Typography>
                    </CardContent>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'start',
                      flex: '3 0 auto'
                    }}
                  >
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Text
                        style={{ whiteSpace: 'initial', textAlign: 'center' }}
                      >
                        {payment.title.slice(0, 15)}
                      </Text>
                      {payment.title.length > 15 && (
                        <Text
                          style={{ whiteSpace: 'initial', textAlign: 'center' }}
                        >
                          {payment.title.slice(15)}
                        </Text>
                      )}
                    </CardContent>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      backgroundColor: `${
                        payment.owned >= 0
                          ? payment.owned > 0
                            ? 'rgba(132, 204, 22, 0.3)'
                            : 'rgba(244, 63, 94, 0.3)'
                          : 'rgba(0, 0, 0, 0.5)'
                      }`,
                      flex: '0 1 180px',
                      Margin: '0px'
                    }}
                  >
                    <CardContent
                      sx={{ flex: '1 0 auto' }}
                      className="text-center ml-6 mr-6"
                    >
                      <Text>You Owe</Text>
                      {/* <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        className="text-center"
                      > */}
                      {/* {payment.amount} (INR) */}
                      {payment.owned > 0 && (
                        <Title color="emerald">{payment.amount} INR</Title>
                      )}
                      {payment.owned === 0 && (
                        <Title color="red">{-1 * payment.amount} INR</Title>
                      )}
                      {payment.owned < 0 && (
                        <Title color="gray">{payment.amount} INR</Title>
                      )}
                      {/* </Typography> */}
                      {/* <Text color></Text> */}
                    </CardContent>
                  </Box>
                </Card>
              </TableRow>
            ))}
          </TableBody>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            count={finalData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Table>
      </TableContainer>
    </NoSsr>
  );
}
