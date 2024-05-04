import PropTypes from "prop-types";
function DecorativeFlag(props) {
  return (
    <img
      className={`rotated-image ${props.flagNum}`}
      alt="Flag"
      src={props.flagUrl}
    />
  );
}
DecorativeFlag.propTypes = {
  flagUrl: PropTypes.string.isRequired,
  flagNum: PropTypes.string.isRequired,
};
export default DecorativeFlag;
