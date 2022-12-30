import { initializeApp } from 'firebase/app';
import { collection, doc, getDocs, getFirestore } from 'firebase/firestore/lite';
import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import CommonHeader from "../components/CommonHeader";
import MyNavbar from "../components/MyNavbar";
import { packService } from "../service/pack.service";
export const AppContext = createContext() 

const firebaseConfig = {
  apiKey: "AIzaSyCq5r47a5Wu5dWp87adPbA0ifPnpuIaj-c",
  authDomain: "snowysave-5228e.firebaseapp.com",
  projectId: "snowysave-5228e",
  storageBucket: "snowysave-5228e.appspot.com",
  messagingSenderId: "864955101872",
  appId: "1:864955101872:web:06aad4fbb3b6294ded4175",
  measurementId: "G-ZYLBQRY8V9"
};
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);

export default function Root() {
  
  const [balance, setBalance] = useState(null)

  useEffect(()=>{
    setBalance(
        packService.currentBalance() || null
    );
  },[])

  // Get balance from your database
  async function getBalance() {
    const docRef = doc(db, "balance", "data");
    const packRef = collection(docRef, "packs");
    const querySnapshot = await getDocs(packRef);
    if (querySnapshot.length>0) {
      return querySnapshot;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      return null;
    }
  }

  const appValue = {
    balance,
    setBalance,
    getBalance
  }

  return (
    <AppContext.Provider value={appValue}>
      <div id="sm-app">
        <MyNavbar/>
        <CommonHeader/>
        <div className="container">
          <Outlet />
        </div>
      </div>
    </AppContext.Provider>
  );
}
