import { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet, useNavigate } from "react-router-dom";
import CommonHeader from "../components/CommonHeader";
import MyNavbar from "../components/MyNavbar";
import { auth } from "../firebaseConfig";
import { packService } from '../service/pack.service';
import { util } from "../utility";
export const AppContext = createContext()

const STORAGE_DARK_THEME = "STORAGE_DARK_THEME"

export default function Root() {

  const [darkTheme, setDarkTheme] = useState(process.env.REACT_APP_DARK_THEME)

  const [balance, setBalance] = useState(null)
  const [history, setHistory] = useState([])
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    // eslint-disable-next-line
  }, [user, loading]);

  useEffect(() => {
    const currentDarkTheme = JSON.parse(localStorage.getItem(STORAGE_DARK_THEME))  || darkTheme
    setDarkTheme(currentDarkTheme)

    packService.currentBalance().then((resp) => {
      setBalance(resp)
    });

    let currYear = util.getDate(new Date()).year
    packService.fetchHistory().then((resp)=>{
      const currentyearData = resp.data?.find((item)=> item[currYear])
      if(currentyearData){
        setHistory(currentyearData[currYear] || [])
      }
    });
  // eslint-disable-next-line
  }, [])

  function handleChangeTheme() {
    let changedDarkTheme = !darkTheme
    setDarkTheme(changedDarkTheme)
    localStorage.setItem(STORAGE_DARK_THEME, changedDarkTheme)
  }

  const appValue = {
    darkTheme,
    handleChangeTheme,
    balance,
    setBalance,
    history,
    setHistory,
  }

  return (
    <AppContext.Provider value={appValue}>
      <div className={`sm-app ${darkTheme && 'dark'} pb-4`}>
        {process.env.NODE_ENV === "development" && <div width="100%" style={{backgroundColor: 'cyan', color: 'black'}}>DEVELOPMENT</div>}
        <MyNavbar />
        <CommonHeader />
        <div className="outlet container">
          <Outlet />
        </div>
      </div>
    </AppContext.Provider>
  );
}
