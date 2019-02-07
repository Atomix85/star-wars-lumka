function forestGen(xMin, yMin, xMax, yMax, nb){

	var i;
	var loadingManager = new THREE.LoadingManager( function () {
    	   	for (i = 0; i < nb;i++){
				var xPos = Math.random() * (xMax-xMin) + xMin;
				var yPos = Math.random() * (yMax-yMin) + yMin;
				var ratioScale = Math.random()*15 + 2;
				
				tree.position.x = xPos;
    			tree.position.z = yPos;
    			tree.scale.set(ratioScale,ratioScale*2,ratioScale);
    			scene.add(tree.clone());
    		}

    } );
    var loader = new THREE.ColladaLoader( loadingManager );
	loader.load( 'collada/tree.dae', function ( collada ) {
    	tree = collada.scene;
    	//tree.material = new THREE.MeshPhongMaterial();
    	tree.traverse(function(child){
			child.castShadow = true;
   			child.receiveShadow = true;
		});	
    } );
	
}