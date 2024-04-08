function Flag(props) {
  return (
    <div>
      <img
        alt="Flag"
        // eslint-disable-next-line react/prop-types
        src={props.flagUrl}
      />
    </div>
  );
}
export default Flag;
