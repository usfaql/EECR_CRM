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

    const [showTechnicianDropdown, setShowTechnicianDropdown] = useState(false);
    const [selectedTechnicians, setSelectedTechnicians] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:5000/repair-orders/vin/${vinID}`).then((result) => {
            console.log("Data =>", result.data.repairOrder);
            
            setRepairOrderData(result.data.repairOrder);
            setNextStep(result.data.repairOrder.status);
            setOrderID(result.data.repairOrder._id);
            setSelectedTechnicians(result.data.repairOrder.assignedTechnicians);
            console.log('result.data.repairOrder.assignedTechnicians =>', result.data.repairOrder.assignedTechnicians);
            
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

    const addAndRemoveTechnicians = (newTechnicians) => {
        const newTechnicianId = newTechnicians._id;
        const exists = selectedTechnicians.some(obj => obj.technicianId._id === newTechnicianId);
        if (!exists) {
            selectedTechnicians.push({ technicianId: newTechnicians });
        } else {
            // Remove the technician
            const index = selectedTechnicians.findIndex(obj => obj.technicianId._id === newTechnicianId);
            selectedTechnicians.splice(index, 1);
        }
    };

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

    const updateTechnicians = async (newTechnicians) => {
        addAndRemoveTechnicians(newTechnicians);
        try {
            const response = await axios.put(`http://localhost:5000/repair-orders/${repairOrderData._id}/assignedTechnicians`, {
                technicians: newTechnicians,
            });
            setShowTechnicianDropdown(false);
            console.log("Technicians updated successfully:", response.data);
        } catch (error) {
            console.error("Error updating technicians:", error);
        }
    };

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
                    <div style={{color:"red"}}>{repairOrderData?.issueDescription}</div>
                </div>
                <div className='info-vehicle'>
                    <div className='title-order-info'>Make/Model</div>
                    <div>{repairOrderData?.vehicle.carMake} {repairOrderData?.vehicle.carModel} {repairOrderData?.vehicle.year}</div>
                </div>
                
                <div className='info-vehicle'>
                    <div className='title-order-info'>License Plate</div>
                    <div>{repairOrderData?.vehicle.plateNumber}</div>
                </div>
                
                <div className='info-vehicle'>
                    <div className='title-order-info'>VIN</div>
                    <div>{repairOrderData?.vehicle.vin}</div>
                </div>
            </div>
            

            <div className='container-customer-info'>
                <div className='title-order-info'>Customer Information</div>

                <div className='info-customer'>
                    <div className='container-name-image'>
                        <RxAvatar size={50}/>
                        <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                            <div style={{fontWeight:"bold"}}>{repairOrderData?.vehicle.owner.firstName} {repairOrderData?.vehicle.owner.lastName}</div>
                            <div className='title-order-info'>Owner</div>
                        </div>
                        
                    </div>
                    

                    <div className='container-phone'>
                    <FaPhoneAlt/>
                    <div>{repairOrderData?.vehicle.owner.phoneNumber}</div>
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

                        {repairOrderData?.length > 0 ? repairOrderData?.diagnosis.map((e,i)=>{
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
                        }) : <div className='issues-card-medium' style={{fontWeight:"bold", display:"inline", textAlign:"center"}}> <IoAlert size={20} color='orange' /> Not yet diagnosed</div>}

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
                    <div style={{display :"flex", justifyContent:"space-between"}}>
                        <div className='title-card'>Assigned Technician</div>
                        <button 
                            className="dropdown-toggle" 
                            onClick={() => setShowTechnicianDropdown(prev => !prev)}
                        >
                            ▼
                        </button>
                    </div>
                    
                    <div className='container-technician'>
                        {selectedTechnicians?.length > 0 ? selectedTechnicians?.map((e,i)=>{
                            console.log(selectedTechnicians);
                            
                            return(
                                <div style={{display:"flex", gap:"5px", alignItems:"center"}}>
                                <img src={e.technicianId.image} style={{width:"48px", borderRadius:"50%", border:"2px solid #0077ff"}} />
                                <div>
                                    <div className='employee-name'>
                                         {e.technicianId.FirstName+ " " +e.technicianId.LastName}
                                    </div>
                                    <div className='position'>{e.technicianId.role}</div>
                                </div>
                                </div>
                            )
                        }) : "No technician assigned" }
                    </div>
                </div>
            
            
            
                {showTechnicianDropdown && (
                    <div className='technician-dropdown'>
                        <div className='title-dropdown'>Select Employee</div>
                        <ul>
                            {techniciansList.map(tech => (
                                <>
                                <li key={tech._id} onClick={() => updateTechnicians(tech)}>
                                    <img src={tech.image} style={{width:"48px", borderRadius:"50%", border:"2px solid #0077ff"}}  />
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <div>{tech.FirstName} {tech.LastName}</div>
                                        <div style={{fontWeight:"normal", color:"gray"}}>{tech.role}</div>
                                    </div>
                                    {selectedTechnicians.some(t => t.technicianId === tech._id) && <span>✓</span>}
                                </li>
                                </>
                            ))}
                        </ul>
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