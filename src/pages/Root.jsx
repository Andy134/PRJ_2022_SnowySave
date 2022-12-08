import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import CommonHeader from "../components/CommonHeader";
import MyNavbar from "../components/MyNavbar";
import { packService } from "../service/pack.service";

export const AppContext = createContext() 

export default function Root() {
  const [balance, setBalance] = useState(null)

  useEffect(()=>{
    setBalance(
        packService.currentBalance() || null
    );
  },[])

  const appValue = {
    balance,
    setBalance
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
