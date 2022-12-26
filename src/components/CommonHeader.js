import { useContext } from "react";
import { AppContext } from "../pages/Root";
import { util } from "../utility";

export default function CommonHeader() {

    const {balance} = useContext(AppContext);

    return <>
        <div className="container mt-3 mb-3 d-flex justify-content-end">
        {`Số dư hiện tại: 
          ${util.getLocalCurrency(balance?.total)} 
          - Chưa phân bổ: 
          ${util.getLocalCurrency(balance?.undefine)}`}
      </div>
    </>
}