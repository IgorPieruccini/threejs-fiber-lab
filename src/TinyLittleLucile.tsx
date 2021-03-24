/* eslint-disable dot-notation */

import React, { useState } from "react";
import * as THREE from "three";
import { useLoader, useFrame } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function getMouseDegrees(x: number, y: number, degreeLimit: number) {
  let dx = 0;
  let dy = 0;
  let xdiff;
  let xPercentage;
  let ydiff;
  let yPercentage;

  const w = { x: window.innerWidth, y: window.innerHeight };

  if (x <= w.x / 2) {
    xdiff = w.x / 2 - x;
    xPercentage = (xdiff / (w.x / 2)) * 100;
    dx = ((degreeLimit * xPercentage) / 100) * -1;
  }

  if (x >= w.x / 2) {
    xdiff = x - w.x / 2;
    xPercentage = (xdiff / (w.x / 2)) * 100;
    dx = (degreeLimit * xPercentage) / 100;
  }
  if (y <= w.y / 2) {
    ydiff = w.y / 2 - y;
    yPercentage = (ydiff / (w.y / 2)) * 100;
    dy = ((degreeLimit * 0.5 * yPercentage) / 100) * -1;
  }

  if (y >= w.y / 2) {
    ydiff = y - w.y / 2;
    yPercentage = (ydiff / (w.y / 2)) * 100;
    dy = (degreeLimit * yPercentage) / 100;
  }
  return { x: dx, y: dy };
}

interface Props {
  mouse: React.MutableRefObject<{
    x: number;
    y: number;
  }>;
}

const TinyLittleLucile = ({ mouse }: Props) => {
  const [shapeKey, setShapeKey] = useState(1);
  const texture: THREE.Texture = useLoader(
    THREE.TextureLoader,
    "/tinyLittleLucile/tinyCube.png"
  );

  const { nodes, animations } = useLoader(
    GLTFLoader,
    "/tinyLittleLucile/TinyLittleCube.glb"
  );
  console.log({ animations });

  const lucileMesh = nodes["TinyLittleLucile"] as THREE.SkinnedMesh;

  console.log({ nodes });
  console.log("test", nodes["Scene"].animations);

  console.log({ lucileMesh });

  const onChangeMorph = () => {
    setShapeKey(shapeKey === 0 ? 1 : 0);
  };

  useFrame(() => {
    const degree = getMouseDegrees(mouse.current.x, mouse.current.y, 0.5);
    nodes["Head"].rotation.y = degree.x;
    nodes["Head"].rotation.x = degree.y;
  });

  return (
    <group onClick={onChangeMorph} rotation={[0, 0, 0]}>
      <skinnedMesh
        geometry={lucileMesh.geometry}
        skeleton={lucileMesh.skeleton}
        morphTargetDictionary={lucileMesh.morphTargetDictionary}
        morphTargetInfluences={[shapeKey, shapeKey]}
        castShadow
        receiveShadow
      >
        <primitive object={nodes["root"]} />
        <meshStandardMaterial
          morphTargets
          map={texture}
          map-flipY={false}
          skinning
        />
      </skinnedMesh>
    </group>
  );
};

export default TinyLittleLucile;
