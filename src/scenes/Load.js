class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xDDDDDD, 1);                  // (color, alpha)
            loadingBar.fillRect(0, centerY, w * value, 30);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        this.load.path = './assets/';
        this.load.image('title', 'title.png');
        
        // Game 1
        this.load.image('g1_bg', 'game1bg.png');
        this.load.image('g1_fail', 'g1_gameover.png');
        this.load.image('g1_success', 'g1_success.png');

        // Game 2
        this.load.image('g2_bg', 'game2bg.png');
        this.load.image('g2_success', 'g2_success.png');

        // Game 3
        this.load.image('g3_bg', 'game3bg.png');
        this.load.image('g3_success', 'g3_success.png');
        this.load.image('g3_fail', 'g3_fail.png');

        // Success/Fail music
        this.load.audio('failMusic', 'audio/game_over_bgm.mp3');
        this.load.audio('successMusic', 'audio/success_bgm.mp3');

        this.load.audio('menuMusic', 'audio/menu_bgm.mp3');
    }

    create() {

        // go to Title scene
        this.scene.start('menuScene');
    }
}