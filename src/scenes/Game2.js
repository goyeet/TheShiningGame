class Game2 extends Phaser.Scene {
    constructor() {
        super('game2');
    }

    preload() {
        this.load.path = './assets/';
        
        /* this.load.image('tileset2Image', 'tilesets/PLACEHOLDER.png');
        this.load.tilemapTiledJSON('tilemap2JSON', 'tilemaps/Game2.json');

        this.load.image('Jack', 'characters/blackBox.png'); // Placeholder sprite */

    }

    create() {
        console.log('GAME 2')

        // fade in from black
        this.cameras.main.fadeIn(2000, 0, 0, 0);

        // Set camera zoom to 2x
        this.cameras.main.setZoom(2);

        // Tilemap setup
        /* const map = this.add.tilemap('tilemap2JSON');
        const tileset = map.addTilesetImage('PLACEHOLDERTILESETNAME', 'tileset2Image');
        const bgLayer = map.createLayer('backgroundLayer', tileset, 0, 0);
        const terrainLayer = map.createLayer('terrainLayer', tileset, 0, 0);
        terrainLayer.setCollisionByProperty({ collides: true });
        
        // Instantiate Jack
        this.Jack = new Player(this, map.widthInPixels/2, map.heightInPixels/2, 'Jack').setScale(0.5);

        // Add collider between Jack and tilemap
        this.physics.add.collider(this.Jack, terrainLayer);

        // Have camera follow Jack
        this.cameras.main.startFollow(this.Jack, true, 0.25, 0.25);

        // Set world bounds to map dimensions
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels); */

        // start bg music
        /* this.bgMusic = this.sound.add('bgMusic', { volume: 0.65, loop: true });
        if (bgMusicPlaying === false) {
            this.bgMusic.play();
            bgMusicPlaying = true;
        } */

        /////////////////////////////////////////////////////////
        // Placeholder text (REMOVE)

        // add title screen text
        let titleConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '48px',
            color: '#FFFFFF',
            align: 'right',
            padding: 5,
            fixedWidth: 0
        }

        // Title Text
        this.add.text(centerX, centerY, 'Game 2', titleConfig).setOrigin(0.5);

        //////////////////////////////////////////////////////////
        

        // set up cursor keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    

    update() {
        // this.Jack.update();

        // Go to menu scene
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start('menuScene');
        }
    }
    
}