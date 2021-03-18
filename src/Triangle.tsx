/* eslint-disable dot-notation */
import React from "react";
import * as THREE from "three";
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Triangle = () => {
  const { nodes } = useLoader(GLTFLoader, "/triangle/triangle.glb");
  const texture: THREE.Texture = useLoader(
    THREE.TextureLoader,
    "/triangle/triangle_test.png"
  );
  const triangleMesh = nodes["Tirangle"] as THREE.Mesh;

  return (
    <mesh rotation={new THREE.Euler(0, -0.5)} geometry={triangleMesh.geometry}>
      <meshStandardMaterial map={texture} map-flipY={false} skinning />
    </mesh>
  );
};

export default Triangle;
