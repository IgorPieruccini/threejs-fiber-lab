/* eslint-disable dot-notation */

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useLoader, useFrame } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationObjectGroup } from "three";
import { getMouseDegrees } from "./utils";

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

  const group = useRef<AnimationObjectGroup>();
  const actions = useRef<{ idle: THREE.AnimationAction }>();
  const lucileMesh = nodes["TinyLittleLucile"] as THREE.SkinnedMesh;

  const [mixer] = useState(() => new THREE.AnimationMixer(group.current!));
  useFrame((_, delta) => mixer.update(delta));

  useEffect(() => {
    if (group.current) {
      actions.current = {
        idle: mixer.clipAction(animations[0], group.current),
      };
      actions.current.idle.play();
    }
    return () => animations.forEach((clip) => mixer.uncacheClip(clip));
  }, [animations, mixer]);

  const onChangeMorph = () => {
    setShapeKey(shapeKey === 0 ? 1 : 0);
  };

  useFrame(() => {
    const degree = getMouseDegrees(mouse.current.x, mouse.current.y, 0.5);
    nodes["Head"].rotation.y = degree.x;
    nodes["Head"].rotation.x = degree.y;
  });

  return (
    <group
      position={[-4, 0, 0]}
      ref={group}
      onClick={onChangeMorph}
      rotation={[0, 0.6, 0]}
    >
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
