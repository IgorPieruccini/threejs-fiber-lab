import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { Vector3 } from "three";
import Box from "./Box";
import TinyLittleLucile from "./TinyLittleLucile";

function App() {
  return (
    <div style={{ height: "90vh" }}>
      <Canvas>
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={2} />
        <pointLight intensity={2} position={[-10, -10, -10]} />
        <Box position={new Vector3(1.2, 0, 0)} />
        <Suspense fallback={<Box position={new Vector3(1.2, 0, 0)} />}>
          <TinyLittleLucile />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
