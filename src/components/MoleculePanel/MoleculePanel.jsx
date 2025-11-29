import { useState } from "react";
import "./MoleculePanel.css";

export default function MoleculePanel({ structure, metadata }) {
  const [tab, setTab] = useState("structure");
  const [animating, setAnimating] = useState(false);
  const [visibleTab, setVisibleTab] = useState("structure");

  const handleTabChange = (target) => {
    if (target === tab) return;

    // Start fade-out animation
    setAnimating(true);

    setTimeout(() => {
      // After fade-out, switch content
      setVisibleTab(target);
    }, 150);

    setTimeout(() => {
      // Finish with fade-in
      setAnimating(false);
      setTab(target);
    }, 300);
  };

  return (
    <div className="mol-panel">
      {/* Tabs */}
      <div className="mol-tabs">
        <button
          className={tab === "structure" ? "active" : ""}
          onClick={() => handleTabChange("structure")}
        >
          Structure 3D
        </button>

        <button
          className={tab === "info" ? "active" : ""}
          onClick={() => handleTabChange("info")}
        >
          Information
        </button>
      </div>

      {/* Panel Content */}
      <div className={`mol-content animated ${animating ? "fade-out" : "fade-in"}`}>
        {visibleTab === "structure" && structure}
        {visibleTab === "info" && metadata}
      </div>
    </div>
  );
}
