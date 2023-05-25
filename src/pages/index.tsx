import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const DIRECTIONS = {
    L: "left",
    R: "right",
    U: "up",
    D: "down",
  };

  const [isGameStart, setIsGameStart] = useState<boolean>(true);
  const [isDead, setIsDead] = useState<boolean>(false);

  const [snakePositionArray, setSnakePositionArray] = useState<number[]>([]);
  const [snakeTailPosition, setSnakeTailPosition] = useState<number>();
  const [snakeDirection, setSnakeDirection] = useState(DIRECTIONS.R);

  const [foodPosition, setFoodPosition] = useState<number>();

  const initGame = () => {
    if (isGameStart) return;
    setIsDead(false);
    setSnakePositionArray([12, 13]);
    setSnakeDirection(DIRECTIONS.R);
    setIsGameStart(true);
  };

  const gameBoardArray = Array(100)
    .fill(null)
    .map((_, i) => i);

  const movePosition = (position: number) => {
    switch (snakeDirection) {
      case DIRECTIONS.R:
        position = position + 1;
        break;
      case DIRECTIONS.L:
        position = position - 1;
        break;
      case DIRECTIONS.U:
        position = position - 10;
        break;
      case DIRECTIONS.D:
        position = position + 10;
        break;
      default:
    }
    return position;
  };

  const moveSnake = () => {
    setSnakeTailPosition(snakePositionArray.at(-1));
    const newSnakeHeadPosition = movePosition(snakePositionArray[0]);
    const newSnakePositionArray = [
      newSnakeHeadPosition,
      ...snakePositionArray.slice(0, -1),
    ];

    setSnakePositionArray(() => newSnakePositionArray);
  };

  const handleIsDead = () => {
    const isHitWalls =
      (snakePositionArray[0] % 10 === 9 && snakeDirection === "right") ||
      (snakePositionArray[0] % 10 === 0 && snakeDirection === "lift") ||
      (snakePositionArray[0] < 10 && snakeDirection === "up") ||
      (snakePositionArray[0] > 90 && snakeDirection === "down");
    if (isHitWalls) {
      setIsDead(true);
      setSnakePositionArray([]);
      setFoodPosition(11);
      setIsGameStart(false);
    }
  };

  const spawnFood = () => {
    let newPosition = Math.floor(Math.random() * 99);
    while (snakePositionArray.includes(newPosition)) {
      newPosition = Math.floor(Math.random() * 99);
    }
    setFoodPosition(newPosition);
  };
  const handleEatFood = () => {
    if (snakePositionArray[0] !== foodPosition) return;
    if (typeof snakeTailPosition !== "undefined") {
      setSnakePositionArray((prevSnakePositionArray) => [
        ...prevSnakePositionArray,
        snakeTailPosition,
      ]);
    }
  };

  const isSnake = (position: number) => snakePositionArray.includes(position);

  const isFood = (position: number) => {
    return foodPosition === position && !isSnake(position);
  };

  const handleKeyDown = (event: any) => {
    switch (event.keyCode) {
      case 37:
      case 65:
        console.log("Move Left");
        setSnakeDirection(DIRECTIONS.L);
        break;
      case 38:
      case 87:
        console.log("Move Up");
        setSnakeDirection(DIRECTIONS.U);
        break;
      case 39:
      case 68:
        console.log("move right");
        setSnakeDirection(DIRECTIONS.R);
        break;
      case 40:
      case 83:
        console.log("move down");
        setSnakeDirection(DIRECTIONS.D);
        break;
      default:
    }
  };

  useEffect(() => {
    if (!isGameStart) return;

    initGame();
    let gameInterval;
    // window.addEventListener("keydown", handleKeyDown);
    // gameIterval
  });

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {/* game title screen */}
        {!isGameStart && isDead && (
          <div>
            <h1>Snake Game</h1>
            <button className="" onClick={initGame}>
              Start Game
            </button>
          </div>
        )}

        <div className={styles.description}></div>
      </main>
    </>
  );
}
