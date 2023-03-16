import { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet, useNavigate } from "react-router-dom";
import CommonHeader from "../components/CommonHeader";
import MyNavbar from "../components/MyNavbar";
import { auth } from "../firebaseConfig";
import { packService } from '../service/pack.service';
export const AppContext = createContext() 

export default function Root() {

  const [darkTheme, setDarkTheme] = useState(false)
  
  const [balance, setBalance] = useState(null)
  const [history, setHistory] = useState([])
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
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
    darkTheme, 
    setDarkTheme,
    balance,
    setBalance,
    history, 
    setHistory,
  }

  return (
    <AppContext.Provider value={appValue}>
      <div className={`sm-app ${darkTheme && 'dark'}`}>
        <MyNavbar/>
        <CommonHeader/>
        <div className="outlet container">
          <Outlet />
        </div>
      </div>
    </AppContext.Provider>
  );
}
