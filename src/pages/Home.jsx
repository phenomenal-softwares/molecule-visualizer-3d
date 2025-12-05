import { useState, useRef } from "react";
import { fetchFullMolecule } from "../api/pubchem";
import { parseMolecule } from "../utils/parseMolecule";
import MoleculePanel from "../components/MoleculePanel/MoleculePanel";
import MoleculeViewer from "../components/MoleculeViewer";
import MoleculeInfo from "../components/MoleculeInfo/MoleculeInfo";
import MoleculeModal from "../components/MoleculeModal/MoleculeModal";
import Atom from "../components/Atom/Atom";

import { FiAlertCircle, FiLoader, FiGrid } from "react-icons/fi";
import "./Home.css";

export default function Home() {
  const [input, setInput] = useState("");
  const [metadata, setMetadata] = useState(null);
  const [structure, setStructure] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const viewerRef = useRef(null);

  const handleSearch = async (query) => {
    const searchTerm = query || input;
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError("");
    setMetadata(null);
    setStructure(null);

    try {
      const result = await fetchFullMolecule(searchTerm.trim());
      if (!result) {
        setError("Molecule not found. Try another name.");
        setLoading(false);
        return;
      }

      if (result.structure) {
        const parsed3D = parseMolecule(result.structure);
        setStructure(parsed3D.structure);
      }

      if (result.metadata) {
        setMetadata({
          formula: result.metadata.MolecularFormula || "-",
          weight: result.metadata.MolecularWeight || "-",
          iupac: result.metadata.IUPACName || "-",
          title: result.metadata.Title || "-",
        });
      }

      setTimeout(() => {
        viewerRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="home-container">
      <h1 className="app-title">Molecule Visualizer 3D</h1>
      <p className="subtitle">
        Type a compound name and explore its structure in 3D
      </p>

      {/* Search Section */}
      <div className="search-box">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Enter molecule name or CID…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />

          <button onClick={() => handleSearch()} disabled={loading}>
            {loading ? <FiLoader className="spin" /> : "Load"}
          </button>

          {/* Modal trigger */}
          <button
            className="modal-trigger-btn"
            onClick={() => setModalOpen(true)}
            title="Pick from list"
          >
            <FiGrid size={22} />
          </button>
        </div>

        {error && (
          <div className="error-box">
            <FiAlertCircle className="error-icon" />
            {error}
          </div>
        )}
      </div>

      {/* Viewer + Metadata Section */}
      <div ref={viewerRef} className="viewer-section">
        {structure || metadata ? (
          <MoleculePanel
            structure={
              structure ? <MoleculeViewer moleculeData={structure} /> : null
            }
            metadata={metadata ? <MoleculeInfo metadata={metadata} /> : null}
          />
        ) : (
          <Atom />
        )}
      </div>

      {/* Molecule Modal */}
      <MoleculeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={(name) => {
          setInput(name);
          handleSearch(name);
        }}
      />
    </div>
  );
}
