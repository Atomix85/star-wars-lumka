function IsCollision(name, x, y, z, d) {
    var object = scene.getObjectByName(name, true);
    var light = scene.getObjectByName("light");
    
    if (object != undefined) {

        var posCam = this.camera.matrixWorld.getPosition().clone();
        var posObj = new THREE.Vector3(x, y, z);
        
        var distance = posCam.distanceTo(posObj);
        if (distance < d) {
            if (object.name = "deathStar") {
                IsSound(deathStar, "deathStar", 1, false, 'breathing2.mp3', false);
            }
            console.log("Object : " + name + " removed");
            Shadow(object, false);
            scene.remove(light);
            scene.remove(object);
        }
    }
}