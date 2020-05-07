import React, { useState, useEffect } from 'react';
import FoodTypeCard from './FoodTypeCard';
import _ from 'lodash';
import { host } from '../../host';

export default function FoodTypeCardContainer() {
    const [types, setTypes] = useState([])

    useEffect(() => {
        fetchTypesFromAPI()
      }, [])

    function fetchTypesFromAPI(){
        fetch(`${host}/api/getcountoftypes`)
        .then(response => response.json())
        .then(data => {
            setTypes(data);
        })
        .catch(error => {
            console.log(error)
        })
    }


  return (
   <div>
        {_.isEmpty(types) ?
        <p>There is no food types</p>
        :
        Object.entries(types).map((key) => (
            <div>
                <FoodTypeCard name={key[0]} piece={key[1]}/>
            </div>
        ))
        }
   </div>
  );
}