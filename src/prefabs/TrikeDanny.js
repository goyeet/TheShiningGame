class TrikeDanny extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   //add to existing scene
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.VELOCITY = 100;
    }
    
    update() {
	    if (keyLEFT.isDown) {
            this.play('pedal', true);
            this.setVelocity(-this.VELOCITY, 0);
            this.setAngle(270);
        } else if (keyRIGHT.isDown) {
            this.play('pedal', true);
            this.setVelocity(this.VELOCITY, 0);
            this.setAngle(90);
        } else if (keyUP.isDown) {
            this.play('pedal', true);
            this.setVelocity(0, -this.VELOCITY);
            this.setAngle(0);
        } else if (keyDOWN.isDown) {
            this.play('pedal', true);
            this.setVelocity(0, this.VELOCITY);
            this.setAngle(180);
        } else {
            this.setVelocity(0,0);
            this.anims.pause();
        }
    }
}