import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { Vector3 } from "three";
import Box from "./Box";
import TinyLittleLucile from "./TinyLittleLucile";

function App() {
  return (
    <div style={{ height: "90vh" }}>
      <Canvas>
        <ambientLight intensity={1} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={2}
          intensity={0.5}
        />
        <Suspense fallback={<Box position={new Vector3(1.2, 0, 0)} />}>
          <TinyLittleLucile />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
