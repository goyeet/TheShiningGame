class Game2Instructions extends Phaser.Scene {
    constructor() {
        super('game2Instr');
    }

    create() {
        // fade in from black
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // background img
        this.add.image(centerX, centerY, 'g2_bg').setOrigin(0.5);

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

        let gameTitle = this.add.text(centerX, centerY - textSpacer*2, 'Ballroom Dodge', BigTextConfig).setOrigin(0.5);
        let description = this.add.text(centerX, centerY + textSpacer, 'Jack has found the ballroom, it is filled with partying guests.\nJack desires to get up and explore the ballroom.\nHe thinks he recognizes someone at the far end of the room.\nReach him without bumping into the other guests...\n\nUse the arrow keys to move.\n\n[SPACE] to Start\n[ESC] for Main Menu', smallTextConfig).setOrigin(0.5);

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
            this.scene.start('game2');
        }
    }
}