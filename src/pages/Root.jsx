import { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet, useNavigate } from "react-router-dom";
import CommonHeader from "../components/CommonHeader";
import MyNavbar from "../components/MyNavbar";
import { auth } from "../firebaseConfig";
import { packService } from '../service/pack.service';
export const AppContext = createContext() 

export default function Root() {
  
  const [balance, setBalance] = useState(null)
  const [history, setHistory] = useState([])
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  // eslint-disable-next-line
  }, [user, loading]);

  useEffect(()=>{
    packService.currentBalance().then((resp)=>{
      setBalance(resp)
    });
    packService.fetchHistory().then((resp)=>{
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
