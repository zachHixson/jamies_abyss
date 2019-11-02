function getItemId(itemName){
	for (let idx in item){
		if (item[idx].name == itemName){
			return item[idx].id;
		}
	}
}

function getItemFromList(itemId){
	for (idx in item){
		if (item[idx].id == itemId){
			return item[idx];
		}
	}
}

function getItemInRoom(itemId){
	for (let i = 0; i < getRoom().items.length; i++){
		if (getRoom().items[i].id == itemId){
			return getRoom().items[i];
		}
	}
}

function spawnItem(itemId, xIn, yIn){
	getRoom().items.push({
		id:itemId,
		x: xIn,
		y: yIn
	});
}

function removeItem(itemName){
	let found = item[getItemId(itemName)];

	for (let i = 0; i < getRoom().items.length; i++){
		if (getRoom().items[i].id == found.id){
			getRoom().items.splice(i, 1);
		}
	}
}

function swapItem(oldItemName, newItemName){
	let oldItem = getItemInRoom(getItemId(oldItemName));
	console.log(oldItem);
	removeItem(oldItemName);
	spawnItem(getItemId(newItemName), oldItem.x, oldItem.y);
}

let dialogChoices = {
	"firstCreatureChoice" :
`{choice
	- Touch it
		... (end "In the inky darkness you reach your hand forward. (p)At first your hand touches nothing but air.(p)You hear a wet gurgling sound followed by an animalistic grunt. Suddenly your hand is engulfed by what feels like an esophagus lined with teeth as your arm is sucked further and further in.(p)You hear a shrieking sound. (p)It sounds strangely human(p)It's only after your head is enveloped that you realize the shrieking was coming from you.")
	- Leave it alone
		You left it alone{touchedCreature = 2}
}`,
	"keyCreatureChoice_investigate" :
`{choice
	- Leave alone
	  You left it alone for now.
	- Investigate further
	  ...{keyCreatureState = 1}(js "startItemDialog(getItemId('key_creature_PERM_SOLID', item))")
}`,
	"keyCreatureChoice_retrieve":
`{choice
	- Walk away
	  This thing makes your skin crawl, so you walk away for now.
	- Attempt to retrieve
	  ...{keyCreatureState = 2}(js "startItemDialog(getItemId('key_creature_PERM_SOLID', item))")
}`,
	"keyCreatureChoice_dig" :
`{choice
	- Stop
	  Seeing this creature in pain is just too much.(p)You decide to stop for now.
	- Keep Digging
	  ...{keyCreatureState = 3}(js "startItemDialog(getItemId('key_creature_PERM_SOLID', item))")
}`
}

function addDialogChoices(dataIn){
	for (let choice in dialogChoices){
		let searchString = RegExp("[(]\(rTag \"" + choice + "\"\)[)]", 'gi');
		dataIn = dataIn.replace(searchString, dialogChoices[choice]);
	}

	return dataIn;
}