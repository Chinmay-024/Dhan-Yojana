'use client';
// import {
//   Table,
//   TableHead,
//   TableRow,
//   TableHeaderCell,
//   TableBody,
//   TableCell,
//   Text
// } from '@tremor/react';
// import { useState, useEffect } from 'react';
// import CustomTablePagination from './TablePaginations';
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

// export default  function UsersTable({ users }: { users: User[] }) {

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const handleChangePage = (newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (newRowsPerPage) => {
//     setRowsPerPage(newRowsPerPage);
//     setPage(0);
//   };

//   useEffect(() => {
//     setPage(0);
//   }, [users]);

//   const startIndex = page * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const slicedData = users.slice(startIndex, endIndex);
//   return (
//     <Table className="mt-6">
//       <TableHead>
//         <TableRow>
//           <TableHeaderCell>Date</TableHeaderCell>
//           <TableHeaderCell>Name</TableHeaderCell>
//           <TableHeaderCell>Amount</TableHeaderCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {slicedData.map((user) => (
//           <TableRow key={user.id}>
//             <TableCell>2nd Apr 2020</TableCell>
//             <TableCell>{user.name}</TableCell>
//             <TableCell>
//                You owe 20
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>

//       <CustomTablePagination
//         count={users.length}
//         rowsPerPageOptions={[5, 10, 25]}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onChangePage={handleChangePage}
//         onChangeRowsPerPage={handleChangeRowsPerPage}
//       />
//     </Table>
//   );
// }
import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';

export default  function UsersTable({ users }: { users: User[] }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const start = page * rowsPerPage;
  const end = start + rowsPerPage;
  const currentUsers = users.slice(start, end);

  return (
    <TableContainer style={{visibility:'overflow'}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Table>
    </TableContainer>
  );
}
