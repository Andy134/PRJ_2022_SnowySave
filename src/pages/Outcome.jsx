import { useContext, useEffect, useMemo, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { storeData } from "../data/storeData";
import { packService } from "../service/pack.service";
import { util } from "../utility";
import { AppContext } from "./Root";

const Init_Form = {
    title: '',
    img: '',
    amount: 0,
}

export default function OutCome() {

    const {balance} = useContext(AppContext);

    // State, Effect
    const [packLst, setPackLst] = useState()
    const [selSub, setSelSub] = useState({
        pack : 0, sub : 0
    })
    const [subLst, setSubLst] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [newsubform , setNewsubform] = useState()

    const selSubDetail = useMemo(()=>{
        return subLst.find(item => item.id === selSub.sub)
    }, [selSub])

    useEffect(()=>{
        setNewsubform(Init_Form);
    },[])

    useEffect(()=>{
        setPackLst(balance?.packs);
    },[balance])

    useEffect(()=>{
        if(packLst){ 
            let subs = packService.fetchSubs();
            console.log("Fetch subs: " + JSON.stringify(subs))
            setSubLst([...subs]);
        }
    },[packLst])

    // Handle

    function setSelectedSub(pack, sub){
        console.log(pack + "-" + sub);
        setSelSub({pack, sub});
    }

    function handleChangeSubForm(e){
        let name = e.target.name
        let value =  e.target.value
        setNewsubform({...newsubform, [name]: value})
    }

    function handleSaveSubForm(e){
        e.preventDefault();
        
        let currentPack = packLst.find((el)=>el.id === selSub.pack)
        console.log(currentPack)

        let subs = subLst ? subLst.filter((el)=>el.packId === currentPack.id) : null

        let id = subs.length > 0 ? Math.max(...subs.map(o => o.id)) + 1 : 0

        let packId = currentPack.id

        let newSub = {
            ...newsubform, id, packId
        }

        console.log(newSub)
        subLst.push(newSub)
        packService.saveSubs(subLst)

        handleCloseModal();
    }

    function handleCloseModal(){ 
        setOpenModal(false)
        setNewsubform(Init_Form)
        setSelSub({pack : 0, sub : 0})
    };

    function handleShowModal(pack){ 
        setSelSub({pack : pack, sub : 0})
        setOpenModal(true)
    };

    return <>
        <div className="outcome">

            <div className="row">
                <div className="col-md-0 col-lg-2"></div>
                <div className="col-md-12 col-lg-8">
                    <div className="card text-start">
                        <div className="card-header">
                            <h5 className="card-title">Chi tiền</h5>
                        </div>
                        <div className="card-body">
                            <div className="row form mt-3">
                                <Form className="
                                    col-lg-6 offset-lg-3
                                    col-md-8 offset-md-2
                                    col-sm-10 offset-sm-1" 
                                    id="newIncomeForm">
                                    
                                    <Form.Group className="mb-3" controlId="formSrc">
                                        <Form.Label>Nguồn</Form.Label>
                                        <Form.Control name="src" type="text" value={selSubDetail?.title} readOnly={true}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formAmount">
                                        <Form.Label>Số tiền</Form.Label>
                                        <Form.Control name="amount" type="number" 
                                            required={true}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formAmount">
                                        <Form.Label>Ghi chú</Form.Label>
                                        <Form.Control name="note" type="text" 
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formDate">
                                        <Form.Label>Ngày</Form.Label>
                                        <DatePicker 
                                            className="form-control"
                                        />
                                    </Form.Group>
                                </Form>
                            </div>
                        </div>
                        <div className="card-footer d-flex justify-content-center gap-2">
                            <Button variant="light" type="reset" form="newIncomeForm" >
                                Xóa
                            </Button>
                            <Button variant="warning" type="button" >
                                Lưu
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* OutCome */}
            <div className="outcome">
            {
                packLst?.map((item, idx)=>{
                    return <div className="group" key={idx}>
                            <div className="gr-name my-1 d-flex justify-item-content align-items-end">
                                <img width="42px" src={`/assets/pack/${item.img}`} alt=""/>
                                <h5 className="mb-0 ms-2">{item.title}</h5>
                                {balance && <h5 className="mb-0 ms-3 text-warning">{
                                        util.getLocalCurrency(balance?.packs.find((el=>el.id === item.id)).value)
                                    }</h5>
                                }
                            </div>
                            <div className="gr-body mb-5 py-1 d-flex gap-2">
                                {
                                    subLst.filter((el)=>el.packId === item.id).map((subItem, idx)=>{
                                        return <div key={idx} 
                                                    className={`subPack p-2 
                                                        ${(selSub.pack === item.id && selSub.sub === subItem.id) && "selected"}
                                                    `}  
                                                    data-bs-toggle="tooltip" 
                                                    data-bs-placement="top" 
                                                    title={subItem.title}
                                                    onClick={()=>setSelectedSub(item.id, subItem.id)} 
                                            >
                                            <img src={subItem.img ? `/assets/sub/${subItem.img}` : `/assets/money.png`} 
                                                className="img-fluid rounded float-start" 
                                                alt={subItem.title}
                                            />
                                        </div>
                                    })
                                }

                                <div key={-1} 
                                    className={`subPack addItem p-2`}  
                                    onClick={()=>handleShowModal(item.id)} 
                                >
                                    <img src={`/assets/add-new.png`} className="img-fluid rounded float-start" 
                                            alt=""/>
                                </div>

                            </div>
                        </div>
                    })
            }
            </div>
        </div>
        {/* Modal Add new sub */}
        <Modal show={openModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
            <Modal.Title>Thêm khoản chi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    {newsubform &&
                    <Form id="newsubform" onSubmit={handleSaveSubForm}>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" 
                                name="title"
                                value={newsubform.title}
                                onChange={handleChangeSubForm} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formImage" 
                                
                        >
                            <Form.Label>Image</Form.Label>
                            <div className="d-flex gap-2">
                                <Form.Control name="img" type="text" 
                                    value={newsubform.img}
                                    onChange={handleChangeSubForm} />
                                <button type="button" className="btn btn-light">...</button>
                            </div>
                        </Form.Group>
                    </Form>}
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={handleCloseModal}>
                    Close
                </Button>
                <Button variant="dark" type="submit" form="newsubform">
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}




