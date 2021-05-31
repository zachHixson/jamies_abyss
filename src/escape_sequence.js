let startRadius = 200;
let timerDuration = 45;
let startTime;
let timerInterval;
let torchesLit = [false, false];

function pickupTorch(){
    shaderParams.radius = startRadius;
    shaderParams.colorMix = true;
    shaderParams.opacity = 70;
}

function startEscape(){
    startTime = new Date().getTime();
    timerInterval = setInterval(function(){escapeLoop()}, 20);
}

function escapeLoop(){
    if (shaderParams.radius <= 0){
        triggerDeath();
    }
    else{
        let curTime = new Date().getTime();
        let fac = (curTime - startTime) / (timerDuration * 1000);
        shaderParams.radius = startRadius * (-Math.sqrt(fac) + 1);
    }
}

function lightLeftTorch(){
    if (!torchesLit[0]){
        let flameId = getTileId('final_flame');
        getRoom().tilemap[5][6] = flameId;
        torchesLit[0] = true;
    }
}

function lightRightTorch(){
    if (!torchesLit[1]){
        let flameId = getTileId('final_flame');
        getRoom().tilemap[5][9] = flameId;
        torchesLit[1] = true;
    }
}

function openDoor(){
    if (torchesLit[0] && torchesLit[1]){
        clearInterval(timerInterval);
        swapItem('finalDoor_01_PERM_SOLID', 'final_door_open_01_PERM');
        swapItem('finalDoor_02_PERM_SOLID', 'final_door_open_02_PERM');
        swapItem('finalDoor_03_PERM_SOLID', 'final_door_open_04_PERM');
        swapItem('finalDoor_04_PERM_SOLID', 'final_door_open_03_PERM');
    }
}

function triggerDeath(){
    clearInterval(timerInterval);
    activateShader(blackout);
    spawnItemInRoom('trg_trap', 4, 8, 'torch_alter');
    spawnItemInRoom('torch', 9, 8, 'torch_alter');
    spawnItemInRoom('trg_startEscape_PERM', 14, 8, 'row_pillars');
    torchesLit[0] = false;
    torchesLit[1] = false;
    room[getRoomId('hub_02')].tilemap[5][6] = "0";
    room[getRoomId('hub_02')].tilemap[5][9] = "0";
    room[getRoomId('torch_alter')].tilemap[7][13] = "0";
    startSpriteDialog(getSpriteId('death_creature'));
}

function respawn(){
    activateShader(spotlightShader);
}

function triggerEnding(){
    deactivateShader();
}