"use client"; // Enables client-side rendering for this component

import { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NumberGuessing(): JSX.Element {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [userGuess, setUserGuess] = useState<number | string>("");
  const [attempts, setAttempts] = useState<number>(0);

  useEffect(() => {
    if (gameStarted && !paused) {
      const randomNumber: number = Math.floor(Math.random() * 10) + 1;
      setTargetNumber(randomNumber);
    }
  }, [gameStarted, paused]);

  const handleStartGame = (): void => {
    setGameStarted(true);
    setGameOver(false);
    setAttempts(0);
    setPaused(false);
  };

  const handlePauseGame = (): void => {
    setPaused(true);
  };

  const handleResumeGame = (): void => {
    setPaused(false);
  };

  const handleGuess = (): void => {
    if (typeof userGuess === "number" && userGuess === targetNumber) {
      setGameOver(true);
    } else {
      setAttempts(attempts + 1);
    }
  };

  const handleTryAgain = (): void => {
    setGameStarted(false);
    setGameOver(false);
    setUserGuess("");
    setAttempts(0);
  };

  const handleUserGuessChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserGuess(parseInt(e.target.value));
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
      {/* Animated 3D Background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 absolute w-full h-full transform rotate-45 animate-pulse opacity-50"></div>
        <div className="bg-gradient-to-r from-yellow-500 to-pink-500 absolute w-full h-full transform -rotate-45 animate-pulse opacity-50 delay-1000"></div>
        <div className="bg-gradient-to-r from-green-500 to-teal-500 absolute w-full h-full transform rotate-45 animate-pulse opacity-50 delay-500"></div>
      </div>

      <div className="relative z-10 bg-white rounded-lg shadow-lg p-8 w-full max-w-md transform transition-all duration-500 hover:scale-105">
        <h1 className="text-4xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
          🎯 Number Guessing Game 🎯
        </h1>
        <p className="text-center text-gray-700 mb-4 font-medium">
          Can you guess the magic number between 1 and 10?
        </p>
        {!gameStarted && (
          <div className="flex justify-center mb-4">
            <Button
              onClick={handleStartGame}
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg transform hover:scale-110 hover:shadow-pink-500/50"
            >
              Start Game
            </Button>
          </div>
        )}
        {gameStarted && !gameOver && (
          <div>
            <div className="flex justify-center mb-4">
              {paused ? (
                <Button
                  onClick={handleResumeGame}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg transform hover:scale-110 hover:shadow-purple-500/50"
                >
                  Resume
                </Button>
              ) : (
                <Button
                  onClick={handlePauseGame}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg transform hover:scale-110 hover:shadow-purple-500/50"
                >
                  Pause
                </Button>
              )}
            </div>

            <div className="flex justify-center mb-4">
              <Input
                type="number"
                value={userGuess}
                onChange={handleUserGuessChange}
                className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 w-full max-w-xs focus:outline-none focus:ring-4 focus:ring-pink-500 focus:ring-opacity-50 transform transition-all duration-300 shadow-lg"
                placeholder="Enter your guess"
              />
              <Button
                onClick={handleGuess}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg transform hover:scale-110 hover:shadow-yellow-500/50 ml-4"
              >
                Guess
              </Button>
            </div>
            <div className="text-center text-gray-800">
              <p className="text-lg">Attempts: {attempts}</p>
            </div>
          </div>
        )}
        {gameOver && (
          <div>
            <div className="text-center mb-4">
              <h2 className="text-3xl font-bold text-yellow-500">🎉 Game Over! 🎉</h2>
              <p className="text-xl text-gray-800">You guessed the number in {attempts} attempts.</p>
            </div>
            <div className="flex justify-center">
              <Button
                onClick={handleTryAgain}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg transform hover:scale-110 hover:shadow-red-500/50"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
