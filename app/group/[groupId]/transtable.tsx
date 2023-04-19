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

interface Props {
  paymentData: paymentData[];
}

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
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
// import { useSession } from "next-auth/react"

export default function TransTable({ paymentData }: Props) {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    // Initialize state only on the client- side
    setPage(0);
    setRowsPerPage(5);
  }, []);

  const theme = useTheme();

  const combinedData: any = {};

  if (paymentData === undefined) {
    return <></>;
  }
  paymentData.forEach((item: any) => {
    const key = `${item.email}_${item.paymentId}`;
    if (!combinedData[key]) {
      combinedData[key] = { ...item };
    } else {
      if (item.owned === 1) {
        combinedData[key].amount = (
          parseFloat(combinedData[key].amount) + parseFloat(item.amount)
        ).toFixed(2);
      } else if (item.owned === 0) {
        combinedData[key].amount = (
          parseFloat(combinedData[key].amount) - parseFloat(item.amount)
        ).toFixed(2);
      }
    }
  });

  const finalData = Object.values(combinedData);

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
    // console.log(session)
    // const session = await getServerSession();
    // console.log(session?.user)
    console.log(event.currentTarget.getAttribute('data-id'));
    const id = event.currentTarget.getAttribute('data-id');
    // const href = `/newexpensegroup?${new URLSearchParams(query).toString()}`;
    router.push(window.location.href + '/' + id);
    // Redirect to new page with query parameters
    // window.location.href = href;
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
                {/* <TableCell>{user.name}</TableCell> */}
                {/* <TableCell>{user.email}</TableCell> */}
                {/* <MediaControlCard/> */}

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
                      flex: '1 0 auto'
                    }}
                  >
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography variant="h6">Category</Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        className="text-center"
                      >
                        {payment.type}
                      </Typography>
                    </CardContent>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      flex: '1 0 auto'
                    }}
                  >
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        className="text-center"
                      >
                        {
                          new Date(payment.updatedAt)
                            .toLocaleString()
                            .split(',')[0]
                        }
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
                      <Typography variant="h6">{payment.title}</Typography>
                    </CardContent>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      backgroundColor: 'lightgreen',
                      flex: '1 0 auto'
                    }}
                  >
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography variant="h6">You Owe</Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        className="text-center"
                      >
                        {payment.amount} (INR)
                      </Typography>
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
