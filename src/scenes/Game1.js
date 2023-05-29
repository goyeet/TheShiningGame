class Game1 extends Phaser.Scene {
    constructor() {
        super('game1');
    }

    create() {
        // reset parameters
        this.gameOver = false;

        // fade in from black
        this.cameras.main.fadeIn(1000, 0, 0, 0);

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
            fontFamily: 'Oswald',
            fontSize: '48px',
            color: '#FFFFFF',
            align: 'right',
            padding: 5,
            fixedWidth: 0
        }

        // Title Text
        this.add.text(centerX, centerY - textSpacer, 'Game1', titleConfig).setOrigin(0.5);

        //////////////////////////////////////////////////////////
        

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    

    update() {
       
    }
    
}