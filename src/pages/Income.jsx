import { collection, connectFirestoreEmulator } from "firebase/firestore/lite";
import { useContext, useEffect, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pack from "../components/Pack";
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
    const [openModal, setOpenModal] = useState(false)
    
    const {balance, setBalance, getBalance} = useContext(AppContext);

    const [appBalance, setAppBalance] = useState()

    useEffect(()=>{
        setPackLst(storeData)
        setHistory(packService.fetchHistory())
        getBalance().then((res) => {
            console.log(res)
        })
    },[])

    function handleReset(){
        if(incomeForm !== initIncomeForm){
            setIncomeForm(initIncomeForm)
        }
    }

    function handleAutoDistribution() {
        // Balance
        let total = balance?.total || 0
        let undef = balance?.undefine || 0
        let packs = balance?.packs || storeData;

        if(incomeForm.amount <= 0) {
            alert("Số tiền phải lớn hơn 0");
            return;
        }

        total = total + +incomeForm.amount
        packs = packs.map(item => {
            const percent = +item.percent
            let value =  (percent * incomeForm.amount) / 100
            item.value = (item.value || 0) + value
            return item
        })

        setBalance({...balance, total, packs})
        packService.distribution(total, packs, undef)
        // History
        history.unshift(incomeForm)
        packService.updateHistory(incomeForm)
        setHistory([...history])

        setIncomeForm(initIncomeForm)
    }

    function handleDistribution() {
        let tempTotal = 0
        let total = balance?.total  || 0
        let undefine = balance?.undefine || 0
        packLst.forEach((item) => {
            tempTotal = tempTotal + +(item.amount || 0)
        })
        if(tempTotal > incomeForm.amount){
            alert("Phân bổ nhiều hơn số tiền nhập vào: " + util.getLocalCurrency(tempTotal - incomeForm.amount))
        }
        else{
            // Balance
            if(tempTotal < incomeForm.amount){
                undefine = undefine + (incomeForm.amount - tempTotal)
            }
            total = total + tempTotal

            let packs = balance?.packs || storeData;
            packs.forEach(element => {
                let id = element.id
                const currPack = packLst.find((item)=> +item.id === +id)
                const amount = currPack?.amount || 0
                element.value = element.value + +amount
            });

            setBalance({...balance, total, packs, undefine})
            packService.distribution(total, packs, undefine)

             // History
            history.unshift(incomeForm)
            packService.updateHistory(incomeForm)
            setHistory([...history])
            setOpenModal(false)
            setIncomeForm(initIncomeForm)
        }
        
    }

    function handleChange(e){
        const name = e.target.name;
        const value = e.target.value;
        setIncomeForm({...incomeForm, [name]: value})
    }

    function handleModal(){
        // Balance
        // if(incomeForm.amount <= 0) {
        //     alert("Số tiền phải lớn hơn 0");
        //     return;
        // }
        setOpenModal(!openModal)
    }

    function changeFormAmount(value){
        setIncomeForm({...incomeForm, amount: value})
    }

    return <>
        {/* Income */}
        <div className="income">
            <div className="row">
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
                                    id="newIncomeForm">
                                    
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
                            <Button variant="light" type="reset" form="newIncomeForm" onClick={handleReset}>
                                Xóa
                            </Button>
                            <Button variant="warning" type="button" onClick={handleModal}>
                                Phân bổ
                            </Button>
                            <Button variant="dark" type="button" onClick={handleAutoDistribution}>
                                Phân bổ tự động
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-md-6 col-sm-12 mt-4">
                    <div className="packs card">
                        <div className="card-body">
                            <h5 className="card-title">Danh sách quỹ</h5>
                            <hr/>
                            {/* {balance?.packs?.map((item)=>{return <p key={item.id}>{JSON.stringify(item)}</p>})} */}
                            {/* <div className="row g-4">
                                {balance && balance.packs?.map((item, idx)=>{
                                    return <div key={idx} className="col-sm-12 col-md-6 col-lg-4">
                                            <Pack item={item}/>
                                            </div>
                                })}
                            </div> */}
                            <div className="d-flex flex-column">
                                {balance?.packs?.map((item)=>{
                                    return <Pack key={item.id} tyle={"list"} item={item}/>
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-sm-12 mt-4">
                    <div className="balance card">
                        <div className="card-body">
                            <h5 className="card-title">Thông tin số dư</h5>
                            <hr/>
                            <div className="d-flex justify-content-center align-items-center gap-3">
                                <h4 className="card-text d-flex justify-content-center">
                                    {util.getLocalCurrency(balance?.total)}
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="card mt-4">
                        <div className="card-body">
                            <h5 className="card-title">Số dư chưa phân bổ</h5>
                            <hr/>
                            <div className="d-flex justify-content-center align-items-center gap-3">
                                <h4 onClick={()=>setOpenModal(true)}
                                    className="card-text d-flex justify-content-center text-warning">
                                    {util.getLocalCurrency(balance?.undefine)}
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="card mt-4">
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
                                            {item.src && ` - ${item.src}`}
                                            {item.note && ` ( ${item.note} )`}    
                                        </span>
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

        </div>

        {/* Modal Add new sub */}
        <Modal show={openModal} onHide={handleModal}>
            <Modal.Header closeButton>
            <Modal.Title>Phân bổ </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <DistributionManual param={{ 
                        amount : incomeForm.amount, 
                        changeFormAmount,
                        packLst, 
                        setPackLst    
                    }}/>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={handleModal}>
                    Close
                </Button>
                <Button variant="dark" type="button" onClick={handleDistribution}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}

function DistributionManual({param}){

    const [amount, setAmount] = useState(param.amount)
    const {balance} = useContext(AppContext)

    useEffect(()=>{
        return ()=>{
            let initStore = param.packLst.map((item)=>{
                item.amount = 0
                return item
            })
            param.setPackLst([...initStore])
            // param.changeFormAmount(amount)
        }
    }, [])

    function handleChangeAmount(e) {
        setAmount(+e.target.value)
    }

    function handleInput(e) {
        let id = +e.target.name.replace('input-','')
        let value = +e.target.value
        let pack = param.packLst.find((item)=>item.id === id)
        pack.amount = value
        param.setPackLst([...param.packLst])
    }

    return <>
        <Form id="distributionForm">
            <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Số dư: </Form.Label>&nbsp;
                <strong>{util.getLocalCurrency(balance.total)}</strong>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="amount">
                <Form.Label>Nạp tiền</Form.Label>
                <Form.Control type="number" 
                    name="amount"
                    value={amount}
                    onChange={handleChangeAmount} 
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="amount">
                {balance?.packs?.map((item, idx)=>{
                    return <div className="row" key={idx}>
                        <div className="col-sm-12 col-md-8">
                            <Pack key={idx} item={item} tyle={"list"}/>
                        </div>
                        <div className="col-sm-12 col-md-4 d-flex align-items-center">
                            <input type="number" name={`input-${item.id}`}
                                className="form-control"
                                onChange={handleInput}
                            />
                        </div>
                    </div>
                })}
            </Form.Group>
        </Form>
    </>
}




