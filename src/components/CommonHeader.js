import { useContext } from "react";
import { AppContext } from "../pages/Root";
import { util } from "../utility";

export default function CommonHeader() {

    const {balance} = useContext(AppContext);
    
    return <>
      <div className="cheader container mt-3 mb-3 d-flex justify-content-between align-items-center">
        <div>
        {
          `Số dư hiện tại: ${util.getLocalCurrency(balance?.total)} `
        }
        </div>
      </div>
    </>
}