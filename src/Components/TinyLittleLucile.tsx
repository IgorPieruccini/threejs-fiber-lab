/* eslint-disable dot-notation */

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useLoader, useFrame } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationObjectGroup } from "three";
import { getMouseDegrees, move } from "../utils";
import { FormState } from "../Form";

interface Props {
  mouse: React.MutableRefObject<{
    x: number;
    y: number;
  }>;
  formState: FormState;
}

const TinyLittleLucile = ({ mouse, formState }: Props) => {
  const blinkTimer = useRef(0);
  const blinkTime = useRef(1.5);
  const [eyeShapeKey, setEyeShapeKey] = useState(0);
  const [mouthShapeKey, setMouthShapeKey] = useState(0.2);

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
  useFrame((_, delta) => {
    blinkTimer.current += delta;
    if (blinkTimer.current >= blinkTime.current) {
      blinkTimer.current = 0;
      blinkTime.current = blinkTime.current === 1.5 ? 0.1 : 1.5;
      setEyeShapeKey((old) => (old === 1 ? 0 : 1));
    }
  });

  useEffect(() => {
    if (group.current) {
      actions.current = {
        idle: mixer.clipAction(animations[0], group.current),
      };
      actions.current.idle.play();
    }
    return () => animations.forEach((clip) => mixer.uncacheClip(clip));
  }, [animations, mixer]);

  useFrame(() => {
    if (formState !== "password") {
      const degree = getMouseDegrees(mouse.current.x, mouse.current.y, 0.7);

      const movement = move({
        from: { x: nodes["Head"].rotation.x, y: nodes["Head"].rotation.y },
        to: degree,
        speed: 0.2,
      });

      nodes["Head"].rotation.x += -movement.x;
      nodes["Head"].rotation.y += -movement.y;
    }

    if (formState === "password") {
      const movement = move({
        from: { x: nodes["Head"].rotation.x, y: nodes["Head"].rotation.y },
        to: { x: -0.8, y: 0 },
        speed: 0.2,
      });
      nodes["Head"].rotation.y += -movement.y;
      nodes["Head"].rotation.x += -movement.x;
    }
  });

  return (
    <group position={[-4, 0, 0]} ref={group} rotation={[0, 0.6, 0]}>
      <skinnedMesh
        geometry={lucileMesh.geometry}
        skeleton={lucileMesh.skeleton}
        morphTargetDictionary={lucileMesh.morphTargetDictionary}
        morphTargetInfluences={[eyeShapeKey, mouthShapeKey]}
        castShadow
        receiveShadow
        onPointerOver={() => {
          setMouthShapeKey(0.4);
        }}
        onPointerOut={() => {
          setMouthShapeKey(0);
        }}
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
