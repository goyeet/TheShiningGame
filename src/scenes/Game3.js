class Game3 extends Phaser.Scene {
    constructor() {
        super('game3');
    }

    preload() {
        this.load.path = './assets/'
        
        this.load.image('tilesetImage', 'tilesets/Game3Tileset.png')
        this.load.tilemapTiledJSON('tilemapJSON', 'tilemaps/Game3.json')

        this.load.image('Danny', 'characters/blackBox.png') // Placeholder sprite

    }

    create() {
        // reset parameters
        this.gameOver = false;

        // fade in from black
        this.cameras.main.fadeIn(2000, 0, 0, 0);

        const map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('Game3Tileset', 'tilesetImage')

        const bgLayer = map.createLayer('backgroundLayer', tileset, 0, 0)
        const terrainLayer = map.createLayer('terrainLayer', tileset, 0, 0)
        
        this.Danny = new Player(this, map.widthInPixels/2, map.heightInPixels/2, 'Danny').setScale(0.5)
        // this.Danny = this.physics.add.sprite(14 * tileSize, 10 * tileSize, 'Danny').setScale(0.75)
        // this.Danny.body.setCollideWorldBounds(true)
        // this.moveSpeed = 2;

        terrainLayer.setCollisionByProperty({ collides: true })
        this.physics.add.collider(this.Danny, terrainLayer)

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        // this.cameras.main.startFollow(this.Danny, true, 0.25, 0.25)
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels)

        // start bg music
        /* this.bgMusic = this.sound.add('bgMusic', { volume: 0.65, loop: true });
        if (bgMusicPlaying === false) {
            this.bgMusic.play();
            bgMusicPlaying = true;
        } */

        /////////////////////////////////////////////////////////
        // Placeholder text (REMOVE)

        // add title screen text
        /* let titleConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '48px',
            color: '#FFFFFF',
            align: 'right',
            padding: 5,
            fixedWidth: 0
        }

        // Title Text
        this.add.text(centerX, centerY, 'Game 3', titleConfig).setOrigin(0.5); */

        //////////////////////////////////////////////////////////
        

        // set up cursor keys
        // cursors = this.input.keyboard.createCursorKeys();
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