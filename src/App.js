import React, { createRef, useEffect, useState } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';
import './App.css';

function App() {
  
  const nom = createRef();
  const age = createRef();
  const file = createRef();
  const [fileUrl,setFileUrl] = useState(null)
  const [users,setUsers] = useState([])
  
  // Access db 
let firebaseConfig = {
  apiKey: "AIzaSyCcRk6_kDqTlEpMx1JGJbZzzgjwjdyIJl4",
  authDomain: "jamracker-36ec0.firebaseapp.com",
  databaseURL: "https://jamracker-36ec0.firebaseio.com",
  projectId: "jamracker-36ec0",
  storageBucket: "jamracker-36ec0.appspot.com",
  messagingSenderId: "59652357676",
  appId: "1:59652357676:web:04872a226de5d2fd101b89"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

  // DB
  let db = firebase.firestore();

  // Rechercher les données dans la collection et affiche l'element de demandé
  const get = (ev,id) => {

    ev.preventDefault();
    
    if(!(id === null)){
      let docRef = db.collection("person").doc(id);
  
      docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
    }

  }

  // Supprimer les données de la collection
  const del = (ev,id) => {

    ev.preventDefault();

    db.collection("person").doc(id).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  }

  // affiche tout les elements de la db pour la collection person
  useEffect( () => {

    const fetchUser = async () =>{
      const usersCollections = await db.collection('person').get()
      setUsers((await usersCollections).docs.map(doc=>{
        return doc.data()
      }))
    }

    fetchUser();

  },[users])

  // envoie au storage l'element a stocker
  const onFileChange = async(e) => {
    const file = e.target.files[0]
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
      
      <div>
        <form onSubmit={(ev) => uploadFiles(ev)}>
          <label>Files : </label> <input type="file" onChange={(e) => onFileChange(e)} />
          <label>Name : </label> <input type="text" name="username" />
          <button>Submit</button>
        </form>
      </div>
      <div>
        
        <ul>
          {users.map((user)=>(
            <li key={user.name}> 
              
              <img src={user.avatar} alt={user.name}/>
             
              <p>
                <a href={user.avatar} download="song" >
                  {user.name} 
                </a>
                {/* <button onClick={(ev) => get(ev)}>Get</button>  */}
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
