class Game1 extends Phaser.Scene {
    constructor() {
        super('game1');
    }

    preload() {
        this.load.path = './assets/';
        
        this.load.image('tileset1Image', 'tilesets/HallwaysBackGround.png');
        this.load.tilemapTiledJSON('tilemap1JSON', 'tilemaps/Game1.json');

        this.load.atlas('trikeDanny', 'characters/TricycleDanny.png', 'characters/TricycleDanny.json');

        this.load.image('BlackOverlay', 'BlackOverlay.png');
        this.load.image('Twins', 'characters/twins.png');

        this.load.audio('bgMusic', 'audio/game1_bgm.mp3');
        
    }

    create() {
        console.log('GAME 1')

        // Reset game flags
        this.gameOverFlag = false;
        this.lockSpawns = false;
        this.spawnpoint = 0;

        // Fade in from black
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // Set camera zoom to 2x
        this.cameras.main.setZoom(2); // TEMP DISABLED FOR DEBUGGING

        // Create "Black Overlay"
        this.overlay = this.add.tileSprite(0, 0, 960, 640, 'BlackOverlay').setOrigin(0, 0).setDepth(50).setScrollFactor(0); // TEMP DISABLED FOR DEBUGGING

        // Tilemap setup
        this.map = this.add.tilemap('tilemap1JSON');
        const tileset = this.map.addTilesetImage('HallwaysBackGround', 'tileset1Image');
        const terrainLayer = this.map.createLayer('terrainLayer', tileset, 0, 0);
        terrainLayer.setCollisionByProperty({ collides: true });

        // define animation
        this.anims.create({
            key: 'pedal',
            frames: this.anims.generateFrameNames('trikeDanny', {
                prefix: 'TricycleDanny ',
                start: 0,
                end: 6,
                suffix: '.aseprite'
            }),
            frameRate: 15,
            repeat: -1
        });

        // Instantiate Danny
        this.Danny = new TrikeDanny(this, this.map.widthInPixels/2, this.map.heightInPixels - tileSize*2, 'trikeDanny');

        // Add collider between Danny and tilemap
        this.physics.add.collider(this.Danny, terrainLayer);

        // Have camera follow Danny
        this.cameras.main.startFollow(this.Danny, true, 0.25, 0.25);

        // Create hint text
        let smallTextConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '18px',
            color: '#FFFFFF',
            align: 'center',
            padding: 5,
            lineSpacing: 5,
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, this.Danny.y - tileSize*11, 'Find Room 237...', smallTextConfig).setOrigin(0.5).setDepth(55).setScrollFactor(0);

        // Set world bounds to map dimensions
        this.physics.world.bounds.setTo(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        // set up Twins group
        this.TwinsGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });

        // array to hold possible twin spawnpoints
        // twinSpawns[][0] = point's x-position
        // twinSpawns[][1] = point's y-position
        // [[x, y], [x, y], ...]
        this.twinSpawns = [];
        // add all possible spawnpoints to array
        this.map.findObject('objectLayer', obj => {
            if (obj.name.includes('Spawn')) {
                // add object coords to array
                this.twinSpawns.push([obj.x, obj.y]);
            }
        });

        // Spawn first set of twins
        this.lockSpawns = true;
        this.spawnTwins();

        // Looping Background Music
        this.bgMusic = this.sound.add('bgMusic', { volume: 0.8, loop: true });
        this.bgMusic.play();

        // set up cursor keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    update() {

        // While game is still in play
        if (!this.gameOverFlag) {
            this.Danny.update();

            // Spawn twins every 2.5 secs
            if (!this.lockSpawns) {
                this.lockSpawns = true; // lock to prevent more twins from spawning
                this.time.addEvent({
                    delay: 2500,
                    callback: this.spawnTwins,
                    callbackScope: this
                });
            }

            // Proximity detection
            const points = this.map.findObject('objectLayer', obj => {
                // if player reaches destination
                if (obj.name.includes('237')) {
                    if (Phaser.Math.Distance.Between(this.Danny.x, this.Danny.y, obj.x, obj.y) <= tileSize * 1) {
                        console.log('237')
                        success = true;
                        parentScene = 'game1';
                        this.bgMusic.stop();
                        this.scene.start('gameOver');
                    }
                }
                // if player runs into elevator
                else if (obj.name.includes('Elevator')) {
                    if (Phaser.Math.Distance.Between(this.Danny.x, this.Danny.y, obj.x, obj.y) <= tileSize * 0.5) {
                        console.log('Elevator')
                        success = false;
                        parentScene = 'game1';
                        this.bgMusic.stop();
                        this.scene.start('gameOver');
                    }
                }
                // if player runs into twins
                else {
                    if (Phaser.Math.Distance.Between(this.Danny.x, this.Danny.y, obj.x, obj.y) <= tileSize * 1.5) {
                        for (const Twins of this.TwinsGroup.getChildren()) {
                            if (Twins.x == obj.x && Twins.y == obj.y) {
                                console.log('encountered twins')
                                success = false;
                                parentScene = 'game1';
                                this.bgMusic.stop();
                                this.scene.start('gameOver');
                            }
                        }
                    }
                }
            });
        }
    }

    // Spawns in Twins at random spawnpoint
    spawnTwins() {
        if (!this.gameOverFlag) {
            this.TwinsGroup.clear(true, true); // destory existing twins on screen
            this.prevSpawnpoint = 0;
            this.spawnpoint = Phaser.Math.Between(0, 7);
            this.twinsSpawnX = this.twinSpawns[this.spawnpoint][0];
            this.twinsSpawnY = this.twinSpawns[this.spawnpoint][1];

            if (Phaser.Math.Distance.Between(this.Danny.x, this.Danny.y, this.twinsSpawnX, this.twinsSpawnY) <= tileSize * 5) {
                console.log('spawn too close: finding new spawn')
                this.prevSpawnpoint = this.spawnpoint;
                while (this.spawnpoint == this.prevSpawnpoint) {
                    this.spawnpoint = Phaser.Math.Between(0, 7);
                }
                this.twinsSpawnX = this.twinSpawns[this.spawnpoint][0];
                this.twinsSpawnY = this.twinSpawns[this.spawnpoint][1];
            }

            this.Twins = this.add.sprite(this.twinsSpawnX, this.twinsSpawnY, 'Twins'); // create twins
            this.TwinsGroup.add(this.Twins); // add twins to group
            this.lockSpawns = false; // unlock spawns
        }
    }
}