class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    create() {
        // fade in from black
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // add title screen text
        let titleConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '48px',
            color: '#FFFFFF',
            align: 'center',
            padding: 5,
            fixedWidth: 0
        }

        // Title Text
        this.add.text(centerX, centerY, 'The Shining Game\n\n[1] for Game 1\n[2] for Game 2\n[3] for Game 3\n[C] Credits', titleConfig).setOrigin(0.5);

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    }

    update() {
        // Start game
        if (Phaser.Input.Keyboard.JustDown(key1)) {
            this.scene.start('game1Instr');
        } else if (Phaser.Input.Keyboard.JustDown(key2)) {
            this.scene.start('game2Instr');
        } else if (Phaser.Input.Keyboard.JustDown(key3)) {
            this.scene.start('game3Instr');
        }

        // Go to credits scene
        else if (Phaser.Input.Keyboard.JustDown(keyC)) {
            this.scene.start('creditsScene');
        }
    }
}