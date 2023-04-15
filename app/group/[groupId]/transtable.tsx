'use client';
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Props {
  users: User[];
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


export default function TransTable({ users }: Props) {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    // Initialize state only on the client- side
    setPage(0);
    setRowsPerPage(5);
  }, []);

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
  const handleClick = async (event : any) => {
    // console.log(session)
    // const session = await getServerSession();
    // console.log(session?.user)
    console.log(event.currentTarget.getAttribute('data-id'));
    const id = event.currentTarget.getAttribute('data-id');
    // const href = `/newexpensegroup?${new URLSearchParams(query).toString()}`;
    router.push(window.location.href+'/'+id);
    // Redirect to new page with query parameters
    // window.location.href = href;
  };

  const start = page * rowsPerPage;
  const end = start + rowsPerPage;
  const currentUsers = users.slice(start, end);

  const theme = useTheme();

  return (
    <NoSsr>
    <TableContainer>
      <Table>
        <TableBody>
          {currentUsers.map((user,index) => (
            <TableRow key={user.id} >
              {/* <TableCell>{user.name}</TableCell> */}
              {/* <TableCell>{user.email}</TableCell> */}
              {/* <MediaControlCard/> */}

              <Card
                data-id={`${index}`}
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
                  <CardContent sx={{ flex: '1 0 auto' }} >
                    <Typography variant="h6">
                      Category
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                   
                      className="text-center"
                    >
                      Food
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
                  <CardContent sx={{ flex: '1 0 auto' }} >
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                
                      className="text-center"
                    >
                      27-01-2023
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
                    <Typography variant="h6">
                      {user.name}
                    </Typography>
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
                    <Typography variant="h6">
                      You Owe
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      className="text-center"
                    >
                      234 (INR)
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </TableRow>
          ))}
        </TableBody>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          count={users.length}
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


