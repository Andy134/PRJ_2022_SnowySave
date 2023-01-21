import moment from "moment";
import { util } from "../utility";

export default function HCard({hisItm}) {

    const cardText = <>
        <p>{hisItm.src && ` ${hisItm.src}`}</p>
        <p>{hisItm.note && ` ${hisItm.note}`}</p>
        <i className="text-muted">{moment(hisItm.date, 'YYYY-MM-DD')?.toDate()?.toLocaleDateString() || ''}</i>
    </>

    return <div className="col-sm-12 col-md-9 py-2">
        {hisItm.type === "I" ?
        <div className="card d-flex align-items-start">
            <div className="card-body">
                <h4 className="card-title"><strong className="text-success">+ {util.getLocalCurrency(+hisItm.amount)}</strong> </h4>
                {cardText}
            </div>
        </div>
        :
        <div className="card d-flex align-items-end">
            <div className="card-body d-flex flex-column align-items-end">
                <h4 className="card-title"><strong className="text-danger">- {util.getLocalCurrency(+hisItm.amount)}</strong></h4>
                {cardText}
            </div>
        </div>
        }
    </div>
}