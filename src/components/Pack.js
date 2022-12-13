import { useMemo } from 'react';
import { util } from '../utility';

export default function Pack({item, tyle = "grid"}) {
    var amount = useMemo(()=>{
        return util.getLocalCurrency(item.value);
    },[item.value])

    return <>
        { (tyle === "grid") && 
            <div className="pack card">
                <div className='p-3 text-center'>
                    <img 
                        src={`/assets/pack/${item.img}`} 
                        className="card-img-top" 
                        style={{width: '8rem', height: '8rem'}}
                        alt="..." />
                </div>
                <div className="card-body">
                    <h5 className="card-title title text-center">{item.title}
                        <br/>
                        <span> {item.percent}%</span>
                    </h5>
                    <p className="card-text description">{item.description}</p>
                    <hr/>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className='amount'>{amount}</div>
                        {/* <div><a href={`/${item.id}`} className="btn btn-outline-dark">+</a></div> */}
                    </div>
                </div>
            </div>
        }
        { (tyle === "list") && 
            <div className="pack">
                <div className="row" data-bs-toggle={`tooltip`} 
                                data-bs-placement="top" 
                                title={`${item.title} - ${item.percent}%`}>
                    <div className='col-3 text-center d-flex align-items-center justify-content-center'>
                        <img 
                            src={`/assets/pack/${item.img}`} 
                            className="card-img-top" 
                            style={{width: '3rem', height: '3rem'}}
                            alt="..." />
                    </div>
                    <div className="col-9 p-3" >
                        <strong className="card-title title singleline">{item.title}
                        <span>&nbsp;-&nbsp;{item.percent}%</span>
                        </strong>
                        <div className='d-flex  align-items-center'>
                            <div className='amount'>{amount}</div>
                        </div>
                    </div>
                </div>
            </div>
        }
    </>
}