import { useContext, useEffect, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import CurrencyInput from "react-currency-input-field";
import Pack from "../components/Pack";
import { storeData } from "../data/storeData";
import { packService } from "../service/pack.service";
import { util } from "../utility";
import { AppContext } from "./Root";

const initIncomeForm = {
    "src": "",
    "amount": 0,
    "type": "I",
    "date": null
}

export default function Income() {
    // State, Effect
    const [incomeForm, setIncomeForm] = useState(initIncomeForm)
    const [packLst, setPackLst] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const {balance, setBalance, history, setHistory} = useContext(AppContext);

    useEffect(()=>{
        setPackLst(storeData);
    },[])

    function handleReset(){
        if(incomeForm !== initIncomeForm){
            setIncomeForm(initIncomeForm)
        }
    }
    function handleAutoDistribution() {
        util.confirmSAlert(
            ()=>{
                // Balance
                let total = balance?.total || 0
                let packs = balance?.packs || storeData;
                if(+incomeForm.amount <= 0) {
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
                packService.distribution({...balance, total, packs})
                // History
                history.unshift(incomeForm)
                packService.updateHistory(incomeForm)
                setHistory([...history])
                setIncomeForm(initIncomeForm)
            },
          "Tự động phân bổ ?",
        )
    }
    function handleDistribution() {
        let tempTotal = 0
        let total = balance?.total  || 0
        packLst?.forEach((item) => {
            tempTotal = tempTotal + +(item.value || 0)
        })
        console.log(tempTotal);
        console.log(incomeForm.amount);
        if(+tempTotal !== +incomeForm.amount){
            alert("Phân bổ chưa đạt số tiền nhập vào")
        }
        else{
            // Balance
            total = total + tempTotal

            let packs = balance?.packs || storeData;
            packs.forEach(element => {
                let id = element.id
                const currPack = packLst.find((item)=> +item.id === +id)
                const amount = currPack?.value || 0
                element.value = element.value + +amount
            });

            setBalance({...balance, total, packs})
            packService.distribution({...balance, total, packs})
             // History
            history.unshift(incomeForm)
            packService.updateHistory(incomeForm)
            setHistory([...history])
            setOpenModal(false)
            setIncomeForm(initIncomeForm)
        }
    }
    function handleChange(e){
        console.log(e.target.name + "--" + e.target.value);
        const name = e.target.name;
        const value = e.target.value;
        setIncomeForm({...incomeForm, [name]: value})
    }
    function handleModal(){
        if(!openModal)
        // Balance
        if(incomeForm.amount <= 0) {
            alert("Số tiền phải lớn hơn 0");
            return;
        }
        setOpenModal(!openModal)
    }
    return <>
        {/* Income */}
        <div className="income">

            <div className="row mt-4">
                <div className="col-md-6 col-sm-12">
                    <div className="packs card">
                        <div className="card-body">
                            <h5 className="card-title">Danh sách quỹ</h5>
                            <hr/>
                            <div className="d-flex flex-column">
                                {balance?.packs?.map((item, key)=>{
                                    return <Pack key={key} tyle={"list"} item={item}/>
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-sm-12 ">

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
                                        <CurrencyInput
                                            className="form-control"
                                            id="amount"
                                            name="amount"
                                            value={incomeForm.amount} 
                                            required={true}
                                            decimalsLimit={0}
                                            onValueChange={(value, name) => handleChange({target : {
                                                name: name,
                                                value: value
                                            }})}
                                        />
                                        {/* <Form.Control name="amount" type="number" 
                                            value={incomeForm.amount} 
                                            onChange={handleChange}
                                            required={true}
                                        /> */}
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
                            <Button variant="secondary" type="reset" form="newIncomeForm" onClick={handleReset}>
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

                    <div className="card mt-4">
                        <div className="card-body">
                            <h5 className="card-title">Thông tin số dư</h5>
                            <hr/>
                            <div className="d-flex justify-content-center align-items-center gap-3">
                                <h4 className="card-text text-success d-flex justify-content-center">
                                    {util.getLocalCurrency(balance?.total)}
                                </h4>
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

    const {packLst, setPackLst} = param

    const [amount] = useState(param.amount)
    const {balance} = useContext(AppContext)

    function handleInput(e) {
        let id = +e.target.name.replace('input-','')
        let value = +e.target.value

        let pack = packLst.find((item)=>+item.id === +id)
        if(pack) {
            pack.value = value
           setPackLst([...packLst])
        }
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
                    readOnly={true}
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




