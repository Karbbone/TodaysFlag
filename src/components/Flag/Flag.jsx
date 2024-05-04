import { useEffect, useRef, useState } from "react";
import getDominantColor from "../../utils/DominantColor";
import PropTypes from "prop-types";
function Flag(props) {
  const [flagColor, setFlagColor] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = props.flagUrl;

    img.onload = () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const dominantColor = getDominantColor(imageData);
      setFlagColor(dominantColor);
    };

    img.onerror = (e) => {
      console.error("Erreur lors du chargement de l'image:", e);
    };
  }, [props.flagUrl]);

  const boxShadow = flagColor
    ? `0 0 50px 1px rgba(${flagColor[0]}, ${flagColor[1]}, ${flagColor[2]}, 0.8)`
    : "";

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={100}
        height={100}
        style={{ display: "none" }}
      />
      <img id="flag" alt="Flag" src={props.flagUrl} style={{ boxShadow }} />
    </div>
  );
}
Flag.propTypes = {
  flagUrl: PropTypes.string.isRequired,
};
export default Flag;
