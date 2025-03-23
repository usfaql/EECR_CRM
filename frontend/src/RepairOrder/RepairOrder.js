import React from 'react'
import "./style.css"
function RepairOrder() {



    const RepairOrderArray = [
        {
            "repairId": "RO-2025001",
            "vehicle": "Hyundai Sonata 2017 Red",
            "customer": "Yousef Abuaqel",
            "phoneNumber": "0789991280",
            "service": "Check Engine",
            "status": "In Progress",
            "date": "JAN 15, 2025"
        },
        {
            "repairId": "RO-2025002",
            "vehicle": "Toyota Corolla 2020 White",
            "customer": "Ahmad Saleh",
            "phoneNumber": "0791234567",
            "service": "Oil Change",
            "status": "Completed",
            "date": "FEB 02, 2025"
        },
        {
            "repairId": "RO-2025003",
            "vehicle": "Honda Civic 2018 Blue",
            "customer": "Mohammad Ali",
            "phoneNumber": "0779876543",
            "service": "Brake Replacement",
            "status": "Pending",
            "date": "MAR 10, 2025"
        },
        {
            "repairId": "RO-2025004",
            "vehicle": "Ford Focus 2019 Black",
            "customer": "Sara Khalid",
            "phoneNumber": "0783456789",
            "service": "Battery Replacement",
            "status": "In Progress",
            "date": "APR 05, 2025"
        },
        {
            "repairId": "RO-2025005",
            "vehicle": "Nissan Altima 2021 Silver",
            "customer": "Omar Hassan",
            "phoneNumber": "0798765432",
            "service": "Tire Alignment",
            "status": "Completed",
            "date": "MAY 22, 2025"
        },
        {
            "repairId": "RO-2025006",
            "vehicle": "Chevrolet Malibu 2016 Gray",
            "customer": "Layla Ahmad",
            "phoneNumber": "0772233445",
            "service": "Transmission Repair",
            "status": "Pending",
            "date": "JUN 18, 2025"
        }
    ];


    


  return (
    <div className='container-repair-orders'>

        <div className='container-head-order'>
            <div className='title-page'>Repair Orders</div>
            <div className='create-button'>+ New Order</div>
        </div>

        <div className='container-info-orders'>
            <div className='container-card-info-orders'>
                <div className='title-info'>Active Orders</div>
                <div className='number-info'>5</div>
            </div>

            <div className='container-card-info-orders'>
                <div className='title-info'>Pending Diagnosis</div>
                <div className='number-info'>2</div>
            </div>

            <div className='container-card-info-orders'>
                <div className='title-info'>Completed Today</div>
                <div className='number-info'>9</div>

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
                {RepairOrderArray.map((e,i)=>{
                    return (
                    <tr>
                        <td className='order-id'>{e.repairId}</td>
                        <td className='vehicle-data'>{e.vehicle}</td>
                        <td> 
                            <div>
                                <div>{e.customer}</div>
                                <div className='phone'>{e.phoneNumber}</div>
                            </div>
                            
                            </td>
                        <td className='vehicle-data'>{e.service}</td>
                        <td>
                            <div className={e.status === "Completed" ? "completed" : e.status === "In Progress" ? "progress" : "pending"}>
                                {e.status}
                            </div>
                            </td>
                        <td>{e.date}</td>
                        <td >
                            <span className='view-btn'>View</span></td>
                    </tr>
                    )
                })}

            </table>
            
        </div>


    </div>
  )
}

export default RepairOrder