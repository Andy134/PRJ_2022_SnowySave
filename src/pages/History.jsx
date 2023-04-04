import moment from "moment";
import { useContext } from "react";
import { CSVLink } from "react-csv";
import HCard from "../components/HCard";
import { AppContext } from "./Root";

export default function History() {
  
  const {history} = useContext(AppContext);

  return (
      <div className="history">
        <div className="row d-flex justify-content-end">
          <div className="col-12 d-flex justify-content-end">
            <CSVLink 
              className="btn btn-success"
              data={history || []}
              filename={`History_${moment().format("DDMMYYYYHHMMSS").toString()}.csv`}
            >
              Download
            </CSVLink>
          </div>
        </div>
        <div className="row">
          {history?.map((item, idx)=><HCard key={idx} hisItm={item}/>)}
        </div>
      </div>
  );
}
