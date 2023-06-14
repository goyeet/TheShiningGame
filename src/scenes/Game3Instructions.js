class Game3Instructions extends Phaser.Scene {
    constructor() {
        super('game3Instr');
    }

    create() {
        // fade in from black
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // background img
        this.add.image(centerX, centerY, 'g3_bg').setOrigin(0.5);

        let BigTextConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '48px',
            color: '#FFFFFF',
            align: 'center',
            padding: 5,
            fixedWidth: 0
        }

        let smallTextConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '24px',
            color: '#FFFFFF',
            align: 'center',
            padding: 5,
            lineSpacing: 5,
            fixedWidth: 0
        }

        let gameTitle = this.add.text(centerX, centerY - textSpacer*2, 'Maze Chase', BigTextConfig).setOrigin(0.5);
        let description = this.add.text(centerX, centerY + textSpacer, 'Danny ran into the Overlook Maze to escape his crazy father Jack.\nHowever, he must escape and find the exit before he freezes to death.\nEscape the maze before time runs out...\n\nUse the arrow keys to move.\n\n[SPACE] to Start\n[ESC] for Main Menu', smallTextConfig).setOrigin(0.5);

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start('menuScene');    
        }

        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            bgMusicActive = false;
            this.game.sound.stopAll();
            this.scene.start('game3');    
        }
    }
}