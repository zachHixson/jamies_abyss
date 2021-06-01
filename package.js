const fs = require('fs');

const BUILD_DIR = './dist';
const EXCLUDE_SCRIPTS = [
    'external_game_data.js'
]

if (!fs.existsSync(BUILD_DIR)){
    fs.mkdirSync(BUILD_DIR);
}

let bitsyData = fs.readFileSync('./jamies_abyss.bitsy', {encoding: 'utf8'});
let htmlData = fs.readFileSync('./jamies_abyss.html', {encoding: 'utf8'});

//merge bitsy + html
let merged = htmlData.replace(/IMPORT jamies_abyss.bitsy/, bitsyData);

//replace <script> tags with script contents
let scriptRefs = [...merged.matchAll(/<script src="(\S+)"><\/script>/g)].map(i => [i[0], i[1]]);

for (let i = 0; i < scriptRefs.length; i++){
    let scriptTag = scriptRefs[i][0];
    let scriptPath = scriptRefs[i][1];
    let fileName = scriptPath.match(/\w+.js/)[0];
    let scriptText = fs.readFileSync(scriptPath, {encoding: 'utf8'});

    if (!EXCLUDE_SCRIPTS.includes(fileName)){
        merged = merged.replace(scriptTag, '<script>' + scriptText + '</script>');
    }
    else{
        merged = merged.replace(scriptTag, '');
    }
}

fs.writeFileSync(BUILD_DIR + "/index.html", merged);

//copy over music folder
let MUSIC_DEST = BUILD_DIR + '/music';
if (!fs.existsSync(MUSIC_DEST)){
    fs.mkdirSync(MUSIC_DEST);
}

fs.readdirSync('./music').forEach(fileName =>{
    fs.copyFileSync('./music/' + fileName, MUSIC_DEST + '/' + fileName);
})