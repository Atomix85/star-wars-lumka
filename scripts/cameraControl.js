function cameraControl(time) {
    // Importance du mouvement (� changer pour modifier la vitesse)
    var scale = 700;
    velocity.x -= velocity.x * 10.0 * time;
    velocity.z -= velocity.z * 10.0 * time;
    velocity.y -= 9.8 * 100.0 * time; // 100.0 = mass
    if (moveForward && positionX < max) {
        velocity.z -= scale * time;
        positionX += scale * time;
    }

    if (moveBackward && positionX > -max) {
        velocity.z += scale * time;
        positionX -= scale * time;
    }

    if (moveLeft && positionY < max) {
        velocity.x -= scale * time;
        positionY += scale * time;
    }

    if (moveRight && positionY > -max) {
        velocity.x += scale * time;
        positionY -= scale * time;
    }

    controls.getObject().translateX(velocity.x * time);
    controls.getObject().translateZ(velocity.z * time);
}

function readKeyboard() {
    // d�texion des touches press�es -> vallable pour w/a/s/d /z/q/s/d et les fl�ches
    function onKeyDown(event) {
        switch (event.keyCode) {
            case 90: // z
            case 38: // haut
            case 87: // w
                moveForward = true;
                break;
            case 81:// q
            case 37: // gauche
            case 65: // a
                moveLeft = true;
                break;
            case 40: // bas
            case 83: // s
                moveBackward = true;
                break;
            case 39: // droite
            case 68: // d
                moveRight = true;
                break;
        }
    }
    function onKeyUp(event) {
        switch (event.keyCode) {
            case 90: // z
            case 38: // haut
            case 87: // w
                moveForward = false;
                break;
            case 81:// q
            case 37: // gauche
            case 65: // a
                moveLeft = false;
                break;
            case 40: // bas
            case 83: // s
                moveBackward = false;
                break;
            case 39: // droite
            case 68: // d
                moveRight = false;
                break;
        }
    }
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
}