import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { makeStyles } from '@material-ui/core/styles';

import { updateProductStatusById } from '../../api/jsonserver';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset'
    }
  }
});

const Row = ({ row }) => {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = useState(row.status);
  const classes = useRowStyles();

  const tableBodyContent = row.history.map((historyRow) => {
    if (historyRow.productData.id == row.id) {
      return (
        <TableRow key={row.id}>
          <TableCell component="th" scope="row">
            {historyRow.date}
          </TableCell>
          <TableCell align="left">{historyRow.orderId}</TableCell>
          <TableCell align="left">{historyRow.productData.quantity}</TableCell>
          <TableCell align="left">
            {Number(historyRow.productData.price).toFixed(2)}
          </TableCell>
        </TableRow>
      );
    }
  });

  const onProductStatusUpdate = (status) => {
    updateProductStatusById(row.id, status).then(() => {
      setStatus(status);
    });
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="left">{row.name}</TableCell>
        <TableCell align="right">{row.price}</TableCell>
        <TableCell align="right">{status}</TableCell>
        <TableCell align="center">
          {status == 'Available' ? (
            <Button
              variant="contained"
              startIcon={<RemoveShoppingCartIcon />}
              onClick={() => onProductStatusUpdate('Out of stock')}>
              Out of stock
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<AddShoppingCartIcon />}
              onClick={() => onProductStatusUpdate('Available')}>
              Available
            </Button>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table
                size="small"
                aria-label="purchases"
                style={{ marginBottom: '10%' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="left">Order ID</TableCell>
                    <TableCell align="left">Quantity</TableCell>
                    <TableCell align="left">Total price (₱)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{tableBodyContent}</TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        price: PropTypes.any,
        id: PropTypes.number,
        date: PropTypes.string
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.any.isRequired
  }).isRequired
};

export default Row;
