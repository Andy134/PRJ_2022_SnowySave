import { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { storeData } from "../data/storeData";
import { packService } from "../service/pack.service";
import { util } from "../utility";
import { AppContext } from "./Root";

const initIncomeForm = {
    "src": "",
    "amount": 0,
    "type": "I"
}

export default function Income() {

    // State, Effect
    const [incomeForm, setIncomeForm] = useState(initIncomeForm)
    const [history, setHistory] = useState([])
    const [packLst, setPackLst] = useState()
    
    const {balance, setBalance} = useContext(AppContext); 

    useEffect(()=>{
        setPackLst(storeData)
        setHistory(packService.fetchHistory())
    },[])

    function handleDistribution() {
        // Balance
        let total = balance?.total || 0
        if(incomeForm.amount <= 0) {
            alert("Số tiền phải lớn hơn 0");
            return;
        }

        total = total + +incomeForm.amount

        let packs = balance?.packs || storeData;
        if(packLst){
            packs = packs.map(item => {
                const percent = +item.percent
                let value =  (percent * incomeForm.amount) / 100
                item.value = (item.value || 0) + value
                return item
            })
        }

        setBalance({...balance, total, packs})
        packService.autoDistribution(total, packs)
        // History
        history.unshift(incomeForm)
        packService.updateHistory(incomeForm)
        setHistory([...history])

        setIncomeForm(initIncomeForm)
    }

    function handleChange(e){
        const name = e.target.name;
        const value = e.target.value;
        setIncomeForm({...incomeForm, [name]: value})
    }

    return <>
        {/* Income */}
        <div className="income row">
            <div className="col-12">
                <div className="card text-start">
                    <div className="card-header">
                        <h5 className="card-title">Nạp tiền</h5>
                    </div>
                    <div className="card-body">
                        <div className="row form mt-3">
                            <Form className="
                                col-lg-6 offset-lg-3
                                col-md-8 offset-md-2
                                col-sm-10 offset-sm-1" 
                                id="newIncomeForm" 
                                onSubmit={handleDistribution}>
                                
                                <Form.Group className="mb-3" controlId="formAmount">
                                    <Form.Label>Số tiền</Form.Label>
                                    <Form.Control name="amount" type="number" 
                                        value={incomeForm.amount} 
                                        onChange={handleChange}
                                        required={true}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formSrc">
                                    <Form.Label>Nguồn</Form.Label>
                                    <Form.Control name="src" type="text"  
                                        value={incomeForm.src} 
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                    <div className="card-footer d-flex justify-content-center gap-2">
                        <Button variant="light" type="reset" form="newIncomeForm">
                            Xóa
                        </Button>
                        <Button variant="dark" type="button" onClick={handleDistribution}>
                            Phân bổ tự động
                        </Button>
                    </div>
                </div>
            </div>
            <div className="col-md-6 col-sm-12 p-md-3 pt-sm-3">Danh sách quỹ
                <div>

                    {balance?.packs?.map((item)=>{return <p key={item.id}>{JSON.stringify(item)}</p>})}

                </div>
            </div>
            <div className="col-md-6 col-sm-12 p-md-3 pt-sm-3">
                
                <div className="balance card">
                    <div className="card-body">
                        <h5 className="card-title">Thông tin số dư</h5>
                        <hr/>
                        <div className="d-flex justify-content-center align-items-center gap-3">
                            <h3 className="card-text d-flex justify-content-center">
                                {util.getLocalCurrency(balance?.total)}
                            </h3>
                            -
                            <h5 className="card-text d-flex justify-content-center text-muted">
                                {util.getLocalCurrency(balance?.undefined)}
                            </h5>
                        </div>
                    </div>
                </div>
                <div className="card mt-3">
                    <div className="card-body">
                        <h5 className="card-title">Lịch sử</h5>
                        <hr/>
                        {history?.slice(0,5).map((item, idx)=>{
                            return <div key={idx} >
                                <div className={`history-item py-2 d-flex align-items-${item.type === "I" ? 'end' : 'start'} flex-column`} with={'100%'}>
                                    <span>
                                        {item.type === "I" ?
                                            <strong className="text-success">+ {util.getLocalCurrency(+item.amount)}</strong> 
                                            :
                                            <strong className="text-danger">- {util.getLocalCurrency(+item.amount)}</strong> 
                                        }
                                        &nbsp;-&nbsp;{item.src}</span>
                                    {/* <p className="text-muted">{moment(item.date).format('DD/MM/YYYY')}</p> */}
                                </div>
                            </div>
                        })}
                        <div className="d-flex justify-content-center mt-3">
                            <Link className="link" to="/history">Xem thêm</Link>
                        </div>
                    </div>
                </div>
                
            </div>

        </div>
    </>
}




