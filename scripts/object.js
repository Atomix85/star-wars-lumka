// Menger
function createMenger(x, y, z, size, lvl) {
    // si le niveau est � 0 affichage d'un cube simple
    if (lvlMax == 0)
        createCube(0, 0, 0, size);
    //v�rification de l'entr�e pour les appels r�cursifs
    if (lvl > 0 && lvl <= lvlMax && lvl <= 3) {
        var newSize = size / 3;
        var pos = [];
        for (i = -1; i < 2; i++) {
            for (j = -1; j < 2; j++) {
                for (k = -1; k < 2; k++) {
                    // les cubes vides ont au moins 2 coordonn�es � 0, donc une somme <= � 1
                    var sum = Math.abs(i) + Math.abs(j) + Math.abs(k);
                    if (sum > 1) {
                        var t = pos.length;
                        pos[t] = { x: x + i * newSize, y: y + j * newSize, z: z + k * newSize };
                        // quand la fonction a comme param�tre la taille voulue on peut cr�er les bons cubes
                        if (lvl === lvlMax)
                            // cr�ation des diff�rents cubes et ajout au groupe Menger
                            createCube(pos[t].x, pos[t].y, pos[t].z, newSize);
                    }
                }
            }
        }
        var nextLvl = lvl + 1;
        for (t = 0; t < pos.length; t++) {
            // appel r�cusif  pour passer au niveau supp�rieur.
            createMenger(pos[t].x, pos[t].y, pos[t].z, newSize, nextLvl);
        }
    }
    scene.add(Menger);
}
function createCube(x, y, z, size) {
    var texture = new THREE.TextureLoader().load('./textures/crate.jpg');
    var geometry = new THREE.BoxBufferGeometry(size, size, size);
    var material = new THREE.MeshPhongMaterial({ map: texture });
    mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.set(x, y, z);
    Menger.add(mesh);
}

// SkyBox
function CreateSkyBox() {
    var cube = new THREE.CubeGeometry(1000, 1000, 1000);

    var cubeMaterials = [
        // back side
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('./textures/posz.jpg'),
            side: THREE.BackSide
        }),
        // front side
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('./textures/negz.jpg'),
            side: THREE.BackSide
        }),
        // Top side
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('./textures/posy.jpg'),
            side: THREE.BackSide
        }),
        // Bottom side
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('./textures/negy.jpg'),
            side: THREE.BackSide
        }),
        // right side
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('./textures/negx.jpg'),
            side: THREE.BackSide
        }),
        // left side
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('./textures/posx.jpg'),
            side: THREE.BackSide
        })
    ];
    //add cube & materials
    var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);
    var mesh = new THREE.Mesh(cube, cubeMaterial);
    scene.add(mesh);
}

// Terrain
function CreateGround() {
    var grass = new THREE.TextureLoader().load('./textures/grass.png');
    grass.wrapS = THREE.RepeatWrapping;
	grass.wrapT = THREE.RepeatWrapping;
	grass.repeat.set(20,20);
    var size = 25;
    var materialGrass = new THREE.MeshPhongMaterial({ map: grass });
    materialGrass.flatShading = true
    materialGrass.shininess = 0.0;
    var geometry = new THREE.PlaneGeometry(1000 , 1000);
    var planeGrass = new THREE.Mesh(geometry, materialGrass);

    // Receive
    planeGrass.receiveShadow = true;

    planeGrass.rotation.x = convRad(-90);
    scene.add(planeGrass);
        
    
}

// Dolmens
function convRad(angle) {
    angle = angle * Math.PI / 180;
    return angle;
}

function createDolmen() {
    var toit, pieds1, pieds2;
    var textureT = new THREE.TextureLoader().load('textures/rock2.jpg');
    textureT.wrapS = THREE.RepeatWrapping;
    textureT.wrapT = THREE.RepeatWrapping;
    textureT.repeat.set(4, 1);
    var materialT = new THREE.MeshPhongMaterial({ map: textureT });
    var geometryP = new THREE.BoxBufferGeometry(10, 20, 10);

    var textureS = new THREE.TextureLoader().load('textures/rock2.jpg');
    textureS.wrapS = THREE.RepeatWrapping;
    textureS.wrapT = THREE.RepeatWrapping;
    textureS.repeat.set(1, 2);
    var materialS = new THREE.MeshPhongMaterial({ map: textureS });
    var geometryT = new THREE.BoxBufferGeometry(40, 8, 18);

    toit = new THREE.Mesh(geometryT, materialT);
    toit.position.set(0, 22.85, 0);
    toit.receiveShadow = true;
    toit.castShadow = true;

    pieds1 = new THREE.Mesh(geometryP, materialS);
    pieds1.position.set(-10, 11.25, 0);
    pieds1.receiveShadow = true;
    pieds1.castShadow = true;

    pieds2 = new THREE.Mesh(geometryP, materialS);
    pieds2.position.set(10, 11.25, 0);
    pieds2.castShadow = true;
    pieds2.receiveShadow = true;

    dolmen = new THREE.Group();
    dolmen.add(toit);
    dolmen.add(pieds1);
    dolmen.add(pieds2);
    //IsSound(dolmen, 1, false, 'bird4.mp3');
    return dolmen;
}

function createStone() {
    var stonehenge, circleInt, circleExt;
    stonehenge = new THREE.Group();
    circleInt = createCircle(100, 5);
    stonehenge.add(circleInt);
    circleExt = createCircle(175, 12);
    stonehenge.add(circleExt);
    scene.add(stonehenge);
}

function createCircle(rayon, nb) {
    var degree, circle;
    circle = new THREE.Group();
    degree = 360 / nb;

    dolmen = createDolmen();

    for (var i = 0; i < nb; i++) {
        var angle = convRad(i * degree);
        var x = Math.cos(angle) * rayon;
        var z = Math.sin(angle) * rayon;
        var y = 0.05;
        var dolmens = dolmen.clone();
        dolmens.position.set(x, y, z);
        dolmens.rotation.y = convRad(90 - i * degree);
        circle.add(dolmens);
    }
    return circle;
}

function CreateBox(file, size, x, y , z) {
    var texture = new THREE.TextureLoader().load('textures/' + file);
    var material = new THREE.MeshPhongMaterial({ map: texture });
    var geometry = new THREE.BoxBufferGeometry(size, size, size);
    var box = new THREE.Mesh(geometry, material);
    box.position.set(x, y, z);
    return box;
}

function CreateDeathStar(size, x, y, z) {
    var materialMap = new THREE.MeshPhongMaterial({
        specular: 0x333333,
        shininess: 15,
        map: new THREE.TextureLoader().load("./textures/deathstar1.jpg"),
        normalScale: new THREE.Vector2(0.85, 0.85)
    });
    var geometry = new THREE.SphereBufferGeometry(size, size * 2, size * 2)
    y += 1.5 * size;
    deathStar = new THREE.Mesh(geometry, materialMap);
    deathStar.position.set(x, y, z);
    deathStar.rotation.y = 0;
    deathStar.rotation.z = 0.41;
    deathStar.name = "deathStar";
    console.log("dS :" + deathStar.name);

    // Shadow
    Shadow(deathStar, true);
    deathStar.castShadow = false;
    //IsSound(deathStar, "deathStar", 1, false, 'imperialmarch.mp3');

    //AddSpotlight(x, -1, z * 1.5, 0xff0000, false, 100, 0.190);
    
    scene.add(deathStar);
}