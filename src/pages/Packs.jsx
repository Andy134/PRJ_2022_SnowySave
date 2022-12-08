import { useContext } from "react";
import { useEffect, useState } from "react";

import Pack from "../components/Pack";
import { storeData } from "../data/storeData";
import { AppContext } from "./Root";

export default function Packs() {
    
    const {balance, setBalance} = useContext(AppContext);

    // useEffect(()=>{
    //     let balanceTotal = balance.amount;
    //     console.log(balanceTotal)
    //     if(balanceTotal > 0 && packLst?.list) {
    //         packLst.list.forEach((item)=>{
    //             let balance =( balanceTotal * item.percent) / 100
    //             console.log(item.id + '-' + balance)
    //             item.balance = balance
    //         })
    //         setPackLst(packLst)
    //     }
    // },[])

    // const updateBalance = (event) => {
    //     const formData = new FormData(event.currentTarget);
    //     event.preventDefault();
    //     const obj = Object.fromEntries(formData);
    //     setBalance({...balance, ...obj})
    // }

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