import React, { createRef, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import firebase from 'firebase';
// import 'firebase/firestore';
import { app } from "./service/base";
import './App.css';

function App() {
  
  const [fileUrl,setFileUrl] = useState(null)
  const [users,setUsers] = useState([])

  // DB
  let db = app.firestore();

  // Supprimer les données de la collection
  const del = (ev,id) => {

    ev.preventDefault();

    db.collection("person").doc(id).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  }

  const fetchUser = () => {
    db.collection('person').get().then((snapshot) => {

        let data = [];
        snapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setUsers(data);
      })
    }
  // affiche tout les elements de la db pour la collection person
  useEffect( () => {
    
    fetchUser();

  },[])

  // envoie au storage l'element a stocker
  const onFileChange = async(e) => {
    // console.log(e.target)
    const file = e.target.files[0]
    console.log(e.target)
    const storageRef = firebase.storage().ref()
    const fileRef = storageRef.child(file.name)
    await fileRef.put(file)
    setFileUrl(await fileRef.getDownloadURL())
  }

  // ajoute a la db les elements
  const uploadFiles = (ev) => {
    ev.preventDefault();
    const username = ev.target.username.value;
    if(!username){
      return
    }
    db.collection("person").doc(username).set({
      name: username,
      avatar: fileUrl
    })

  }  

  return (
    <div className="App">
      <header></header>
      <div>
        <form onSubmit={(ev) => uploadFiles(ev)}>
          <label>Files : </label> <input type="file" onChange={(e) => onFileChange(e)}/>
          <label>Name : </label> <input type="text" name="username" />
          <button>Submit</button>
        </form>
      </div>
      <div>
        
        <ul>
          {users.map((user)=>(
            <li key={user.name}> 
              
              <img width="400" height="400" src={user.avatar} alt={user.name}/>
             
              <p>
                <a href={user.avatar} download="song" >
                  {user.name} 
                </a>
                <button onClick={(ev) => del(ev,user.name)}>Del</button> 
              </p>
              
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
