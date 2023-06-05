class Game3 extends Phaser.Scene {
    constructor() {
        super('game3');
    }

    preload() {
        this.load.path = './assets/';
        
        this.load.image('tileset3Image', 'tilesets/Game3Tileset.png');
        this.load.tilemapTiledJSON('tilemap3JSON', 'tilemaps/Game3.json');

        this.load.image('Danny', 'characters/blackBox.png'); // Placeholder sprite

    }

    create() {
        console.log('GAME 3')

        // reset parameters
        this.gameOver = false;

        // fade in from black
        this.cameras.main.fadeIn(2000, 0, 0, 0);

        // Set camera zoom to 2x
        this.cameras.main.setZoom(2);

        // Tilemap setup
        const map = this.add.tilemap('tilemap3JSON');
        const tileset = map.addTilesetImage('Game3Tileset', 'tileset3Image');
        const bgLayer = map.createLayer('backgroundLayer', tileset, 0, 0);
        const terrainLayer = map.createLayer('terrainLayer', tileset, 0, 0);
        terrainLayer.setCollisionByProperty({ collides: true });
        
        // Instantiate Danny
        this.Danny = new Player(this, map.widthInPixels/2, map.heightInPixels/2, 'Danny').setScale(0.5);

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