import { useEffect } from "react";
import Atom from "../Atom/Atom";
import "./SplashScreen.css";

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000); // 3 seconds splash duration

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-container">
      <Atom />
      <h1 className="app-name">MoleculeVisualizer3D</h1>
      <p className="company-name">Phenomenal</p>
    </div>
  );
}
