import { useEffect, useRef, useState } from "react";
import Menu from "./Components/Menu";
import Signup from '../src/pages/signup.jsx'; // Create a Signup component
import Login from '../src/pages/login.jsx';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState("#000000");
  const [lineOpacity, setLineOpacity] = useState(1);
  const [shape, setShape] = useState("brush");
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctx.globalAlpha = lineOpacity;
    ctxRef.current = ctx;
  }, [lineColor, lineOpacity, lineWidth]);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    setStartPos({ x: offsetX, y: offsetY });
    if (shape === "brush") {
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(offsetX, offsetY);
    }
    setIsDrawing(true);
  };

  const endDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (!isDrawing) return;

    if (shape === "line") {
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(startPos.x, startPos.y);
      ctxRef.current.lineTo(offsetX, offsetY);
      ctxRef.current.stroke();
      ctxRef.current.closePath();
    } else if (shape === "rect") {
      const width = offsetX - startPos.x;
      const height = offsetY - startPos.y;
      ctxRef.current.strokeRect(startPos.x, startPos.y, width, height);
    } else if (shape === "circle") {
      const radius = Math.sqrt(
        Math.pow(offsetX - startPos.x, 2) + Math.pow(offsetY - startPos.y, 2)
      );
      ctxRef.current.beginPath();
      ctxRef.current.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
      ctxRef.current.stroke();
      ctxRef.current.closePath();
    }

    setIsDrawing(false);
  };

  const draw = (e) => {
    if (!isDrawing || shape !== "brush") return;
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
    toast.info("Canvas cleared");
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = canvas.toDataURL();
    link.click();
    toast.success("Drawing saved!");
  };


  return (
      <Router>
        {/* Navbar */}
        <nav className="bg-gray-800 text-white p-4">
          <ul className="flex space-x-4 justify-end">
            <li>
              <Link to="/signup" className="hover:text-gray-300">Sign Up</Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
            </li>
          </ul>
        </nav>
    
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
    
          {/* Canvas and Menu only on the root ("/") route */}
          <Route path="/" element={
            <>
              <Menu
                setLineColor={setLineColor}
                setLineWidth={setLineWidth}
                setLineOpacity={setLineOpacity}
                shape={shape}
                setShape={setShape}
                clearCanvas={clearCanvas}
                saveCanvas={saveCanvas}
              />
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseUp={endDrawing}
                onMouseMove={draw}
                onTouchStart={(e) => startDrawing({ nativeEvent: e.touches[0] })}
                onTouchMove={(e) => draw({ nativeEvent: e.touches[0] })}
                onTouchEnd={(e) => endDrawing({ nativeEvent: e.changedTouches[0] })}
                className="canvas"
              />
              <ToastContainer />
            </>
          } />
        </Routes>
      </Router>
  );
}

export default App;
