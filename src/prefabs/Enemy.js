class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.parentScene = scene;
        scene.add.existing(this);   //add to existing scene
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.VELOCITY = 75;
        this.chooseDirection = true;
    }
    
    update() {
        // Chooses a direction to move in and moves in that direction every 2 seconds
	    if (this.chooseDirection) {
            // console.log('choosing direction')
            this.chooseDirection = false;
            let ranNum = Phaser.Math.Between(1,4);
            if (ranNum == 1) {
                // move up
                this.setVelocity(0, -this.VELOCITY);
            } else if (ranNum == 2) {
                // move down
                this.setVelocity(0, this.VELOCITY);
            } else if (ranNum == 3) {
                // move left
                this.setVelocity(-this.VELOCITY,0);
            } else {
                // move right
                this.setVelocity(this.VELOCITY,0);            
            }
            this.parentScene.time.delayedCall(500, () => {
                this.chooseDirection = true;
            });
        }
    }
}