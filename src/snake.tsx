import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { Controls } from "./App";
import { Mesh } from "three";

const Snake = () => {
  const snake = useRef<Mesh | null>(null);
  const [direction, setDirection] = useState<
    "left" | "right" | "top" | "bottom"
  >("right");
  const forwardPressed = useKeyboardControls<Controls>(
    (state) => state.forward
  );
  const rightPressed = useKeyboardControls<Controls>((state) => state.right);
  const leftPressed = useKeyboardControls<Controls>((state) => state.left);
  const backPressed = useKeyboardControls<Controls>((state) => state.back);

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

  useEffect(() => {
    const startGame = setInterval(() => {
      switch (direction) {
        case "right":
          snake.current?.position.set(
            snake.current.position.x + 1,
            snake.current.position.y,
            snake.current.position.z
          );
          break;
        case "left":
          snake.current?.position.set(
            snake.current.position.x - 1,
            snake.current.position.y,
            snake.current.position.z
          );
          break;
        case "top":
          snake.current?.position.set(
            snake.current.position.x,
            snake.current.position.y + 1,
            snake.current.position.z
          );
          break;
        case "bottom":
          snake.current?.position.set(
            snake.current.position.x,
            snake.current.position.y - 1,
            snake.current.position.z
          );
          break;
      }
    }, 200);

    return () => clearInterval(startGame);
  }, [forwardPressed, rightPressed, leftPressed, backPressed]);

  return (
    <mesh ref={snake} position={[-3, 3, 0.5]}>
      <boxGeometry args={[1, 1]} />
      <meshBasicMaterial />
    </mesh>
  );
};

export default Snake;
