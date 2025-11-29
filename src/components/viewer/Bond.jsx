// src/components/viewer/Bond.jsx
import { Cylinder } from "@react-three/drei";
import * as THREE from "three";

export default function Bond({ start, end, renderMode }) {
  // Hide bonds entirely in spacefill mode
  if (renderMode === "spacefill") return null;

  const startVec = new THREE.Vector3(...start);
  const endVec   = new THREE.Vector3(...end);
  const mid = startVec.clone().add(endVec).multiplyScalar(0.5);

  const direction = new THREE.Vector3().subVectors(endVec, startVec);
  const length = direction.length();

  const orientation = new THREE.Matrix4();
  orientation.lookAt(startVec, endVec, new THREE.Vector3(0, 1, 0));
  orientation.multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2));

  // ————————————————
  // MODE-BASED SETTINGS
  // ————————————————
  const radius = renderMode === "wireframe" ? 0.03 : 0.1;

  const materialProps =
    renderMode === "wireframe"
      ? { color: "#777", wireframe: true }
      : { color: "#888" };

  return (
    <Cylinder
      args={[radius, radius, length, 12]}
      position={mid}
      rotation={new THREE.Euler().setFromRotationMatrix(orientation)}
    >
      <meshStandardMaterial {...materialProps} />
    </Cylinder>
  );
}
