class Game3 extends Phaser.Scene {
    constructor() {
        super('game3');
    }

    preload() {
        this.load.path = './assets/';
        
        this.load.image('tileset3Image', 'tilesets/Game3Tileset.png');
        this.load.tilemapTiledJSON('tilemap3JSON', 'tilemaps/Game3.json');

        this.load.atlas('runningDanny', 'characters/RunningDanny.png', 'characters/RunningDanny.json');

        this.load.image('snowflake', 'snowflake.png');

        this.load.audio('game3bgmusic', 'audio/game3_bgm.mp3');
    }

    create() {
        console.log('GAME 3')

        // reset parameters
        this.gameOverFlag = false;

        // fade in from black
        this.cameras.main.fadeIn(2000, 0, 0, 0);

        // Set camera zoom to 2x
        this.cameras.main.setZoom(2);

        // Tile map setup
        this.map = this.add.tilemap('tilemap3JSON');
        const tileset = this.map.addTilesetImage('Game3Tileset', 'tileset3Image');
        const bgLayer = this.map.createLayer('backgroundLayer', tileset, 0, 0);
        const terrainLayer = this.map.createLayer('terrainLayer', tileset, 0, 0);
        terrainLayer.setCollisionByProperty({ collides: true });

        // create line on top of screen for particles source
        let line = new Phaser.Geom.Line(0, 0, gameWidth, 0);

        this.particleEmitter = this.add.particles(100, 300, 'snowflake', {
            gravityY: -10,
            lifespan: 15000,
            speed: { min: 100, max: 150 },
            alpha: { start: 0.75, end: 0.1 },
            scale: { start: 1, end: 0 },
            emitZone: { type: 'random', source: line, quantity: 15 },
            blendMode: 'ADD',
        });

        // define animation
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNames('runningDanny', {
                prefix: 'RunningDanny ',
                start: 0,
                end: 12,
                suffix: '.aseprite'
            }),
            frameRate: 15,
            repeat: -1
        });
        
        // Instantiate Danny
        this.Danny = new RunningDanny(this, this.map.widthInPixels/2, this.map.heightInPixels/2, 'runningDanny').setSize(20,20);

        // Add collider between Danny and tile map
        this.physics.add.collider(this.Danny, terrainLayer);

        // Have camera follow Danny
        this.cameras.main.startFollow(this.Danny, true, 0.25, 0.25);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        // Set world bounds to map dimensions
        this.physics.world.bounds.setTo(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        // Looping Background Music
        this.bgMusic = this.sound.add('game3bgmusic', { volume: 0.40, loop: true });
        this.bgMusic.play();

        // Timer
        // store game time into local variable
        this.roundTime = 60;
        // takes in number of seconds and formats it into (Min:Second) format.
        // https://phaser.discourse.group/t/countdown-timer/2471/3
        function formatTime(seconds) {
            // Minutes
            var minutes = Math.floor(seconds/60);
            // Seconds
            var partInSeconds = seconds%60;
            // Adds left zeros to seconds
            partInSeconds = partInSeconds.toString().padStart(2,'0');
            // Returns formated time
            return `${minutes}:${partInSeconds}`;
        }
        function decrementTime() {
            this.roundTime -= 1; // Minus one second
            console.log('-1 sec')
            this.timerText.setText(formatTime(this.roundTime));
        }
        let timerConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '24px',
            backgroundColor: '#303030',
            color: '#FFFFFF',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }
        this.timerText = this.add.text(game.config.width/2, this.Danny.y - tileSize*4, formatTime(this.roundTime), timerConfig).setOrigin(0.5).setDepth(55).setScrollFactor(0,0);
        // Each 1000 ms call onEvent
        this.time.addEvent({ delay: 1000, callback: decrementTime, callbackScope: this, loop: true });
        
        // set up cursor keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    update() {
        if (!this.gameOverFlag) {
            this.Danny.update();
            // if player reaches destination
            this.map.findObject('exitPoint', obj => {
                if (Phaser.Math.Distance.Between(this.Danny.x, this.Danny.y, obj.x, obj.y) <= tileSize * 1) {
                    console.log('reached maze exit')
                    this.gameOverFlag = true;
                    success = true;
                    parentScene = 'game3';
                    this.bgMusic.stop();
                    this.scene.start('gameOver');
                }
            });
        }

        // if timer reaches 0
        if (this.roundTime <= 0) {
            console.log('ran out of time')
            parentScene = 'game3';
            success = false;
            this.bgMusic.stop();
            this.scene.start('gameOver');
        }

    }
    
}