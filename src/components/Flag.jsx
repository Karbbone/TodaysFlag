function Flag(props){
    return(
        // eslint-disable-next-line react/prop-types
        <img alt='Flag' className="flag" style={{ height: "250px", width: "400px" }} src={props.flagUrl}></img>
    )
}
export default Flag;