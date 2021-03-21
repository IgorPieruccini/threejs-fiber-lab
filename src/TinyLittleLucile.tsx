/* eslint-disable dot-notation */

import React, { useState } from "react";
import * as THREE from "three";
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const TinyLittleLucile = () => {
  const [shapeKey, setShapeKey] = useState(1);
  const texture: THREE.Texture = useLoader(
    THREE.TextureLoader,
    "/tinyLittleLucile/tinyCube.png"
  );

  const { nodes } = useLoader(
    GLTFLoader,
    "/tinyLittleLucile/TinyLittleCube.glb"
  );

  const lucileMesh = nodes["TinyLittleCube"] as THREE.Mesh;
  console.log({ lucileMesh });

  const onChangeMorph = () => {
    setShapeKey(shapeKey === 0 ? 1 : 0);
  };

  return (
    <mesh
      rotation={new THREE.Euler(0, -0.5)}
      geometry={lucileMesh.geometry}
      morphTargetDictionary={lucileMesh.morphTargetDictionary}
      morphTargetInfluences={[shapeKey, shapeKey]}
      onClick={onChangeMorph}
      castShadow
    >
      <meshStandardMaterial
        morphTargets
        map={texture}
        map-flipY={false}
        skinning
      />
    </mesh>
  );
};

export default TinyLittleLucile;
