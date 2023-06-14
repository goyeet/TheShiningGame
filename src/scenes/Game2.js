class Game2 extends Phaser.Scene {
    constructor() {
        super('game2');
    }

    preload() {
        this.load.path = './assets/';
        
        this.load.image('tileset2Image', 'tilesets/BallroomBackground.png');
        this.load.tilemapTiledJSON('tilemap2JSON', 'tilemaps/Game2.json');

        this.load.image('Jack', 'characters/Jack.png');
        this.load.image('Delbert', 'characters/Delbert.png');
        this.load.image('Guest1', 'characters/Guest1.png');
        this.load.image('Guest2', 'characters/Guest2.png');
        this.load.image('Guest3', 'characters/Guest3.png');

        this.load.audio('game2bgmusic', 'audio/game2_bgm.mp3');

    }

    create() {
        console.log('GAME 2')

        // Reset game flags
        this.gameOverFlag = false;

        // fade in from black
        this.cameras.main.fadeIn(2000, 0, 0, 0);

        // Set camera zoom to 2x
        this.cameras.main.setZoom(2);

        this.cameras.main.setBackgroundColor('#000000');

        // Tilemap setup
        const map = this.add.tilemap('tilemap2JSON');
        const tileset = map.addTilesetImage('BallroomBackground', 'tileset2Image');
        const enemyCollisionLayer = map.createLayer('enemyCollisionLayer', tileset, 0, 0);
        const terrainLayer = map.createLayer('collisionLayer', tileset, 0, 0);
        enemyCollisionLayer.setCollisionByProperty({ collides: true });
        terrainLayer.setCollisionByProperty({ collides: true });
        
        // Instantiate Jack
        this.Jack = new Jack(this, tileSize*26, tileSize*3, 'Jack').setScale(0.5).setOrigin(0,0);

        // Add collider between Jack and tilemap
        this.physics.add.collider(this.Jack, terrainLayer);

        // Have camera follow Jack
        this.cameras.main.startFollow(this.Jack, true, 0.25, 0.25);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // Set world bounds to map dimensions
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);

        // Looping Background Music
        this.bgMusic = this.sound.add('game2bgmusic', { volume: 1, loop: true });
        this.bgMusic.play();

        this.enemyGroup = this.physics.add.group({
            immovable: true,
            setCollideWorldBounds: true,
            runChildUpdate: true    // make sure update runs on group children
        });

        this.physics.add.collider(this.enemyGroup, enemyCollisionLayer);

        this.Delbert = new Enemy(this, tileSize*2, tileSize*6, 'Delbert').setOrigin(0.5).setScale(0.5);
        
        // Array of possible guests
        const guestSkins = ['Guest1', 'Guest2', 'Guest3']

        // spawn in enemies on map
        map.findObject('objectLayer', obj => {
            // Randomly pick guest skin
            var ranNum = Phaser.Math.Between(0, 2);
            this.guest = new Enemy(this, obj.x, obj.y, guestSkins[ranNum]).setScale(0.5);
            this.enemyGroup.add(this.guest);
        });

        // set up cursor keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    // logic that executes when enemy collides with regular guests (Go back to beginning)
    enemyCollision() {
        console.log('collided with guest')
        // fade in from black
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        // spawn Jack back at the bar
        this.Jack.setPosition(tileSize*26, tileSize*3); // bar's x, bar's y
    }

    // When Player collides with Delbert
    gameOver() {
        console.log('collided with Delbert')
        this.gameOverFlag = true;        
        parentScene = 'game2';
        success = true;
        this.bgMusic.stop();
        this.scene.start('gameOver');
    }

    update() {
        if (!this.gameOverFlag) {
            this.Jack.update();
            this.physics.world.overlap(this.Jack, this.enemyGroup, this.enemyCollision, null, this);
            this.physics.world.overlap(this.Jack, this.Delbert, this.gameOver, null, this); // when player overlaps with delbert
        }

    
    }
}
