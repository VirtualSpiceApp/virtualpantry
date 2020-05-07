import React, {useEffect, useState} from 'react';
import ShoppingListTable from '../components/tables/ShoppingListTable';
import { host } from '../host';

function ShoppingList() {

  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    fetchShoppingListFromAPI()
  }, [])

  function fetchShoppingListFromAPI(){
    fetch(`${host}/api/shoppinglist`)
    .then(response => response.json())
    .then(data => {
      setShoppingList(data);
    })
    .catch(error => {
      console.log(error)
    })
  }

  function deleteItemWithId(itemId){
    fetch(`${host}/api/shoppinglist/delete/${itemId}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
    }).then(data =>{
      setOpen(true)
    })
    .catch(error => {
      console.log(error)
    })
  }


  return (
    <div>
      <ShoppingListTable
          shoppingList={shoppingList}
          deleteItemWithId={deleteItemWithId}
      />
    </div>
  );
}

export default ShoppingList;
