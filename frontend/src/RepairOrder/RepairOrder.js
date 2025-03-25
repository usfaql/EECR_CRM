import React, { useEffect, useState } from 'react'
import {useNavigate } from "react-router-dom";
import axios from "axios"
import "./style.css"
function RepairOrder() {
    const navigate = useNavigate();
    const [activeOrders, setActiveOrders] = useState(0);
    const [pendingDiagnosis, setPendingDiagnosis] = useState(0);
    const [completedToday, setCompletedToday] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [dataOrders, setDataOrders] = useState([]);
    
    useEffect(()=>{
        axios.get("http://localhost:5000/repair-orders").then((result)=>{
            setDataOrders(result.data.orders);
        }).catch((err)=>{
            console.log(err);
        });
        
    },[]);

    useEffect(()=>{
            calculateData();
    },[dataOrders]);
    
    const calculateData = () => {

        let activeCount = 0;
        let pendingCount = 0;
        let completedTodayCount = 0;
        const today = new Date().toLocaleDateString('en-GB');
        dataOrders.forEach(order => {
            const formattedDate = new Date(order.estimatedCompletion).toLocaleDateString('en-GB');            
            if (order.status === "In Progress") {
                activeCount++;
            }

            if (order.status === "Pending") {
                pendingCount++;
            }

            if (order.status === "Completed" && formattedDate === today) {
                completedTodayCount++;
            }
        });        
        setActiveOrders(activeCount);
        setPendingDiagnosis(pendingCount);
        setCompletedToday(completedTodayCount);
    };



  return (
    <div className='container-repair-orders'>

        <div className='container-head-order'>
            <div className='title-page'>Repair Orders</div>
            <div className='create-button' onClick={()=> navigate("/order/new")}>+ New Order</div>
        </div>

        <div className='container-info-orders'>
            <div className='container-card-info-orders'>
                <div className='title-info'>Active Orders</div>
                <div className='number-info'>{activeOrders}</div>
            </div>

            <div className='container-card-info-orders'>
                <div className='title-info'>Pending Diagnosis</div>
                <div className='number-info'>{pendingDiagnosis}</div>
            </div>

            <div className='container-card-info-orders'>
                <div className='title-info'>Completed Today</div>
                <div className='number-info'>{completedToday}</div>

            </div>

            <div className='container-card-info-orders'>
                <div className='title-info'>Total Revenue</div>
                <div className='number-info'>$450</div>


            </div>
        </div>
        

        <div className='container-data-orders'>
            <div className='title-table'>
                Recent Orders
            </div>



            <table className='table-info'>
                <tr>
                    <th>ORDER ID</th>
                    <th>VEHICLE</th>
                    <th>CUSTOMER</th>
                    <th>SERVICE</th>
                    <th>STATUS</th>
                    <th>DATE</th>
                    <th>ACTION</th>
                </tr>
                {dataOrders.map((e,i)=>{
                    return (
                    <tr>
                        <td className='order-id'>{e.plateNumber}</td>
                        <td className='vehicle-data'>{e.carMake +" "+ e.carModel +" " + e.year + " " + e.color}</td>
                        <td> 
                            <div>
                                <div>{e.ownerName}</div>
                                <div className='phone'>{e.phoneNumber}</div>
                            </div>
                            
                            </td>
                        <td className='vehicle-data'>{e.issueDescription}</td>
                        <td>
                            <div className={e.status === "Completed" ? "completed" : e.status === "In Progress" ? "progress" : "pending"}>
                                {e.status}
                            </div>
                            </td>
                        <td>{new Date(e.estimatedCompletion).toLocaleDateString('en-GB')}</td>
                        <td >
                            <span className='view-btn' onClick={()=> navigate(`/order/${e.vin}`)}>View</span></td>
                    </tr>
                    )
                })}

            </table>
            
        </div>


    </div>
  )
}

export default RepairOrder