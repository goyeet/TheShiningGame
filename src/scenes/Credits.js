class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene');
    }

    create() {
        // fade in from black
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // add title screen text
        let creditsConfig = {
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

        let creditsHeader = this.add.text(centerX, centerY - textSpacer*2, 'Credits', creditsConfig).setOrigin(0.5);
        let credits = this.add.text(centerX, centerY, 'Programmers: Gordon Yee and Emily Gavilanes\nArtists: Gordon Yee and Emily Gavilanes\nDesigners: Gordon Yee and Emily Gavilanes\nScreenshots: The Shining Movie\nMusic: https://pixabay.com/music/\n\n[ESC] for Main Menu', smallTextConfig).setOrigin(0.5);

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start('menuScene');    
        }
    }
}