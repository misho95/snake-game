import { Canvas } from "@react-three/fiber";

const App = () => {
  const gameBox = Array.from({ length: 49 }, (_, index) => 0);

  const handleKeyDown = (event) => {
    console.log(event);
  };

  return (
    <div>
      <Canvas
        onKeyDown={handleKeyDown}
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
        <mesh position={[-3, 3, 0.5]}>
          <boxGeometry args={[1, 1]} />
          <meshBasicMaterial />
        </mesh>
      </Canvas>
    </div>
  );
};

export default App;
