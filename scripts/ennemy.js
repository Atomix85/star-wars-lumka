var ennemy, animMainEnnemy;
var mixerEnnemy;

function initStorm(){
    var loader = new THREE.ColladaLoader( );
	loader.load( 'collada/fache/stormtrooper.dae', function ( collada ) {
    	ennemy = collada.scene;
    	//tree.material = new THREE.MeshPhongMaterial();
    	ennemy.traverse(function(child){
			child.castShadow = true;
   			child.receiveShadow = true;
        });
        ennemy.position.set(Math.random() * 400 -200,0,-200);
        ennemy.rotation.z+=Math.PI;
        ennemy.scale.set(5,5,5);
        scene.add(ennemy);

        var anims = collada.animations;

        mixerEnnemy = new THREE.AnimationMixer(ennemy);
        animMainEnnemy = mixerEnnemy.clipAction(anims[0]);

        animMainEnnemy.play(true, 0);
    } );
}
function updateEnnemyShooter(){
    if(shoot.position.x + 5 > ennemy.position.x && ennemy.position.x > shoot.position.x -5
        && shoot.position.z + 5 > ennemy.position.z && ennemy.position.z > shoot.position.z -5  //AABB
        && 25 > shoot.position.y && shoot.position.y > 10){
        ennemy.position.set(Math.random() * 400 -200,0,-200);
    }
}
function activateAction(){
    animMainEnnemy.play();
}