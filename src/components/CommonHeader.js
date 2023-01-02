import { useContext } from "react";
import Swal from "sweetalert2";
import { AppContext } from "../pages/Root";
import { packService } from "../service/pack.service";
import { util } from "../utility";
import {useNavigate} from "react-router"

export default function CommonHeader() {

    const {balance, setBalance, setHistory} = useContext(AppContext);
    const navigate = useNavigate()

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

    return <>
      <div className="container mt-3 mb-3 d-flex justify-content-between align-items-center">
        <div>
          <button name="blnc" onClick={handleResetBalance} className="btn btn-secondary">Reset Balance</button>
          &nbsp; 
          <button name="blnc" onClick={handleResetSub} className="btn btn-secondary">Reset Sub</button>
          &nbsp; 
          <button name="blnc" onClick={handleResetHistory} className="btn btn-secondary">Reset History</button>
        </div>
        <div>
        {
          `Số dư hiện tại: ${util.getLocalCurrency(balance?.total)} `
        }
        </div>
      </div>
    </>
}