import { useEffect, useState } from "react";

interface boardType {
  id: number;
  value: number;
}

function App() {
  const [board, setBoard] = useState<boardType[] | null>(null);
  const [snake, setSnake] = useState<boardType | null>(null);

  const createBoard = () => {
    const randomNumber = Math.floor(Math.random() * 400);
    const makeBoard = [];
    for (let i = 0; i < 400; i++) {
      if (randomNumber === i) {
        makeBoard.push({ id: i, value: 1 });
      } else {
        makeBoard.push({ id: i, value: 0 });
      }
    }
    setBoard(makeBoard);
  };

  const listenKeyBoard = (e) => {
    if (e.key === "Enter") {
      startGame();
    }
  };

  const startGame = () => {
    setInterval(() => {
      if (snake) {
        const move = board?.map((b) => {
          if (b.id === snake.id - 1) {
            return {
              ...b,
              value: 1,
            };
          } else {
            return {
              ...b,
              value: 0,
            };
          }
        });
      }
    }, 1000);
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const findSnake = board?.find((b) => {
      if (b.value === 1) {
        return b;
      }
    });
    if (findSnake) {
      setSnake(findSnake);
    }
  }, [board]);

  return (
    <div
      onKeyDown={listenKeyBoard}
      tabIndex={0}
      className="w-full h-screen bg-neutral-900 flex justify-center items-center"
    >
      <div className="w-80 h-80 bg-neutral-200 flex flex-wrap">
        {board !== null &&
          board.map((b) => {
            return (
              <div
                key={b.id}
                className={`w-4 h-4 ${
                  b.value === 1
                    ? "bg-green-500"
                    : b.value === 2
                    ? "bg-red-500"
                    : "bg-transparent"
                } text-xs`}
              ></div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
