import React, {useEffect, useState} from 'react';
import ShoppingListTable from '../components/tables/ShoppingListTable';
import { host } from '../host';
import EmailSendingForm from '../components/forms/EmailSendingForm';

function ShoppingList() {

  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    fetchShoppingListFromAPI()
  }, null)

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
    }).catch(error => {
      console.log(error)
    })
  }


  return (
    <div>
      <EmailSendingForm />
      <ShoppingListTable
          shoppingList={shoppingList}
          deleteItemWithId={deleteItemWithId}
      />
    </div>
  );
}

export default ShoppingList;
