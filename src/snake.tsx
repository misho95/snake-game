import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { Controls } from "./App";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";

type PositionType = {
  x: number;
  y: number;
  z: number;
};

const Snake = () => {
  const snake = useRef<Mesh | null>(null);
  const tail = useRef<Mesh | null>(null);
  const [direction, setDirection] = useState<
    "left" | "right" | "top" | "bottom"
  >("right");
  const forwardPressed = useKeyboardControls<Controls>(
    (state) => state.forward
  );
  const rightPressed = useKeyboardControls<Controls>((state) => state.right);
  const leftPressed = useKeyboardControls<Controls>((state) => state.left);
  const backPressed = useKeyboardControls<Controls>((state) => state.back);
  const [lastTimestamp, setLastTimestamp] = useState(0);
  const [positions, setPositions] = useState<PositionType[]>([]);

  useEffect(() => {
    if (rightPressed) {
      setDirection("right");
    }
    if (forwardPressed) {
      setDirection("top");
    }
    if (leftPressed) {
      setDirection("left");
    }
    if (backPressed) {
      setDirection("bottom");
    }
  }, [forwardPressed, rightPressed, leftPressed, backPressed]);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - lastTimestamp;

    if (deltaTime > 0.25) {
      // Adjust this value for desired speed
      setLastTimestamp(elapsedTime);
      switch (direction) {
        case "right":
          snake.current?.position.set(
            snake.current.position.x === 3
              ? (snake.current.position.x = -3)
              : snake.current.position.x + 1,
            snake.current.position.y,
            snake.current.position.z
          );

          break;
        case "left":
          snake.current?.position.set(
            snake.current.position.x === -3
              ? (snake.current.position.x = 3)
              : snake.current.position.x - 1,
            snake.current.position.y,
            snake.current.position.z
          );
          break;
        case "top":
          snake.current?.position.set(
            snake.current.position.x,
            snake.current.position.y === 3
              ? (snake.current.position.y = -3)
              : snake.current.position.y + 1,
            snake.current.position.z
          );
          break;
        case "bottom":
          snake.current?.position.set(
            snake.current.position.x,
            snake.current.position.y === -3
              ? (snake.current.position.y = 3)
              : snake.current.position.y - 1,
            snake.current.position.z
          );
          break;
      }
      if (snake.current) {
        setPositions([
          ...positions,
          {
            x: snake.current?.position.x,
            y: snake.current?.position.y,
            z: snake.current?.position.z,
          },
        ]);
      }
    }
  });

  return (
    <>
      <mesh ref={snake} position={[-3, 3, 0.5]}>
        <boxGeometry args={[1, 1]} />
        <meshBasicMaterial />
      </mesh>
      <mesh ref={tail} position={[-3, 3, 0.5]}>
        <boxGeometry args={[1, 1]} />
        <meshBasicMaterial />
      </mesh>
    </>
  );
};

export default Snake;
