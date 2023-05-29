class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    create() {
        // fade in from black
        this.cameras.main.fadeIn(1000, 0, 0, 0);

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
        this.add.text(centerX, centerY - textSpacer, 'The Shining Game', titleConfig).setOrigin(0.5);

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        // Start game
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('game1');    
        }

        // Go to credits scene
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.scene.start('creditsScene');
        }
    }
}