// Name: Gordon Yee and Emily Gavilanes
// Title: The Shining Game
// Phaser Components Used:
// - physics systems, particle effects, text objects, timers, tilemaps, animation manager


'use strict';

// define and configure main Phaser game object
let config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    // 3:2 Aspect ratio
    // 32px x 32px tiles (30 x 20 tiles)
    width: 960,
    height: 640,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Load, Menu, Game1Instructions, Game1, Game2Instructions, Game2, Game3Instructions, Game3, Credits ],
    fps: { forceSetTimeOut: true, target: 60 } // Necessary to limit fps on devices with a refresh rate > 60Hz
}

// define game
let game = new Phaser.Game(config);
const textSpacer = 64;
const tileSize = 32; // Size in pixels
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let gameWidth = game.config.width;
let gameHeight = game.config.height;
let cursors;
let keySPACE, keyESC, keyLEFT, keyRIGHT, keyUP, keyDOWN, key1, key2, key3, keyC;
let bgMusicPlaying = false;
