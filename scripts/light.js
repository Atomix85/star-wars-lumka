function AddSunAndShadow(posX, posY, posZ, color, intensity) {
    //Cr�er DirectionalLight + Activer ses shadows
    var light = new THREE.PointLight(color, intensity);
    light.name = "sun";
    light.position.set(posX, posY, posZ);

    // Cast Shadow
    light.castShadow = true;
    
    //Set up shadow properties for the light
    light.shadow.mapSize.width = 1024;  // default 512
    light.shadow.mapSize.height = 1024; // default 512
    light.shadow.camera.near = 0.5;    // default 0.5
    light.shadow.camera.far = 500;     // default 500
    light.shadow.camera.left = - 100;
	light.shadow.camera.right = 100;
	light.shadow.camera.top = 100;
    light.shadow.camera.bottom = - 100;

    scene.add(light);
}

function Shadow(object, bool) {
    // Parametrage des ombres
    object.castShadow = bool;      
    object.receiveShadow = bool;   
    return object;
}

function CreateAmbientLight(color, intensity) {
    var ambientLight = new THREE.AmbientLight(color, intensity);
    ambientLight.name = "ambient";
    scene.add(ambientLight);
}

function AddSpotlight( posX, posY, posZ, color, ActivateGUI, distance, penombre) {
    var light = new THREE.SpotLight(color, 2);
    light.name = "light";

    // Cast Shadow
    light.castShadow = true;

    light.position.set(posX, posY, posZ);
    light.angle = Math.PI / 2;
    light.penumbra = penombre;
    light.decay = 2;
    light.distance = distance;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.near = 10;
    light.shadow.camera.far = 200;
    if (ActivateGUI) {
        //buildGui(light);
    }
    scene.add(light);
}

function buildGui() {
    var panel = new dat.GUI();
    var settings = {Lum : 'Matin',}
    var Lum = panel.add(settings, 'Lum', ['Matin', 'Soir']).name('Lumiere').listen();
    
    Lum.onChange(function (val) {
        var light = scene.getObjectByName("sun");
        var ambient = scene.getObjectByName("ambient");
        scene.remove(light);
        scene.remove(ambient);
        console.log("val =" + val);
        if (val == 'Matin') {
            CreateAmbientLight(0x006622, 0.6);
            AddSunAndShadow(0, 20, 0, 0xf4f472, 2);
        } else {
            CreateAmbientLight(0x86391f, 0.1);
            AddSunAndShadow(0, 20, 0, 0xfb8535, 3);
        }
        render();
    });
    panel.open();
}

function DirGui() {
    var light = scene.getObjectByName("sun");
    var ambient = scene.getObjectByName("ambient");
    gui = new dat.GUI();
    var folder1 = gui.addFolder("Sun");
    var folder2 = gui.addFolder("Ambient");
    var params = {
        'light color': light.color.getHex(),
        intensity: light.intensity,
        bool: light.isDirectionalLight,
        X: light.position.x,
        Y: light.position.y,
        Z: light.position.z,
        Sbool : light.castShadow,
        Shadow: light.shadowDarkness,
    };
    var sets = {
        'light color': ambient.color.getHex(),
        intensity: ambient.intensity,
    }
    folder1.addColor(params, 'light color').onChange(function (val) {
        light.color.setHex(val);
        render();
    });
    folder1.add(params, 'intensity', 0, 10).onChange(function (val) {
        light.intensity = val;
        render();
    });
    folder1.add(params, 'bool', true, false).onChange(function (val) {
        light.isDirectionalLight = val;
        render();
    });
    folder1.add(params, 'X', -500, 500).onChange(function (val) {
        light.position.x = val;
        render();
    });
    folder1.add(params, 'Y', -500, 500).onChange(function (val) {
        light.position.y = val;
        render();
    });
    folder1.add(params, 'Z', -500, 500).onChange(function (val) {
        light.position.z = val;
        render();
    });
    folder1.add(params, 'Sbool', true, false).onChange(function (val) {
        light.castShadow = val;
        render();
    });
    folder2.addColor(sets, 'light color').onChange(function (val) {
        ambient.color.setHex(val);
        render();
    });
    folder2.add(sets, 'intensity', 0, 10).onChange(function (val) {
        ambient.intensity = val;
        render();
    });
    folder1.open();
    folder2.open();
    gui.open();
}