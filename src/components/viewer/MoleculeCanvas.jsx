import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FiGrid, FiCircle, FiGitCommit } from "react-icons/fi";
import Atom from "./Atom";
import Bond from "./Bond";
import "./viewer.css";

const CPK_COLORS = {
  1: "#FFFFFF", 2: "#C0C0C0", 3: "#AB5CF2", 4: "#00FF00",
  5: "#FFB5B5", 6: "#000000", 7: "#3050F8", 8: "#FF0D0D",
  9: "#90E050", 10: "#B3E3F5", 11: "#AB5CF2", 12: "#00FF00",
  13: "#BFA6A6", 14: "#F0C8A0", 15: "#FF8000", 16: "#FFFF30",
  17: "#1FF01F", 18: "#D9FFFF", 19: "#AB5CF2", 20: "#00FF00",
};

const RENDER_MODES = ["ballstick", "spacefill", "wireframe"];
const MODE_LABEL = {
  ballstick: "Ball & Stick Mode",
  spacefill: "Space-Filling Mode",
  wireframe: "Wireframe Mode",
};

export default function MoleculeCanvas({ molecule }) {
  const [modeIndex, setModeIndex] = useState(0);
  const renderMode = RENDER_MODES[modeIndex];

  const [toast, setToast] = useState("");

  const toggleMode = () => {
    const next = (modeIndex + 1) % RENDER_MODES.length;
    setModeIndex(next);
    setToast(MODE_LABEL[RENDER_MODES[next]]);
  };

  // auto-hide toast
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 1500);
    return () => clearTimeout(t);
  }, [toast]);

  if (!molecule || !molecule.atoms || !molecule.positions) return null;

  const { atoms, bonds, positions } = molecule;

  const atomPositions = atoms.map((atom, i) => [
    positions.x[i],
    positions.y[i],
    positions.z[i],
  ]);

  return (
    <div className="viewer-wrapper">

      {/* Toast Notification */}
      {toast && <div className="viewer-toast">{toast}</div>}

      {/* Floating Mode Button */}
      <button className="mode-toggle-btn" onClick={toggleMode}>
        {renderMode === "ballstick" && <FiGrid size={22} />}
        {renderMode === "spacefill" && <FiCircle size={22} />}
        {renderMode === "wireframe" && <FiGitCommit size={22} />}
      </button>

      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{
          width: "100%",
          height: "500px",
          background: "#b7b7b7",
          borderRadius: "8px",
        }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} />

        {/* Atoms */}
        {atoms.map((atom, i) => (
          <Atom
            key={i}
            position={atomPositions[i]}
            element={atom.element}
            color={CPK_COLORS[atom.element] || "#ccc"}
            renderMode={renderMode}
          />
        ))}

        {/* Bonds */}
        {bonds.map((bond, i) => (
          <Bond
            key={i}
            start={atomPositions[atoms.findIndex(a => a.id === bond.from)]}
            end={atomPositions[atoms.findIndex(a => a.id === bond.to)]}
            renderMode={renderMode}
          />
        ))}

        <OrbitControls enablePan enableZoom />
      </Canvas>
    </div>
  );
}
