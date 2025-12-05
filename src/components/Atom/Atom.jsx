import "./Atom.css";

export default function Atom() {
  return (
    <div className="atom">
      <div className="orbit">
        <span className="electron"></span>
      </div>
      <div className="orbit">
        <span className="electron"></span>
      </div>
      <div className="orbit">
        <span className="electron"></span>
      </div>
      <div className="core"></div>
    </div>
  );
}
