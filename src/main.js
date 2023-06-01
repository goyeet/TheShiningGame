// Name: Gordon Yee and Emily Gavilanes
// Title: The Shining Game


'use strict';

// define and configure main Phaser game object
let config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    height: 640,
    width: 960,
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
    scene: [ Load, Menu, Game1, Game2, Game3, Credits ],
    fps: { forceSetTimeOut: true, target: 60 } // Necessary to limit fps on devices with a refresh rate > 60Hz
}

// define game
let game = new Phaser.Game(config);
const textSpacer = 64;
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let gameWidth = game.config.width;
let gameHeight = game.config.height;
let cursors;
let keySPACE, keyLEFT, keyRIGHT, key1, key2, key3, keyESC;
let bgMusicPlaying = false;
