import { useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { auth } from "../firebaseConfig";
import { AppContext } from "../pages/Root";
import { authService } from "../service/auth.service";
import { packService } from "../service/pack.service";
import { util } from "../utility";
import ToggleDarkTheme from "./ToggleDarkTheme";

export default function MyNavbar() {

    const {balance, setBalance, setHistory, darkTheme} = useContext(AppContext);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    function handleResetBalance() {
        util.confirmSAlert(
          ()=>{
            balance.total = 0
            balance?.packs.forEach(element => {
              element.value = 0
            });
            // setBalance({...balance})
            setBalance({...balance})
            packService.distribution({...balance}).then(()=>{
              util.saveSuccess("Reset sucessfully !")
            })
          },
        "Reset Balance ?",
      )
    }

    function handleResetHistory() {
      util.confirmSAlert(
        ()=>{
          setHistory([])
          packService.resetHistory().then(()=>{
            Swal.fire('Reset sucessfully !',"","success");
          })
        },
        "Reset History ?",
      )
    }

    function handleResetSub() {
      util.confirmSAlert(
        ()=>{
          packService.resetSubs().then(()=>{
            Swal.fire('Reset sucessfully !',"","success");
            navigate('/');
          })
        },
        "Reset Subsidiary ?",
      )
    }
    
    // function handleImportHistory() {
    //   const data = []
    //   packService.importHistory("2023", data).then(()=>{
    //     navigate('/', );
    //   });
    // }

    useEffect(() => {
        if (!user) return navigate("/login");
        // eslint-disable-next-line
    }, [user]);

    return <>
        <nav className={`navbar navbar-expand-lg navbar-${darkTheme ? 'dark' : 'light'} bg-${darkTheme ? 'dark' : 'light'}`}>
            <div className="container">
                <Link className="navbar-brand" to={"/"}>SNOWY SAVER</Link>
                <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to={"/"} aria-current="page">Trang Chủ <span className="visually-hidden">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"outcome"}>Chi Tiêu</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"income"}>Thu Nhập</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"history"}>Lịch Sử</Link>
                        </li>
                    </ul>

                    <ToggleDarkTheme/>

                    <div className="nav-item dropdown">
                        <button className="btn btn-md dropdown-toggle" 
                            id="dropdownId" 
                            data-bs-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false"
                        >
                            <span className="nav-item" style={{color : `${darkTheme ? 'white' : 'black'}`}}>{user?.email}</span>
                        </button >
                        <div className="dropdown-menu" aria-labelledby="dropdownId">
                            {/* <Link className="dropdown-item"  onClick={handleImportHistory}>Import History</Link>
                            <hr/> */}
                            <Link className="dropdown-item"  onClick={handleResetBalance}>Reset Balance</Link>
                            <Link className="dropdown-item"  onClick={handleResetSub}>Reset Sub</Link>
                            <Link className="dropdown-item"  onClick={handleResetHistory}>Reset History</Link>
                            <hr/>
                            <Link className="dropdown-item" onClick={authService.logout}>Log out</Link>
                        </div>
                    </div>
                </div>
            </div>
         </nav>
    </>
}