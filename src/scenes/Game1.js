class Game1 extends Phaser.Scene {
    constructor() {
        super('game1');
    }

    preload() {
        this.load.path = './assets/';
        
        this.load.image('tileset1Image', 'tilesets/HallwaysBackGround.png');
        this.load.tilemapTiledJSON('tilemap1JSON', 'tilemaps/Game1.json');

        this.load.image('Danny', 'characters/blackBox.png'); // Placeholder sprite
        this.load.image('BlackOverlay', 'BlackOverlay.png'); // Placeholder sprite

    }

    create() {
        console.log('GAME 1')

        // Reset game flags
        this.gameOver = false;

        // Set camera zoom to 2x
        this.cameras.main.setZoom(2);

        // Fade in from black
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // Create "Black Overlay"
        this.overlay = this.add.tileSprite(0, 0, 960, 640, 'BlackOverlay').setOrigin(0, 0).setDepth(100).setScrollFactor(0);

        // Tilemap setup
        const map = this.add.tilemap('tilemap1JSON');
        const tileset = map.addTilesetImage('HallwaysBackGround', 'tileset1Image');
        const terrainLayer = map.createLayer('terrainLayer', tileset, 0, 0);
        terrainLayer.setCollisionByProperty({ collides: true });

        // Instantiate Danny
        this.Danny = new Player(this, map.widthInPixels/2, map.heightInPixels - tileSize, 'Danny').setScale(0.75);

        // Add collider between Danny and tilemap
        this.physics.add.collider(this.Danny, terrainLayer);

        // Have camera follow Danny
        this.cameras.main.startFollow(this.Danny, true, 0.25, 0.25);

        // Set world bounds to map dimensions
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);

        // start bg music
        /* this.bgMusic = this.sound.add('bgMusic', { volume: 0.65, loop: true });
        if (bgMusicPlaying === false) {
            this.bgMusic.play();
            bgMusicPlaying = true;
        } */

        // set up cursor keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    

    update() {
        this.Danny.update();

        // Go to menu scene
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start('menuScene');
        }
    }
    
}