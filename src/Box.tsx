import React, { useRef, useState } from "react";
import * as THREE from "three";
import { Vector3 } from "three";

interface Props {
  position: Vector3;
}

const Box = ({ position }: Props) => {
  const Mesh = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <mesh
      rotation={new THREE.Euler(0, -0.5)}
      position={position}
      ref={Mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};

export default Box;
