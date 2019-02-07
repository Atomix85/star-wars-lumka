var projectiles = [];

function addProjectiles(object){
    projectiles.push(object);
}
function renderProjectiles(){
    var i;
    for(i = 0; i < projectiles.length; i++){
        scene.add(projectiles[i]);
    }
}