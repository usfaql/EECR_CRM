import React from "react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

const ProgressBar = ({ progress, markProgress }) => {
  
  return (
    <div style={{ display: "flex", flexDirection:"column", alignItems: "center", width: "100%", marginTop:"10px" }}>
      <div style={{ position: "relative", width: "100%", height: "8px", background: "#ddd", borderRadius: "5px" }}>
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: `${markProgress === "Need_Attention" ? "red" : markProgress === "Finish" ? "#006b00" : "blue"}`,
            borderRadius: "5px",
            transition: "width 0.3s ease-in-out",

          }}
        >
            
        </div>
      </div>

  
      <div style={{ display: "flex", width: "100%" ,alignItems: "center", justifyContent:"space-between"}}>
        <Step label="Received" status={getStatus(progress, 0)} />
        <Step label="In Diagnosis" status={getStatus(progress, 25, markProgress)}/>
        <Step label="In Repair" status={getStatus(progress, 50, markProgress)} />
        <Step label="Need Attention" status={getStatus(progress, 75, markProgress)} />
        <Step label="Completed" status={getStatus(progress, 100 , markProgress)} />
      
      </div>
    </div>
  );
};

const Step = ({ label, status }) => {      
    const colors = {
      completed: "blue",
      current: "orange",
      pending: "#ccc",
      problem : "#ff0000",
      finish : "#006b00"
    };
  
    return (
      <div style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}>
        {status === "completed" ?
        <IoCheckmarkCircleSharp color= {colors[status]}/>
        : 
        <div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: colors[status],
        }}
      >
          
      </div>
        }

        <span style={{ marginLeft: "5px", fontSize: "12px", color: status !== "pending" ? "black" : "#999" }}>{label}</span>
      </div>
    );
  };
  

  const getStatus = (progress, threshold, markProgress) => {
    if (progress === 100) return "finish"; 

    // تحقق من حالة إكمال التشخيص فقط عند العتبة الصحيحة
    if (progress === threshold && markProgress === "Diagnosed" && threshold === 25) {
        return "completed";
    }

    // تحقق من حالة إصلاح المشكلة فقط عند العتبة الصحيحة
    if (progress === threshold && markProgress === "Repaired" && threshold === 50) {
        return "completed";
    }

    // إذا تم حل المشكلة، ضع الحالة على "problem"
    if (progress === threshold && markProgress === "Need_Attention" && threshold === 75) {
        return "problem";
    }

    // تأكد من أن المراحل تسير بشكل صحيح
    if (progress >= threshold && progress < threshold + 25) {
        return "current";
    }

    return "pending"; 
};



export default ProgressBar;
