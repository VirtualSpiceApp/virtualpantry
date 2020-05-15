import React, {useState, useEffect} from 'react';
import RecepieCard from '../components/cards/RecepieCard';
import { host } from '../host';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 50,
  }
}));

function Recepie() {

  const [recepie, setRecepie] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetchRecepiesFromAPI()
  }, null)

  function fetchRecepiesFromAPI(){
    fetch(`${host}/api/recepie`)
    .then(response => response.json())
    .then(data => {
      setRecepie(data);
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {
          recepie.map((key, i) => (
            <Grid item xs={3}>
              <RecepieCard 
                name={key.name}
                img={key.img}
                description={key.description}
                ingredients={key.ingredients} />
                
            </Grid>
          ))
        }
      </Grid>
    </div>
  );
}

export default Recepie;
