import moment from "moment";
import { util } from "../utility";

export default function HCard({hisItm}) {

    const cardText = <>
        <p>{hisItm.src && ` ${hisItm.src}`} <i>{hisItm.note && ` ( ${hisItm.note} )`}</i></p>
       
    </>

    return <div className={`col-sm-12 col-md-8 ${hisItm.type !== "I" ? 'offset-md-4' : ''}  pt-4`}>
        <i className="text-muted">{moment(hisItm.date, 'YYYY-MM-DD')?.toDate()?.toLocaleDateString() || ''}</i>
        {hisItm.type === "I" ?
        <div className="card d-flex align-items-start">
            <div className="card-body">
                <h4 className="card-title"><strong className="text-green">+ {util.getLocalCurrency(+hisItm.amount)}</strong> </h4>
                {cardText}
            </div>
        </div>
        :
        <div className="card d-flex align-items-end">
            <div className="card-body d-flex flex-column align-items-end">
                <h4 className="card-title"><strong className="text-red">- {util.getLocalCurrency(+hisItm.amount)}</strong></h4>
                {cardText}
            </div>
        </div>
        }
    </div>
}