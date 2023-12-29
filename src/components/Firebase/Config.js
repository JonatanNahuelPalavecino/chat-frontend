import { initializeApp } from "@firebase/app"
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDYU-1LEO9bi3w0WBY1erXHOao9V0-CwZY",
    authDomain: "database-de-prueba.firebaseapp.com",
    projectId: "database-de-prueba",
    storageBucket: "database-de-prueba.appspot.com",
    messagingSenderId: "572957435210",
    appId: "1:572957435210:web:460dc001dc47bf9a840db3"
  };
  

const app = initializeApp(firebaseConfig);

export const autenticacion = getAuth(app)

