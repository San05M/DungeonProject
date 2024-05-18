function update(time, delta) {
    if (gameOver) return;

    let vX = 0, vY = 0;

    // Horizontal movement
    if (cursors.left.isDown || joyStick.left || joyStick2.left) vX = -speed;
    else if (cursors.right.isDown || joyStick.right || joyStick2.right) vX = speed;

    // Vertical movement
    if (cursors.up.isDown || joyStick.up || joyStick2.up) vY = -speed;
    else if (cursors.down.isDown || joyStick.down || joyStick2.down) vY = speed;


    // Set and normalize the velocity so that player can't move faster along a diagonal
    player.setVelocity(vX, vY).body.velocity.normalize().scale(speed);

    // Choose the right player's animation
    if (vX < 0) player.anims.play('left', true);
    else if (vX > 0) player.anims.play('right', true);    
    else {
        player.setVelocityX(0);
        player.anims.play('idle', true);
    }
}