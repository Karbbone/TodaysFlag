function Flag(props) {
  return (
    <div className="img">
      <img
        alt="Flag"
        className="flag"
        // eslint-disable-next-line react/prop-types
        src={props.flagUrl}
      />
    </div>
  );
}
export default Flag;
