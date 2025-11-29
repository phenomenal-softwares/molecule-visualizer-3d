import MoleculeCanvas from "./viewer/MoleculeCanvas";

export default function MoleculeViewer({ moleculeData, renderMode }) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {moleculeData ? (
        <MoleculeCanvas molecule={moleculeData} renderMode={renderMode} />
      ) : (
        <div
          style={{
            height: "400px",
            background: "#111",
            color: "#ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px"
          }}
        >
          <p>No molecule loaded</p>
        </div>
      )}
    </div>
  );
}
