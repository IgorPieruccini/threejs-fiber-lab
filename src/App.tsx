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
          position: new Vector3(0, 2, 15),
        }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = PCFSoftShadowMap;
        }}
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          intensity={1}
          castShadow
          penumbra={1}
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
