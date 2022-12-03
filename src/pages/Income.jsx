import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { storeData } from "../data/storeData";
import { packService } from "../service/pack.service";

const Init_Form = {
    title: '',
    img: '',
    amount: 0
}

export default function Income() {

    // State, Effect
    const [packLst, setPackLst] = useState()
    const [subLst, setSubLst] = useState([])
    const [selSub, setSelSub] = useState({
        pack : 0, sub : 0
    })
    const [openModal, setOpenModal] = useState(false)

    
    const [newsubform , setNewsubform] = useState(Init_Form)

    useEffect(()=>{
        setPackLst(storeData);
    },[])

    useEffect(()=>{
        if(packLst){ 
            let subs = packService.fetchSubs();
            console.log("Fetch subs: " + JSON.stringify(subs))
            setSubLst(subs);
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
        {/* Income */}
        <div className="income mt-5">
        {/* {JSON.stringify(packLst?.list?.find((item)=>item.id === selSub.pack))} */}
        {
            packLst?.map((item, idx)=>{
                return <div className="group" key={idx}>
                        <div className="gr-name my-2 d-flex justify-item-content align-items-center">
                            <img width="42px" src={`/assets/pack/${item.img}`} alt=""/>
                            <h5 className="mb-0 ms-2">{item.title}</h5>
                        </div>
                        <div className="gr-body mb-5 d-flex gap-2">

                        <div key={-1} 
                            className={`subPack addItem p-2`}  
                            onClick={()=>handleShowModal(item.id)} 
                        >
                            <img src={`/assets/add-new.png`} className="img-fluid rounded float-start" 
                                    alt=""/>
                        </div>

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
                        </div>
                    </div>
                })
        }
        </div>
        {/* Modal Add new sub */}
        <Modal show={openModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
            <Modal.Title>Thêm khoản chi</Modal.Title>
            </Modal.Header>
            <Modal.Body>

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
                    <Form.Group className="mb-3" controlId="formAmount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control name="amount" type="number"  
                            value={newsubform.amount}
                            onChange={handleChangeSubForm} />
                    </Form.Group>
                </Form>
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




