import { useEffect, useState } from "react";

import Pack from "../components/Pack";
import { storeData } from "../data/storeData";

export default function Packs() {
    
    const [packLst, setPackLst] = useState([])

    useEffect(()=>{
        setPackLst(storeData);
    },[])

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
        <div className="container">
            <div className="row mt-2 justify-content-center align-items-center g-4">
                {packLst && packLst?.map((item, idx)=>{
                    return <div key={idx} className="col-sm-12 col-md-6 col-lg-4">
                            <Pack item={item}/>
                            </div>
                })}
            </div>
        </div>
    </>
}