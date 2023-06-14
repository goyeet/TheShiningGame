class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    preload() {
        this.load.path = './assets/';
    }

    create() {

        // fade in from black
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // add title screen text
        let titleConfig = {
            fontFamily: 'Impact',
            fontSize: '42px',
            color: '#000000',
            align: 'left',
            padding: 5,
            fixedWidth: 0
        }
        
        if (!bgMusicActive) {
            bgMusicActive = true;
            this.sound.play('menuMusic', { volume: 0.4, loop: true });
        }
        
        // Title background img
        this.add.image(centerX, centerY, 'title').setOrigin(0.5);

        // Title Text
        this.add.text(game.config.width - tileSize, game.config.height - tileSize, '[1] Game 1\n[2] Game 2\n[3] Game 3\n[C] Credits', titleConfig).setOrigin(1);

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