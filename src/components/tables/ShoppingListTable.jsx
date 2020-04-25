import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  table: {
    width: '100%'
  },
  container: {
    margin: 100
  }
});


export default function ShoppingListTable(props) {
  const classes = useStyles();
  const shoppingList = props.shoppingList;

  function addDeleteButton(itemId){
    return ( 
      <Button 
        variant="contained" 
        color="secondary"
        onClick={() => {props.deleteItemWithId(`${itemId}`)}}
        >
        Delete
      </Button>
    )
  }

  return (
      <div className={classes.container}>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell align="center"><strong>Name</strong></TableCell>
                    <TableCell align="center"><strong>Type</strong></TableCell>
                    <TableCell align="center"><strong>Location</strong></TableCell>
                    <TableCell align="center"><strong>Delete</strong></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {shoppingList.map((key,i) => (
                    <TableRow key={i}>
                    <TableCell component="th" scope="row">
                    {key.name}
                    </TableCell>
                    <TableCell align="right">{key.type}</TableCell>
                    <TableCell align="right">{key.location}</TableCell>
                    <TableCell align="right">{addDeleteButton(key._id['$oid'])}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
         </TableContainer>
      </div>
  );
}