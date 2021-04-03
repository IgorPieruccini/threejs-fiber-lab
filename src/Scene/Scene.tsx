import React, { Suspense, useRef } from "react";
import { Canvas } from "react-three-fiber";
import { PCFSoftShadowMap, Vector3 } from "three";
import PlaceHolder from "../Components/PlaceHolder";
import Floor from "../Components/Floor";
import { useForm } from "../Form";
import TinyLittleLucile from "../Components/TinyLittleLucile";

export const Scene = () => {
  const form = useForm();
  const mouse = useRef({ x: 0, y: 0 });

  const onMouseMove = (e: any) => {
    mouse.current = {
      x: e.clientX,
      y: e.clientY,
    };
  };

  return (
    <Canvas
      className="formCanvas"
      onMouseMove={onMouseMove}
      shadowMap
      camera={{
        focus: 1,
        zoom: 2,
        position: new Vector3(0, 5, 15),
      }}
      onCreated={({ gl, camera }) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = PCFSoftShadowMap;
        camera.rotation.set(-0.2, 0, 0);
      }}
    >
      <ambientLight intensity={1} />
      <spotLight
        position={[5, 6, 10]}
        angle={0.5}
        intensity={1}
        penumbra={0.6}
        castShadow
      />

      <Suspense fallback={<PlaceHolder />}>
        <TinyLittleLucile formState={form.state} mouse={mouse} />
      </Suspense>

      <Floor />
    </Canvas>
  );
};
