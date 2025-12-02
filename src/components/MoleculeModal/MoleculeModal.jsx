import moleculeNames from "../../data/moleculeNames";
import { FiX } from "react-icons/fi";
import "./MoleculeModal.css";

export default function MoleculeModal({ open, onClose, onSelect }) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Pick a Molecule</h2>
          <button className="close-btn" onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>

        <div className="modal-grid">
          {moleculeNames.map((name) => (
            <button
              key={name}
              className="molecule-btn"
              onClick={() => {
                onSelect(name);
                onClose();
              }}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
