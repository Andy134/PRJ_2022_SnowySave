import { useMemo } from 'react';
import { util } from '../utility';

export default function Pack({item}) {
    var amount = useMemo(()=>{
        return util.getLocalCurrency(item.value);
    },[item.value])

    return <>
        <div className="card">
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
                    <div><a href={`/${item.id}`} className="btn btn-outline-dark">+</a></div>
                </div>
            </div>
        </div>
    </>
}