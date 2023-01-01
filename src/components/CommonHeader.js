import { useContext } from "react";
import { AppContext } from "../pages/Root";
import { packService } from "../service/pack.service";
import { util } from "../utility";

export default function CommonHeader() {

    const {balance, setBalance} = useContext(AppContext);

    function handleReset() {
      console.log("ResetAll :::");
      balance.total = 0
      balance?.packs.forEach(element => {
        element.value = 0
      });
      setBalance({...balance})
      packService.distribution({...balance})
    }

    return <>
      <div className="container mt-3 mb-3 d-flex justify-content-between align-items-center">
        <div>
          <button name="blnc" onClick={handleReset} className="btn btn-light">Reset</button>
        </div>
        <div>
        {
          `Số dư hiện tại: ${util.getLocalCurrency(balance?.total)} `
        }
        </div>
      </div>
    </>
}