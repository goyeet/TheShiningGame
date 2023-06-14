class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOver');
    }

    preload() {
        this.load.path = './assets/';

    }

    create() {

        console.log('GAME OVER');

        // fade in from black
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        let smallTextConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '30px',
            color: '#FFFFFF',
            align: 'center',
            padding: 5,
            lineSpacing: 5,
            fixedWidth: 0
        }

        let largeTextConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '70px',
            color: '#FFFFFF',
            align: 'center',
            padding: 5,
            lineSpacing: 5,
            fixedWidth: 0
        }

        // Scene specific images
        if (parentScene == 'game1') {
            if (!success) { // Game 1 Fail
                this.add.image(centerX, centerY, 'g1_fail').setOrigin(0.5).setScale(2).setDepth(10);
            } else { // Game 1 Win
                this.add.image(centerX, centerY, 'g1_success').setOrigin(0.5).setScale(2).setDepth(10);
            }
        } else if (parentScene == 'game2') {
            if (success) { // Game 2 Win
                this.add.image(centerX, centerY, 'g2_success').setOrigin(0.5).setScale(2).setDepth(10);
            }
        } else {
            if (!success) { // Game 3 Fail
                this.add.image(centerX, centerY, 'g3_fail').setOrigin(0.5).setScale(2).setDepth(10);
            } else { // Game 3 Win
                this.add.image(centerX, centerY, 'g3_success').setOrigin(0.5).setScale(2).setDepth(10);
            }
        }

        // Success/Fail text and song
        if (success) {
            this.add.text(centerX, centerY - textSpacer/2, 'VICTORY', largeTextConfig).setOrigin(0.5).setDepth(101);
            this.sound.play('successMusic', { volume: 0.65, loop: true });
        } else {
            this.add.text(centerX, centerY - textSpacer/2, 'GAME OVER', largeTextConfig).setOrigin(0.5).setDepth(101);
            this.sound.play('failMusic', { volume: 0.65, loop: true });
        }

        // Instructions
        this.add.text(centerX, centerY + textSpacer, '[SPACE] to Play Again\n[ESC] for Main Menu', smallTextConfig).setOrigin(0.5).setDepth(101);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    }

    update() {

        // Go to menu scene
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.game.sound.stopAll();
            this.scene.start('menuScene');
        }

        // Restart Scene
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.game.sound.stopAll();
            this.scene.start(parentScene);
        }
    }
}