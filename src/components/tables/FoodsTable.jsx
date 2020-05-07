import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { host } from '../../host';

const useStyles = makeStyles({
  table: {
    width: '100%'
  },
  snackbar: {
    color: 'green'
  }
});


export default function FoodsTable(props) {
  const classes = useStyles();
  const pantry = props.pantry;
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

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

  function addMoveToShoppingListButton(name, type, location){
    return (
      <Button
      variant="contained"
      color="primary"
      className={classes.button}
      startIcon={<ShoppingCartIcon />}
      onClick={() => addItemToDB(name, type, location)}
    >
      Add
    </Button>
    )
  }

  function addItemToDB(name, type, location){
    console.log(JSON.stringify({
      name: name,
      type: type,
      location: location
    }));
    fetch(`${host}/api/addItemToShoppingList`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        type: type,
        location: location
      }),
    }).then((response) => {
      if(response.status === 201){
        setOpen(true);
      }
    });
  }

  function addSnackBar(){
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          className={classes.snackbar}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Succesfully added to shopping list"
          action={
            <React.Fragment>
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </div>
    );
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center"><strong>Name</strong></TableCell>
              <TableCell align="center"><strong>Type</strong></TableCell>
              <TableCell align="center"><strong>Expiration date</strong></TableCell>
              <TableCell align="center"><strong>Location</strong></TableCell>
              <TableCell align="center"><strong>Date of shopping</strong></TableCell>
              <TableCell align="center"><strong>Shopping list</strong></TableCell>
              <TableCell align="center"><strong>Delete</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pantry.map((key,i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                {key.name}
                </TableCell>
                <TableCell align="right">{key.type}</TableCell>
                <TableCell align="right">{key.exp_date["$date"]}</TableCell>
                <TableCell align="right">{key.location}</TableCell>
                <TableCell align="right">
                  {
                    new Date(key.date_of_shopping["$date"]).toDateString()
                  }
                </TableCell>
                <TableCell align="right">
                  {addMoveToShoppingListButton(key.name, key.type, key.location)}
                </TableCell>
                <TableCell align="right">
                  {addDeleteButton(key._id['$oid'])}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {addSnackBar()}
    </div>

  );
}