import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { host }from '../../host';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 10,
    },
    form: {
        margin: 10
    },
    button: {
        margin: 10
    }
}));

const types = [
    {
      value: 'sustainable food',
      label: 'sustainable food',
    },
    {
      value: 'spices',
      label: 'spices',
    },
    {
      value: 'drinks',
      label: 'drinks',
    },
    {
      value: 'perishable food',
      label: 'perishable food',
    },
  ];

export default function AddNewItemForm() {
  const classes = useStyles();
  
  const [foodTypes, setFoodTypes] = React.useState(types[0].value);
  const [name, setName] = useState(null);
  const [location, setLocation] = useState(null);
  const [date, setDate] = useState(new Date());

  const handleChangeType = (event) => {
    setFoodTypes(event.target.value);
  };

  function checkIfTextFieldFilled(){
    return foodTypes !== null && name !== null && location !== null && date !== null && new Date(date).getTime() >= new Date().getTime();
  }

  function sendFoodToServer(){
    fetch(`${host}/api/addItemToVirtualSpice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          exp_date: JSON.stringify(date),
          type: foodTypes,
          location: location
        }),
      }).then((response) => {
        if(response.status === 201){
          console.log("email sent");
        }
      });
  }

  function handleChange(event) {
    const id = event['target']['id'];
    switch(id){
      case 'name': 
        handleChangeName(event);
        break;
      case 'location':
        handleChangeLocation(event);
        break;
      case 'date':
        handleChangeDate(event);
        break;
    }
  }

  function handleChangeName(event) {
      if(event.target.value == ""){
          setName(null);
      }else{
        setName(event.target.value);
      }
  }

  function handleChangeLocation(event) {
    if(event.target.value == ""){
        setLocation(null);
    }else{
      setLocation(event.target.value);
      }
    }

  function handleChangeDate(event) {
    if(event.target.value == ""){
      setDate(new Date());
    }else{
      setDate(event.target.value);
      }
    }

  return (
    <div className={classes.root}>
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Add new food to pantry
                </Typography>  
                <form className={classes.form} noValidate autoComplete="off">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} >
                            <TextField
                              id="name"
                              fullWidth
                              required
                              label="Name of the item"
                              variant="outlined"
                              onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6} >
                              <TextField
                                id="outlined-select-currency"
                                select
                                label="Select"
                                value={foodTypes}
                                onChange={handleChangeType}
                                helperText="Select the food type"
                                variant="outlined"
                                >
                                {types.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                              id="location" 
                              fullWidth
                              required
                              label="Location"
                              variant="outlined"
                              onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField type="date" 
                                id="date" 
                                fullWidth 
                                required 
                                defaultValue="2017-05-24"
                                helperText="Date of expiration"  
                                variant="outlined"
                                onChange={handleChange}
                                />
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
      <CardActions>
        <Button
          color="primary"
          variant="contained"
          size="small"
          disabled={!checkIfTextFieldFilled()}
          onClick={sendFoodToServer}
          >
            Add new item
          </Button>
      </CardActions>
    </Card>
    </div>
  );
}