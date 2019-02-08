function AmbientSound() {
    // create a global audio source
    var sound = new THREE.Audio(listener);

    // load a sound and set it as the Audio object's buffer
    var audioLoader = new THREE.AudioLoader();
    audioLoader.load('./sounds/ambient1.mp3', function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.3);
        sound.play();
    });
    console.log('Sound : ' + sound + ' loaded');
}


function BlasterSound() {
    if (boolBlaster) {
        var sound = new THREE.Audio(listener);

        var audioLoader = new THREE.AudioLoader();
        audioLoader.load('./sounds/blaster.mp3', function (buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(false);
            sound.setVolume(1);
            sound.play();
        });
    }
}

function Shout() {
    if (boolBlaster) {
        var sound = new THREE.Audio(listener);

        var audioLoader = new THREE.AudioLoader();
        audioLoader.load('./sounds/dying.mp3', function (buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(false);
            sound.setVolume(1);
            sound.play();
        });
    }
}
function FindRandomSound() {
    var sound;
    var rand = Math.floor((Math.random() * 4));
    switch (rand) {
        case 0:
            sound = 'bird1.mp3';
            break;
        case 1:
            sound = 'bird2.mp3';
            break;
        case 2:
            sound = 'bird3.mp3';
            break;
        case 3:
            sound = 'bird4.mp3';
            break;
    }
    console.log('Sound : ' + sound + ' loaded');
    return sound;
}

function AddSoundEffect(object, name, randomFile, file, loop) {
    if (randomFile) {
        file = FindRandomSound();
    }

    // create the PositionalAudio object (passing in the listener) posX, posY, posZ,
    var sound = new THREE.PositionalAudio(listener);

    // load a sound and set it as the PositionalAudio object's buffer
    var audioLoader = new THREE.AudioLoader();
    audioLoader.load('./sounds/'+ file, function (buffer) {
        sound.setBuffer(buffer);
        sound.setVolume(3);
        sound.setLoop(loop);
        sound.setRefDistance(7);
        sound.play();
    });
    // finally add the sound to the mesh
    sound.name = "sound"; //

    object.add(sound);
    object.name = name;
}

function IsSound(object, name, chance, randomSound, file, loop) {
    var rand = Math.floor((Math.random() * chance));
    if (rand == 0 && randomSound == true) {
        AddSoundEffect(object, name, true, file, loop);
    } else if (rand == 0 && randomSound == false) {
        AddSoundEffect(object, name, false, file, loop);
    }
}