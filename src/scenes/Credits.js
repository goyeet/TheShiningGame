class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene');
    }

    create() {
        // fade in from black
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // add title screen text
        let creditsConfig = {
            fontFamily: 'Oswald',
            fontSize: '48px',
            color: '#FFFFFF',
            align: 'center',
            padding: 5,
            fixedWidth: 0
        }

        let smallTextConfig = {
            fontFamily: 'Oswald',
            fontSize: '24px',
            color: '#FFFFFF',
            align: 'center',
            padding: 5,
            lineSpacing: 5,
            fixedWidth: 0
        }

        let creditsText = this.add.text(centerX, centerY - textSpacer, 'Credits', creditsConfig).setOrigin(0.5);
        let credits = this.add.text(centerX, centerY + textSpacer, 'Programmers: Gordon Yee and Emily Gavilanes\nArtist: Gordon Yee and Emily Gavilanes\nDesigner: Gordon Yee and Emily Gavilanes\nSFX: \nMusic: ', smallTextConfig).setOrigin(0.5);
       
        creditsConfig.fontSize = '36px';
        this.leftArrowUI = this.add.sprite(textSpacer * 1.5, centerY).play('leftArrow').setScale(1.75);
        this.titleText = this.add.text(textSpacer * 1.5, centerY + textSpacer, 'Menu', creditsConfig).setOrigin(0.5);

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    }

    update() {
        // check for SPACE bar input
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('select', {volume: 0.8});
            this.scene.start('menuScene');    
        }
    }
}