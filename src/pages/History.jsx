import moment from "moment";
import { createContext, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import HCard from "../components/HCard";
import { packService } from '../service/pack.service';

export const AppContext = createContext() ;

export default function History() {
  
  const [history, setHistory] = useState([])

  useEffect(()=>{
    packService.fetchHistory().then((resp)=>{
      setHistory(resp.data)
    });
  },[])

  return (
      <div className="history">
        <div className="row d-flex justify-content-end">
          <div className="col-3 d-flex justify-content-end">
            <CSVLink 
              className="btn btn-success"
              data={history}
              filename={`History_${moment().format("DDMMYYYYHHMMSS").toString()}.csv`}
            >
              Download
            </CSVLink>
          </div>
        </div>
        <div className="row d-flex justify-content-center py-2">
          {history.map((item)=><HCard hisItm={item}/>)}
        </div>
      </div>
  );
}
