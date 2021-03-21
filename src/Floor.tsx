import React from "react";

const Floor = () => {
  return (
    <mesh
      position={[0, -1.9, 0]}
      scale={[100, 100, 100]}
      rotation={[-Math.PI * 0.5, 0, 0]}
      receiveShadow
    >
      <planeBufferGeometry args={[1, 1, 1]} />
      <shadowMaterial color="white" />
    </mesh>
  );
};

export default Floor;
