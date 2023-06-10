class Game2 extends Phaser.Scene {
    constructor() {
        super('game2');
    }

    preload() {
        this.load.path = './assets/';
        
        // this.load.image('tileset2Image', 'tilesets/PLACEHOLDER.png');
        // this.load.tilemapTiledJSON('tilemap2JSON', 'tilemaps/Game2.json');

        this.load.image('Jack', 'characters/blackBox.png'); // Placeholder sprite
        this.load.image('Delbert', 'characters/redBox.png'); // Placeholder sprite

    }

    create() {
        console.log('GAME 2')

        // Reset game flags
        this.gameOverFlag = false;

        // fade in from black
        this.cameras.main.fadeIn(2000, 0, 0, 0);

        // Set camera zoom to 2x
        // this.cameras.main.setZoom(2);

        this.cameras.main.setBackgroundColor('#202020');

        // Tilemap setup
        // const map = this.add.tilemap('tilemap2JSON');
        // const tileset = map.addTilesetImage('PLACEHOLDERTILESETNAME', 'tileset2Image');
        // const bgLayer = map.createLayer('backgroundLayer', tileset, 0, 0);
        // const terrainLayer = map.createLayer('terrainLayer', tileset, 0, 0);
        // terrainLayer.setCollisionByProperty({ collides: true });
        
        // Instantiate Jack
        this.Jack = new Player(this, game.config.width/2, game.config.width/2, 'Jack');

        // Add collider between Jack and tilemap
        // this.physics.add.collider(this.Jack, terrainLayer);

        // Have camera follow Jack
        // this.cameras.main.startFollow(this.Jack, true, 0.25, 0.25);

        this.cameras.main.setBounds(0, 0, game.config.width, game.config.height);

        // Set world bounds to map dimensions
        this.physics.world.bounds.setTo(0, 0, game.config.width/* map.widthInPixels */, game.config.height/* map.heightInPixels */);

        // start bg music
        /* this.bgMusic = this.sound.add('bgMusic', { volume: 0.65, loop: true });
        if (bgMusicPlaying === false) {
            this.bgMusic.play();
            bgMusicPlaying = true;
        } */

        /* this.enemyGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
 */
        this.enemyGroup = this.physics.add.group({
            immovable: true,
            runChildUpdate: true    // make sure update runs on group children
        });

        // TEMP
        this.guest = new Enemy(this, 100, 100, 'Jack');
        this.guest2 = new Enemy(this, 800, 100, 'Jack');
        this.enemyGroup.add(this.guest);
        this.enemyGroup.add(this.guest2);
        /////////////////

        this.Delbert = new Enemy(this, 400, 300, 'Delbert');

        
        

        // Randomly pick quest skin
        const guestSkins = ['guest1', 'guest1', '']

        // spawn in enemies on map
        this.map.findObject('objectLayer', obj => {
            if (obj.name.includes('enemySpawn')) {
                this.guest = new Enemy(this, obj.x, obj.y, '');
                this.enemyGroup.add(this.guest);
            }
        });
        

        // set up cursor keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    // logic that executes when enemy collides with regular guests
    enemyCollision() {
        console.log('collided with guest')
        // spawn Jack back at the bar
        this.Jack.setPosition(tileSize * 8, tileSize * 5); // bar's x, bar's y
    }

    gameOver() {
        console.log('collided with Delbert')
        this.gameOverFlag = true;
        this.Jack.setVelocity(0,0);
        // display game over screen
        // 
    }

    update() {
        if (!this.gameOverFlag) {
            this.Jack.update();

            this.physics.world.overlap(this.Jack, this.enemyGroup, this.enemyCollision, null, this);
            this.physics.world.overlap(this.Jack, this.Delbert, this.gameOver, null, this);
        }
        

        // Go to menu scene
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start('menuScene');
        }
    }
    
    
}