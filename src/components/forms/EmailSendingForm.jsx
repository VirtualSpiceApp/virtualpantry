import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { host } from '../../host';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  button: {
    height: 50
  }
}));

export default function EmailSendingForm() {
  const classes = useStyles();
  const [email, setEmail] = useState(null);

  function handleChange(event) {
      if(event.target.value == ""){
          setEmail(null);
      }else{
        setEmail(event.target.value);
      }
  }

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
    }

    function sendEmailAddressToServer(){
        fetch(`${host}/email`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
            }),
          }).then((response) => {
            if(response.status === 201){
              console.log("email sent");
            }
          });
    }
    

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="outlined-basic"
        label="Your email address"
        variant="outlined"
        type="email" 
        required
        onChange={handleChange}
        />
      <Button
        className={classes.button}
        variant="contained"
        color="secondary"
        disabled={(email != null) && (validateEmail(email)) ? false : true}
        onClick={sendEmailAddressToServer}
        >
        Send
      </Button>
    </form>
  );
}