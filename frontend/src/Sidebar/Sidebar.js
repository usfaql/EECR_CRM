import React, { useState } from 'react'
import "./style.css"
import { MdSpaceDashboard ,MdPerson , MdDirectionsCar,MdAnalytics, MdWork } from "react-icons/md";
import { AiFillTool } from "react-icons/ai";


function Sidebar() {
    const [selected, setSelected] = useState("dashboard");
    

  return (
    <div className='sidebar'>
        <div className='title'>EECR</div>
        <lu className="list-sidebar">
            <div className={selected === "dashboard" ? "side-btn-selected" : "side-btn"} onClick={()=> setSelected("dashboard")}>
            <MdSpaceDashboard size={25}/>
            <li >Dashboard</li> 
            </div>
           <div className={selected === "Repair Orders" ? "side-btn-selected" : "side-btn"} onClick={()=> setSelected("Repair Orders")}>
           <AiFillTool size={25}/>
           <li>Repair Orders</li> 
           </div>
           <div className={selected === "Vehicles" ? "side-btn-selected" : "side-btn"} onClick={()=> setSelected("Vehicles")}>
           <MdDirectionsCar size={25}/>
           <li >Vehicles</li> 
           </div>
           <div className={selected === "Customers" ? "side-btn-selected" : "side-btn"} onClick={()=> setSelected("Customers")}>
           <MdPerson size={25} />
           <li>Customers</li> 
           </div>
           <div className={selected === "Analytics" ? "side-btn-selected" : "side-btn"} onClick={()=> setSelected("Analytics")}>
           <MdAnalytics size={25} />
           <li >Analytics</li>
           </div>
           <div className={selected === "Employees" ? "side-btn-selected" : "side-btn"} onClick={()=> setSelected("Employees")}>
           <MdWork size={25}/>
           <li>Employees</li> 
           </div>

        </lu>
    </div>
  )
}

export default Sidebar