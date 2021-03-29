import React, { MouseEvent, Suspense, useRef } from "react";
import { Canvas } from "react-three-fiber";
import { PCFSoftShadowMap, Vector3 } from "three";
import Box from "./Box";
import Floor from "./Floor";
import { Form } from "./Form/Form";
import TinyLittleLucile from "./TinyLittleLucile";

function App() {
  const mouse = useRef({ x: 0, y: 0 });

  const onMouseMove = (e: MouseEvent) => {
    mouse.current = {
      x: e.clientX,
      y: e.clientY,
    };
  };

  return (
    <div>
      <Canvas
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
        <Suspense fallback={<Box position={new Vector3(1.2, 0, 0)} />}>
          <TinyLittleLucile mouse={mouse} />
        </Suspense>
        <Floor />
      </Canvas>
      <Form />
    </div>
  );
}

export default App;
