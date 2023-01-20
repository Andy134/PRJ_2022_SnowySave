import { createContext, useEffect, useState } from "react";
import HCard from "../components/HCard";
import { packService } from '../service/pack.service';
export const AppContext = createContext() 

export default function History() {
  
  const [history, setHistory] = useState([])

  useEffect(()=>{
    packService.fetchHistory().then((resp)=>{
      setHistory(resp.data)
    });
  },[])

  return (
      <div className="history">
        <div className="row d-flex justify-content-center py-2">
            {history.map((item)=><HCard hisItm={item}/>)}
        </div>
      </div>
  );
}
