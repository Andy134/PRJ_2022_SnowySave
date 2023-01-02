import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import CommonHeader from "../components/CommonHeader";
import MyNavbar from "../components/MyNavbar";
import { packService } from '../service/pack.service';
export const AppContext = createContext() 

export default function Root() {
  
  const [balance, setBalance] = useState(null)
  const [history, setHistory] = useState([])

  useEffect(()=>{
    packService.currentBalance().then((resp)=>{
      console.log(resp)
      setBalance(resp)
    });
    packService.fetchHistory().then((resp)=>{
      console.log(resp)
      setHistory(resp.data)
    });
  },[])

  const appValue = {
    balance,
    setBalance,
    history, 
    setHistory,
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
