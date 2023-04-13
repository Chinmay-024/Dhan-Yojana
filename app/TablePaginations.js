import { TablePagination, TableRow, TableCell } from '@mui/material';

export default function CustomTablePagination(props) {
  const {
    count,
    rowsPerPage,
    page,
    onChangePage,
    onChangeRowsPerPage,
    rowsPerPageOptions
  } = props;

  const handleChangePage = (event, newPage) => {
    onChangePage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    onChangeRowsPerPage(+event.target.value);
  };

  return (
    <TableRow>
      <TableCell colSpan={1000}>
        <TablePagination
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
        />
      </TableCell>
    </TableRow>
  );
}
