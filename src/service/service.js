import firebase from "firebase";
import { app } from "./service/base";


export  function DB(){

    // DB
    let db = app.firestore();
    
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
    
    // // envoie au storage l'element a stocker
    // const onFileChange = async(e) => {
    //   const file = e.target.files[0]
    //   const storageRef = firebase.storage().ref()
    //   const fileRef = storageRef.child(file.name)
    //   await fileRef.put(file)
    //   setFileUrl(await fileRef.getDownloadURL())
    // }
    
    // // ajoute a la db les elements
    // const uploadFiles = (ev) => {
    //   ev.preventDefault();
    //   const username = ev.target.username.value;
    //   if(!username){
    //     return
    //   }
    //   db.collection("person").doc(username).set({
    //     name: username,
    //     avatar: fileUrl
    //   })
    
    // } 
}
