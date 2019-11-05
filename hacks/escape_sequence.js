let startRadius = 200;
let timerEnd = 23;
let timer;
let timerInterval;

function pickupTorch(){
    shaderParams.radius = startRadius;
    shaderParams.colorMix = true;
    shaderParams.opacity = 70;
}

function startEscape(){
    timer = 0;
    timerInterval = setInterval(function(){escapeLoop()}, 20);
}

function escapeLoop(){
    if (shaderParams.radius <= 0){
        triggerDeath();
    }
    else{
        let fac = timer / (timerEnd * (1000/20));
        shaderParams.radius = startRadius * (-Math.sqrt(fac) + 1);

        timer++;
        console.log(fac)
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
    clearInterval(timerInterval);
    swapItem('finalDoor_01_PERM_SOLID', 'final_door_open_01_PERM');
    swapItem('finalDoor_02_PERM_SOLID', 'final_door_open_02_PERM');
    swapItem('finalDoor_03_PERM_SOLID', 'final_door_open_04_PERM');
    swapItem('finalDoor_04_PERM_SOLID', 'final_door_open_03_PERM');
}

function triggerDeath(){
    clearInterval(timerInterval);
    activateShader(blackout);
    spawnItemInRoom('trg_trap', 4, 8, 'torch_alter');
    spawnItemInRoom('torch', 9, 8, 'torch_alter');
    spawnItemInRoom('trg_startEscape_PERM', 14, 8, 'row_pillars');
    room[getRoomId('hub_02')].tilemap[5][6] = "0";
    room[getRoomId('hub_02')].tilemap[5][9] = "0";
    room[getRoomId('torch_alter')].tilemap[7][13] = "0";
    startSpriteDialog(getSpriteId('death_creature'));
}

function respawn(){
    activateShader(spotlightShader);
}

function triggerEnding(){
    clearInterval(timerInterval);
    deactivateShader();
}