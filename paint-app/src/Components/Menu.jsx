import React from "react";
import { FaEraser, FaDownload, FaPaintBrush } from "react-icons/fa";
import { MdOutlineRadioButtonChecked, MdRectangle, MdShowChart } from "react-icons/md";
import "../App.css";

const Menu = ({
  setLineColor,
  setLineWidth,
  setLineOpacity,
  shape,
  setShape,
  clearCanvas,
  saveCanvas,
}) => {
  return (
    <div className="Menu">
      <div className="control">
        <label>Color</label>
        <input type="color" onChange={(e) => setLineColor(e.target.value)} />
      </div>

      <div className="control">
        <label>Width</label>
        <input
          type="range"
          min="1"
          max="50"
          onChange={(e) => setLineWidth(e.target.value)}
        />
      </div>

      <div className="control">
        <label>Opacity</label>
        <input
          type="range"
          min="1"
          max="100"
          onChange={(e) => setLineOpacity(e.target.value / 100)}
        />
      </div>

      <div className="buttons">
        <button onClick={() => setShape("brush")}>
          <FaPaintBrush /> Brush
        </button>
        <button onClick={() => setShape("line")}>
          <MdShowChart /> Line
        </button>
        <button onClick={() => setShape("rect")}>
          <MdRectangle /> Rect
        </button>
        <button onClick={() => setShape("circle")}>
          <MdOutlineRadioButtonChecked /> Circle
        </button>
        <button onClick={clearCanvas}>
          <FaEraser /> Clear
        </button>
        <button onClick={saveCanvas}>
          <FaDownload /> Save
        </button>
      </div>
    </div>
  );
};

export default Menu;
