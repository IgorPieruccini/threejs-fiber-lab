import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { Vector3 } from "three";
import Box from "./Box";
import TinyLittleLucile from "./TinyLittleLucile";
import Floor from "./Floor";

function App() {
  return (
    <div style={{ height: "90vh" }}>
      <Canvas camera={{ focus: 1, zoom: 2, position: new Vector3(0, 2, 15) }}>
        <ambientLight intensity={1} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={0.8}
          intensity={1}
        />
        <Suspense fallback={<Box position={new Vector3(1.2, 0, 0)} />}>
          <TinyLittleLucile />
        </Suspense>
        <Floor />
      </Canvas>
    </div>
  );
}

export default App;
