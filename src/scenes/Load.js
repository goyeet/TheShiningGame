// https://phasergames.com/using-google-fonts-phaser/
WebFontConfig = {
    google: { families: ["Oswald"] }
    };
    (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
    })();

class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {

        this.load.path = './assets/';
        
        // load graphics assets
        // EX. this.load.image('bubble', 'bubble.png');
        
        

        // load audio assets
        // EX. this.load.audio('select', 'audio/sfx/mixkit-page-back-chime-1108.wav');
    }

    create() {
        // define animations
        /* this.anims.create({
            key: 'swim',
            frames: this.anims.generateFrameNames('flippy', {
                prefix: 'turtle',
                start: 1,
                end: 6,
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: -1      // loop animation
        }); */

        

        // go to Title scene
        this.scene.start('menuScene');
    }
}