import React, {useEffect, useState} from 'react';
import ShoppingListTable from '../components/tables/ShoppingListTable';

function ShoppingList() {

  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    fetchShoppingListFromAPI()
  }, [])

  function fetchShoppingListFromAPI(){
    fetch('/api/shoppinglist')
    .then(response => response.json())
    .then(data => {
      setShoppingList(data);
    })
    .catch(error => {
      console.log(error)
    })
  }


  return (
    <div>
      <ShoppingListTable shoppingList={shoppingList}/>
    </div>
  );
}

export default ShoppingList;
