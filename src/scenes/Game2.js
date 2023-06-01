class Game2 extends Phaser.Scene {
    constructor() {
        super('game2');
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
        cursors = this.input.keyboard.createCursorKeys();
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    

    update() {
        // Go to menu scene
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start('menuScene');
        }
    }
    
}