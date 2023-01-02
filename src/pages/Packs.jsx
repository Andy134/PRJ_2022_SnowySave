import { useContext } from "react";

import Pack from "../components/Pack";
import { AppContext } from "./Root";

export default function Packs() {
    
    const {balance} = useContext(AppContext);

    return <>
        <div className="packs">
            <div className="row g-4">
                {balance && balance.packs?.map((item, idx)=>{
                    return <div key={idx} className="col-sm-12 col-md-6 col-lg-4">
                            <Pack item={item}/>
                            </div>
                })}
            </div>
        </div>
    </>
}