import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios"
import "./style.css"

function Vehicles() {
    const navigate = useNavigate();
    const [activeOrders, setActiveOrders] = useState(0);
    const [pendingDiagnosis, setPendingDiagnosis] = useState(0);
    const [completedToday, setCompletedToday] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [vehicles, setVehicles] = useState([]);
    
    useEffect(()=>{
        axios.get("http://localhost:5000/vehicles").then((result)=>{
            console.log(result);
            setVehicles(result.data);
        }).catch((err)=>{
            console.log(err);
        });
        
    },[]);





  return (
    <div className='container-repair-orders'>

        <div className='container-head-order'>
            <div className='title-page'>Vehicles</div>
        </div>

        

        <div className='container-data-orders'>




            <table className='table-info'>
                <tr>
                    <th>ID</th>
                    <th>CAR MAKE</th>
                    <th>CAR MODEL</th>
                    <th>YEAR</th>
                    <th>COLOR</th>
                    <th>PLATE NUMBER</th>
                    <th>VIN</th>
                    <th>OWNER</th>
                    <th>FIRST VISIT</th>
                </tr>
                {vehicles.map((e,i)=>{
                    return (
                    <tr>
                        <td className='order-id'>{e._id.slice(-4)}</td>
                        <td className='vehicle-data'>{e.carMake}</td>
                        <td className='order-id'>{e.carModel}</td>
                        <td className='order-id'>{e.year}</td>
                        <td className='order-id'>{e.color}</td>
                        <td className='order-id'>{e.plateNumber}</td>
                        <td className='order-id'>{e.vin}</td>
                        <td>
                            <div>
                                <div>{e.owner.firstName} {e.owner.lastName}</div>
                                <div className='phone'>{e.owner.phoneNumber}</div>
                            </div>
                        </td>

                        <td>{new Date(e.createdAt).toLocaleDateString('en-GB')}</td>
                    </tr>
                    )
                })}

            </table>
            
        </div>


    </div>
  )
}

export default Vehicles