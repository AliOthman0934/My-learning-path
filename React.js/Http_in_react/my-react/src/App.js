import React, {useState} from "react";
import UserDetails from "./components/UserDetails";
import UserForm from "./components/UserForm";
import "./App.css"

function App(){
  let [showForm, setShowForm]= useState(false);

  function addUserHandler(){
    setShowForm(true);
  }

  function closeForm(){
    setShowForm(false)
  }

  function createUser(user){
    fetch("https://http-ce833-default-rtdb.firebaseio.com/user.json",{
      method : "post",
      body : JSON.stringify(user),
      headers : {
        "content-type" : "application/json"
      }
    })
  }

  return(
    <div>
      <div className="page-header">
        <button className="btn btn-success" onClick={addUserHandler}  > Add User</button>
        <button className="btn btn-normal"> Get users</button>
      </div>
      <UserDetails></UserDetails>
      {showForm && <UserForm closeForm={closeForm} onCreatUser = {createUser}></UserForm>}
    </div>  
  )
}

export default App;