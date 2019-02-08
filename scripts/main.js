var camera, scene, renderer,listener, clock = new THREE.Clock;
var mesh, lvlMax = 2;
//var Menger = new THREE.Group();
var stats = new Stats();
var velocity = new THREE.Vector3();
var moveLeft, moveForward, moveBackward, moveRight;
var controls;
var model;
var positionX = 0, positionY = 0, max = 500;
var deathStar;
var ActivateGUI = true;
var shoot, lightShoot;
var startButton = document.getElementById('startButton');
var boolBlaster = 1;
startButton.addEventListener('click', init);

function init() {
    var overlay = document.getElementById('overlay');
    overlay.remove();

    console.log(42);

    // Camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50 * 1.5;

    // Scene
    scene = new THREE.Scene();
    controls = new THREE.PointerLockControls(camera);
    controls.enabled = true;
    scene.add(controls.getObject());
    scene.fog = new THREE.FogExp2(0xcccccc, 0.002, 5); //brouillard

    // Grid
    var gridHelper = new THREE.GridHelper( 1000, 10 );
    gridHelper.position.y = - 120;
    scene.add(gridHelper);

    // Intégrer HTML
    var container = document.createElement('div');
    document.body.appendChild(container);
    container.appendChild(stats.dom);

    // var loadingManager = new THREE.LoadingManager( function () {
    //     scene.add( grass );
    // } );
    // // collada
    // var loader = new THREE.ColladaLoader( loadingManager );
    // loader.load( 'collada/model.dae', function ( collada ) {
    //     grass = collada.scene;
    //     grass.position.y = 10;
    //     grass.rotation.z = Math.py;
    //     grass.scale(10, 10);
    // } );


    // //Darth vader

    // // loading manager
    // var loadingManager = new THREE.LoadingManager(function () {
    //     scene.add(model);
    // });

    // // collada
    // var loader = new THREE.ColladaLoader(loadingManager);
    // loader.load('model.dae', function (collada) {
    //     model = collada.scene;
    //     // model.scale(10, 10);
    // });

    
    // Son
    listener = new THREE.AudioListener();
    camera.add(listener);
    AmbientSound();
 
    //AddSoundEffect(Menger);

    // Lumière
    //matin
    CreateAmbientLight(0x006622, 0.6);
    AddSunAndShadow(0, 20, 0, 0xf4f472, 2);
    initStorm();
    //soir
    /*
    CreateAmbientLight(0x86391f, 0.1);
    AddSunAndShadow(-225, 200, 5, 0xfb8535, 3);
    */


    // Objets
    CreateSkyBox();
    CreateGround();
    //createMenger(0, 10, 0, size, 1);
    CreateDeathStar(10, 0, 1, 10);
    forestGen(-400,-400,400,400,100);

    var mat = new THREE.LineBasicMaterial();
    mat.color = new THREE.Color(0xFF0000);

    shoot = new THREE.Mesh(new THREE.CubeGeometry(1,10,1), mat);

    scene.add(shoot);

    lightShoot = new THREE.PointLight(new THREE.Color(0xFF0000), 10.5);
    lightShoot.distance = 100;
    scene.add(lightShoot);

    if (ActivateGUI) {
        buildGui();
        ActivateGUI = false;
    }

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
 
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapBias = 0.0039;
    renderer.shadowMapDarkness = 0.5;
    document.body.appendChild(renderer.domElement);
    document.body.appendChild( renderer.domElement );
    // window.addEventListener( 'resize', onWindowResize, false );
    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    animate();
    render();
}



function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate()
{
    
    requestAnimationFrame(animate);
    readKeyboard();
    IsCollision("deathStar", 10, 0, 1, 30);
    render();
    updateEnnemyShooter();
    var time = clock.getDelta();
    mixerEnnemy.update(time);
    
    
}

function render() {
    
    deathStar.rotation.y += 0.005;
    shoot.translateY(10);
    lightShoot.position.set(shoot.position.x, shoot.position.y, shoot.position.z);
    // différence de temps entre cet appel à la clock et le dernier.
    var time = clock.getDelta();
    // lance la fonction qui fait les déplacements
    // console.log(time);
    cameraControl(time);
    
    renderer.render(scene, camera);
    
    stats.update();
}

