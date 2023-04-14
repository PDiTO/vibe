// React
import { useRef } from "react";
import { useEffect } from "react";

// Libraries
import { Game } from "phaser";

// Config
import { gameConfig } from "../../config/gameConfig";

// Holds container for Phaser game
export const StageView = () => {
  const canvas = useRef<HTMLDivElement>(null);

  //Load game on first run, clean up when destroyed.
  useEffect(() => {
    var game: Game;

    if (canvas.current) {
      // Create game instance based on config
      game = new Game({ ...gameConfig, parent: canvas.current });
    }
    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div className="container">
      <div ref={canvas} className="game-container" />
    </div>
  );
};
