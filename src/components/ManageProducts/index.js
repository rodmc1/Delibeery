import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

import Appbar from '../Appbar';
import Row from './Row';

const createData = (id, name, price, status, history) => {
  return {
    id,
    name,
    price,
    status,
    history
  };
};

const ManageProducts = ({ orderData, menu }) => {
  let rows = [];
  let productHistory = [];
  let productData;
  menu.map((product) => {
    orderData.forEach((item) => {
      productData = item.orderDetails.orders.find((i) => i.id === product.id);
      if (productData) {
        productHistory.push({ productData, orderId: item.id, date: item.date });
      }
    });

    rows.push(
      createData(
        product.id,
        product.name,
        Number(product.price).toFixed(2),
        product.status,
        productHistory
      )
    );
  });

  return (
    <Container align="center">
      <Appbar />
      <Typography variant="h3" color="primary" style={{ marginTop: '7%' }}>
        Manage Products
      </Typography>
      <TableContainer component={Paper} style={{ maxWidth: '80%' }}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Product ID</TableCell>
              <TableCell align="left">Product Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ManageProducts;
