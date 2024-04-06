function Flag(props) {
  return (
    <div className="img">
      <img
        alt="Flag"
        // eslint-disable-next-line react/prop-types
        src={props.flagUrl}
      />
    </div>
  );
}
export default Flag;
