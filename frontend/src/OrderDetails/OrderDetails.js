import React, { useEffect, useState } from 'react'
import "./style.css"
import ProgressBar from '../ProgressBar/ProgressBar';
import { FaPhoneAlt } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { RiAlertFill } from "react-icons/ri";
import { IoAlert } from "react-icons/io5";
import { ImUpload3 } from "react-icons/im";
import { FaImage } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa6";
import axios from 'axios';
import { useParams } from 'react-router-dom';


function OrderDetails() {
    const {vinID} = useParams();
    const [orderID, setOrderID] = useState("");
    const [repairOrderData, setRepairOrderData] = useState(null);
    const [progress, setProgress] = useState(0);
    const [markProgress, setMarkProgress] = useState("");
    const [nextStep, setNextStep] = useState('');
    const [markButton, setMarkButton] = useState("Loading...");
    const [techniciansList, setTechniciansList] = useState([]);
    const [selectedTechnicians, setSelectedTechnicians] = useState(repairOrderData?.assignedTechnicians || []);
    const [showTechnicianModal, setShowTechnicianModal] = useState(false);

    useEffect(()=>{
        axios.get(`http://localhost:5000/repair-orders/vin/${vinID}`).then((result) => {
            console.log("Data =>", result.data.repairOrder);
            
            setRepairOrderData(result.data.repairOrder);
            setNextStep(result.data.repairOrder.status);
            setOrderID(result.data.repairOrder._id);
        }).catch((err) => {
            console.log(err);
            
        });

        axios.get('http://localhost:5000/employees') 
                .then(response => {
                    setTechniciansList(response.data);
                    console.log("Employees =>", response);
                    
                })
                .catch(error => console.error('Error fetching technicians', error));

    },[]);


    useEffect(() => {
        if (nextStep === "received") {
            setProgress(1); 
            setMarkButton("Start Diagnosis");

        } else if (nextStep === "In Diagnosis") {
            setProgress(25); 
            setMarkButton("Mark Diagnosed");

        }else if(nextStep === "Diagnosed"){
            setMarkProgress("Diagnosed");
            setMarkButton("Start Repair");
            setProgress(25); 
        }else if (nextStep === "In Repair") {
            setProgress(50); 
            setMarkButton("Mark Repaired");
        }else if(nextStep === "Repaired"){
            setProgress(50); 
            setMarkProgress("Repaired");
            setMarkButton("Finish");

        }else if(nextStep === "Need Attention"){
            setMarkButton("Finish");
            setMarkProgress("Need_Attention")
            setProgress(75)
        }else if (nextStep === "Finish") {
            setMarkProgress("Finish");
            setMarkButton("Finish");
            setProgress(100); 
        }
    }, [nextStep]);
        
        
    const handleTechnicianSelection = (e) => {
        const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedTechnicians(selectedValues);
    };

    const updateTechnicians = () => {
        console.log("selectedTechnicians =>", selectedTechnicians);
        
        axios.put(`http://localhost:5000/repair-orders/${repairOrderData._id}/assignedTechnicians`, { technicians: selectedTechnicians })
            .then(response => {
                console.log('Technicians updated successfully');
            })
            .catch(error => console.error('Error updating technicians', error));
    };
    


    const MarkButtonFnc = () => {
        if (markButton === "Start Diagnosis" && progress === 1) {
            setNextStep("In Diagnosis"); 
        } else if (markButton === "Mark Diagnosed" && progress === 25) {
            setNextStep("Diagnosed");
        } else if (markButton === "Start Repair" && progress === 25) {
            setNextStep("In Repair"); 
        } else if (markButton === "Mark Repaired" && progress === 50) {
            setNextStep("Repaired"); 
        }else if (markButton === "Finish" && (progress === 75 || progress === 50)) {
            setNextStep("Finish");
        }
    };

    const markAta =()=>{
        if(nextStep !== "Finish"){
            setNextStep("Need Attention");
        }
    }


    useEffect(() => {
        if (nextStep && orderID) {
            axios.put(`http://localhost:5000/repair-orders/${orderID}/status`, { status: nextStep })
                .then((result) => console.log("Status updated:", result))
                .catch((err) => console.error("Error updating status:", err));
        }
    }, [nextStep, orderID]);


    const stepClasses = {
        "received": "received",
        "In Diagnosis" : "in-diagnosis",
        "Diagnosed": "Diagnosed",
        "In Repair": "in-repair",
        "Repaired" : "repaired",
        "Need Attention": "attention",
        "Finish": "completed",
        "default": "pending"
    };
    const currentClass = stepClasses[nextStep] || stepClasses["default"];
  return (
    <div className='container-repair-details'>

        <div className='card-info'>
            <div className='head-repair-order'>
            <div className='title-repair-order'>Repair Order #RO-2025-0123</div>
            <div className='container-head-button'>
                <div className={nextStep === "Finish" ? 'send-update-button-hidden' : 'send-update-button'} onClick={()=> {markAta()}} >Need Attention</div>
                <div className={nextStep === "Finish" ? 'send-update-button-disabled' : 'mark-button'} onClick={()=>MarkButtonFnc()}>{markButton}</div>
            </div>
            </div>

            <div className='status-date'>
            <div className={currentClass}>{nextStep}</div>
            <div className='date-order'>Created: 12/03/2025</div>
            </div>

            <div>
            <ProgressBar progress={progress} markProgress={markProgress}/>
            </div>

            <div className='container-info'>
            <div className='container-vehicle-info'>
                <div className='title-order-info'>vehicle Information</div>
                
                <div className='info-vehicle'>
                    <div className='title-order-info'>issue Description</div>
                    <div>{repairOrderData?.issueDescription}</div>
                </div>
                <div className='info-vehicle'>
                    <div className='title-order-info'>Make/Model</div>
                    <div>{repairOrderData?.carMake} {repairOrderData?.carModel} {repairOrderData?.year}</div>
                </div>
                
                <div className='info-vehicle'>
                    <div className='title-order-info'>License Plate</div>
                    <div>{repairOrderData?.plateNumber}</div>
                </div>
                
                <div className='info-vehicle'>
                    <div className='title-order-info'>VIN</div>
                    <div>{repairOrderData?.vin}</div>
                </div>
            </div>
            

            <div className='container-customer-info'>
                <div className='title-order-info'>Customer Information</div>

                <div className='info-customer'>
                    <div className='container-name-image'>
                        <RxAvatar size={50}/>
                        <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                            <div style={{fontWeight:"bold"}}>{repairOrderData?.ownerName}</div>
                            <div className='title-order-info'>Owner</div>
                        </div>
                        
                    </div>
                    

                    <div className='container-phone'>
                    <FaPhoneAlt/>
                    <div>{repairOrderData?.phoneNumber}</div>
                    </div>
                    
                </div>
            </div>

            </div>
        </div>

        <div className='container-diagnostic-document'>
            <div className='container-diagnostic-estimate'>
                <div className='card-diagnostic'>
                    <div className='title-card'>
                        Diagnosis & issues
                    </div>
                    <div className='container-card-issue'>

                        {repairOrderData?.diagnosis.map((e,i)=>{
                            return(<>
                                <div className='issues-card-high'>
                                    <div style={{display:"flex", alignItems:"center", gap:"5px"}}>
                                    <RiAlertFill size={20} color='rgb(187,0,0)'/>
                                    <div className='title-issue-high'>{e}</div>
                                    <div className='high-priority'>High Priority</div>
                                    </div>
                                    <div className='description-issue-high'>Front Brake Pads worn below minimum</div>
                                </div>
                            </>)
                        })}

                        {/*
                        <div className='issues-card-medium'>
                            <div style={{display:"flex", alignItems:"center", gap:"5px"}}>
                                <IoAlert size={20} color='orange'/>
                                <div className='title-issue-medium'>Brake System Issue</div>
                                <div className='medium-priority'>Medium Priority</div>
                            </div>
                            <div className='description-issue-medium'>Front Brake Pads worn below minimum</div>
                        </div>
                        */}
                    </div>
                </div>

                <div className='card-repair-estimate'>
                    <div className='title-card'>
                        Repair Estimate
                    </div>

                    <table className='table-repair-estimate'>
                        <tr>
                            <th>Item</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>unit Price</th>
                            <th>Amount</th>
                        </tr>
                        {repairOrderData?.partsRequired.map((e,i)=>{
                            return(
                            <tr>
                                <td>{e.partName}</td>
                                <td>{e.description}</td>
                                <td>{e.quantity}</td>
                                <td>{e.unitPrice}</td>
                                <td>${e.quantity * e.unitPrice}</td>
                            </tr>
                            )})}
                        <tr>
                            <td>Total</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>${repairOrderData?.partsRequired.reduce((acc, e) => acc + e.totalCost, 0)}</td>
                        </tr>
                    </table>


                    <div className='container-print-btn'>
                        <div className='print-btn'>
                            Print Invoice
                        </div>
                    </div>
                    
                </div>
            </div>

            <div className='container-technician-documents'>
                <div className='card-assigned-technician'>
                    <div className='title-card'>Assigned Technician</div>
                    <div className='container-technician' onClick={() => setShowTechnicianModal(true)}>
                <RxAvatar size={48} />
                <div>
                    <div className='employee-name'>{repairOrderData?.assignedTechnicians?.map(t => t.technicianName).join(', ')}</div>
                    <div className='position'>Supervisor</div>
                </div>
            </div>
                </div>
            {showTechnicianModal && (
                <div className='technician-modal'>
                    <div className='modal-header'>
                        <h3>Select Technicians</h3>
                        <button onClick={() => setShowTechnicianModal(false)}>Close</button>
                    </div>
                    <div className='modal-body'>
                    <select
                        value={selectedTechnicians}
                        onChange={handleTechnicianSelection} 
                        multiple  
                        className="technician-select"
                    >
                        {techniciansList.map(tech => (
                            <option key={tech._id} value={tech._id}>
                                <div style={{'display':"flex", "flexDirection": "column"}}>
                                    <div>{tech.FirstName} {tech.LastName}</div>
                                    <div>{tech.role}</div>
                                </div>
                            </option>
                        ))}
                    </select>

                    </div>
                    <div className='modal-footer'>
                        <button onClick={updateTechnicians}>Save</button>
                    </div>
                </div>
            )}

                <div className='card-documents'>
                    <div className='title-card'>Documents</div>
                    
                    <div className='documents-btn'>
                        <FaRegFilePdf/>
                        <div>diagnostic Report.pdf</div>
                    </div>

                    <div className='documents-btn'>
                        <FaImage/>
                        <div>Brake inspection.jpg</div>
                    </div>
                    <div className='upload-btn'>
                        <ImUpload3/>
                        <div>Upload Document</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OrderDetails