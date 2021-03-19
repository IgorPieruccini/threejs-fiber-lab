/* eslint-disable dot-notation */

import React from "react";
import * as THREE from "three";
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const TinyLittleLucile = () => {
  const texture: THREE.Texture = useLoader(
    THREE.TextureLoader,
    "/tinyLittleLucile/tinyCube.png"
  );

  const { nodes } = useLoader(
    GLTFLoader,
    "/tinyLittleLucile/TinyLittleCube.glb"
  );
  console.log({ nodes });

  const lucileMesh = nodes["TinyLittleCube"] as THREE.Mesh;

  return (
    <mesh rotation={new THREE.Euler(0, -0.5)} geometry={lucileMesh.geometry}>
      <meshStandardMaterial map={texture} map-flipY={false} skinning />
    </mesh>
  );
};

export default TinyLittleLucile;
