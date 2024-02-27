import { KeyboardControls, KeyboardControlsEntry } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Snake from "./snake";
import { useMemo } from "react";

export enum Controls {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
  jump = "jump",
}

const App = () => {
  const gameBox = Array.from({ length: 49 }, (_) => 0);

  const map = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
    ],
    []
  );

  return (
    <KeyboardControls map={map}>
      <Canvas
        style={{ backgroundColor: "#22c55e", height: "100dvh" }}
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          position: [0, -4, 5],
          aspect: window.innerWidth / window.innerHeight,
        }}
      >
        {gameBox.map((l, index) => {
          return (
            <mesh
              key={index}
              position={[-3 + (index % 7), 3 - Math.floor(index / 7), 0]}
            >
              <planeGeometry args={[1, 1]} />
              <meshBasicMaterial wireframe />
            </mesh>
          );
        })}
        <Snake />
      </Canvas>
    </KeyboardControls>
  );
};

export default App;
