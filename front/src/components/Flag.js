import React from "react";
function Flag(props){
    return(
        <img alt='Flag' className="flag" style={{ height: "250px", width: "400px" }} src={props.flagUrl}></img>
    )
}
export default Flag;