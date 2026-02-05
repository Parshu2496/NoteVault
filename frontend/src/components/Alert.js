import React from "react";
function Alert(props) {
    const capitalize=(str)=>{
        const lower = str.toLowerCase()
        return lower.charAt(0).toUpperCase()+ lower.slice(1);
    }
  return (
    <div className = "sticky-top" style = {{height:'10px'}}>
     {props.alert && <div>
      <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
            <strong>{capitalize(props.alert.type)}</strong> {props.alert.msg}
      </div>
    </div>}
    </div>
  );
}

export default Alert;