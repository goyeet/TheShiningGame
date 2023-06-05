class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   //add to existing scene
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.VELOCITY = 100;
    }
    
    update() {
	    if (keyLEFT.isDown) {
            this.setVelocity(-this.VELOCITY, 0);
        } else if (keyRIGHT.isDown) {
            this.setVelocity(this.VELOCITY, 0);
        } else if (keyUP.isDown) {
            this.setVelocity(0, -this.VELOCITY);
        } else if (keyDOWN.isDown) {
            this.setVelocity(0, this.VELOCITY);
        } else {
            this.setVelocity(0,0);
        }
    }
}