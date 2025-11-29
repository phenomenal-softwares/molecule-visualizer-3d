import { Sphere } from "@react-three/drei";

export default function Atom({ position, color, element, renderMode }) {
  // assign atomic radius scale for spacefill mode
  const vdwRadii = {
    1: 1.2,   // H
    6: 1.7,   // C
    7: 1.55,  // N
    8: 1.52,  // O
    16: 1.80, // S
    // fallback for others
  };

  const baseSize = 0.4;                   // ball-stick size
  const sfSize = (vdwRadii[element] || 1.6) * 0.25; // scaled spacefill size

  let sphereSize = baseSize;
  let materialProps = { color };

  if (renderMode === "spacefill") {
    sphereSize = sfSize;
    materialProps = { color };
  }

  if (renderMode === "wireframe") {
    sphereSize = 0.15; // tiny nodes
    materialProps = {
      color,
      wireframe: true,
      wireframeLinewidth: 1,
    };
  }

  return (
    <Sphere args={[sphereSize, 32, 32]} position={position}>
      <meshStandardMaterial {...materialProps} />
    </Sphere>
  );
}
