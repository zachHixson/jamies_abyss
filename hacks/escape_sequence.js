let startRadius = 200;
let timer = 20;
let timerInterval;

function pickupTorch(){
    shaderParams.colorMix = true;
    shaderParams.radius = startRadius;
    shaderParams.opacity = 70;
}

function startEscape(){
    timerInterval = setInterval(function(){escapeLoop()}, 20);
}

function escapeLoop(){
    if (shaderParams.radius <= 0){
        triggerDeath();
    }
    else{
        shaderParams.radius -= (startRadius / (timer * (1000/20)));
    }
}

function lightLeftTorch(){
    let flameId = getTileId('final_flame');
    getRoom().tilemap[5][6] = flameId;
}

function lightRightTorch(){
    let flameId = getTileId('final_flame');
    getRoom().tilemap[5][9] = flameId;
}

function openDoor(){
    swapItem('finalDoor_01_PERM_SOLID', 'final_door_open_01_PERM');
    swapItem('finalDoor_02_PERM_SOLID', 'final_door_open_02_PERM');
    swapItem('finalDoor_03_PERM_SOLID', 'final_door_open_04_PERM');
    swapItem('finalDoor_04_PERM_SOLID', 'final_door_open_03_PERM');
}

function triggerDeath(){
    clearInterval(timerInterval);
    console.log("You died");
}

function triggerEnding(){
    clearInterval(timerInterval);
    deactivateShader();
}