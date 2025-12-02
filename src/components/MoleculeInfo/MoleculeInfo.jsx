import "./MoleculeInfo.css";

function formatFormula(formula) {
  if (!formula) return "";
  return formula.replace(/([0-9]+)/g, "<sub>$1</sub>");
}

export default function MoleculeInfo({ metadata }) {
  if (!metadata) {
    return (
      <div className="mol-info empty">
        <p>No molecule loaded yet.</p>
      </div>
    );
  }

  const { title, formula, weight, iupac } = metadata;

  return (
    <div className="mol-info">
      <h2 className="mol-title">Molecular Information</h2>

      <div className="mol-row">
        <span className="label">Common Name:</span>
        <span className="value">{title || "—"}</span>
      </div>

      <div className="mol-row">
        <span className="label">IUPAC Name:</span>
        <span className="value">{iupac || "—"}</span>
      </div>

      <div className="mol-row">
        <span className="label">Chemical Formula:</span>
        <span
          className="value"
          dangerouslySetInnerHTML={{ __html: formatFormula(formula) }}
        />
      </div>

      <div className="mol-row">
        <span className="label">Molecular Weight:</span>
        <span className="value">{weight ? `${weight} g/mol` : "—"}</span>
      </div>
    </div>
  );
}
