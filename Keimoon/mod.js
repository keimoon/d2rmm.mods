// AUTOMAGIC
// Make amazon auto magic mod easier to appear

function installAutoMagicMods() {
	console.debug("Installing automagic.txt");
	const automagicFile = 'global\\excel\\automagic.txt';
	let automagic = D2RMM.readTsv(automagicFile);

	const names = [
		'Fletcher\'s',
		'Bowyer\'s',
		'Archer\'s',
		'Harpoonist\'s',
		'Spearmaiden\'s',
		'Lancer\'s'
	];

	const midLevels = [
		'Fletcher\'s',
		'Harpoonist\'s'
	];

	const highLevels = [
		'Bowyer\'s',
		'Spearmaiden\'s'
	];

	automagic.rows.forEach((row) => {
		if (names.includes(row.Name)) {
			row.frequency = '200';
		}
		if (midLevels.includes(row.Name)) {
			row.maxlevel = '39';
		}
		if (highLevels.includes(row.Name)) {
			row.maxlevel = '59';
		}
	});

	D2RMM.writeTsv(automagicFile, automagic);
}

// ARMOR
// Set same rarity for all armors

function installArmorMods() {
	console.debug("Installing armor.txt");
	const armorFile = 'global\\excel\\armor.txt';
	let armor = D2RMM.readTsv(armorFile);

	armor.rows.forEach((row) => {
		row.rarity = '1';
	});

	D2RMM.writeTsv(armorFile, armor);
}

// WEAPON
// Set same rarity for all weapons

function installWeaponMods() {
	console.debug("Installing weapons.txt");
	const weaponFile = 'global\\excel\\weapons.txt';
	let weapon = D2RMM.readTsv(weaponFile);

	weapon.rows.forEach((row) => {
		row.rarity = '1';
	});

	D2RMM.writeTsv(weaponFile, weapon);
}

// CHARSTAT
// Increase Light Radius

function installCharStatsMods() {
	console.debug("Installing charstats.txt");
	const charStatsFile = 'global\\excel\\charstats.txt';
	let charStats = D2RMM.readTsv(charStatsFile);

	charStats.rows.forEach((row) => {
		if (row.LightRadius != '') {
			row.LightRadius = 18;
		}
	});

	D2RMM.writeTsv(charStatsFile, charStats);
}

// ITEMTYPES
// Enable rare for charms

function installItemTypes() {
	console.debug("Installing itemtypes.txt");
	const itemTypesFile = 'global\\excel\\itemtypes.txt';
	let itemTypes = D2RMM.readTsv(itemTypesFile);

	itemTypes.rows.forEach((row) => {
		if (row.ItemType.includes('Charm')) {
			row.Rare = '1';
		}
	});

	D2RMM.writeTsv(itemTypesFile, itemTypes);
}

// SKILLS
// Bigger, badder skills

function installSkillMods() {
	console.debug("Installing skill mods");
	const missileFile = 'global\\excel\\missiles.txt';
	let missile = D2RMM.readTsv(missileFile);
	const skillFile = 'global\\excel\\skills.txt';
	let skill = D2RMM.readTsv(skillFile);

	changeMissileSpeed(missile);
	changeSorceressSkill(skill, missile);
	changeAssassinSkill(skill, missile);
	changeBarbarianSkill(skill, missile);

	D2RMM.writeTsv(missileFile, missile);
	D2RMM.writeTsv(skillFile, skill);
}

function changeMissileSpeed(missile) {
	console.debug("Changing missile speed");

	const vels = new Map([
		['firearrow', '96'],
		['explodingarrow', '96'],
		['firebolt', '80'],
		['fireball', '80'],
		['freezingarrow', '48'],
		['glacialspike', '20'],
		['poisonnova', '40'],
		['lightningfury', '80'],
		['multipleshotarrow', '48'],
		['multipleshotbolt', '48'],
		['furylightning', '80'],
		['frozenorb', '30'],
		['frozenorbbolt', '30'],
		['frozenorbnova', '48'],
		['bomb in air', '30'],
		['moltenboulder', '16'],
		['firestormmaker', '32'],
		['strafearrow', '48'],
		['strafebolt', '48'],
		['wake of destruction maker', '20'],
		['wake of destruction', '16'],
		['sentrylightningbolt', '45']
	]);
	missile.rows.forEach((row) => {
		let newVel = vels.get(row.Missile);
		if (newVel != undefined) {
			row.Vel = newVel;
			row.MaxVel = newVel;
		}
	});
}

// SORCERESS SKILLS

function changeSorceressSkill(skill, missile) {
	console.debug("Changing Sorceress skills");
	skill.rows.forEach((row) => {
		changeSorcSkillFireBall(row);
		changeSorcSkillMeteor(row);
	});
	missile.rows.forEach((row) => {
		changeSorcMissileMeteor(row);
	});
}

function changeSorcSkillFireBall(row) {
	if (row.skill == 'Fire Ball') {
		row.Param1 = '30';
	}
}

function changeSorcSkillMeteor(row) {
	if (row.skill == 'Meteor') {
		row.Param1 = '30';
		row.LineOfSight = '';
		row.localdelay = '';
		row.globaldelay = '';
	}
}

function changeSorcMissileMeteor(row) {
	if (row.Missile == 'meteor') {
		row.Range = '15';
	}
	if (row.Missile == 'meteorcenter') {
		row.Range = '15';
		row.CltParam1 = '14';
	}
}

// ASSASSIN SKILLS
function changeAssassinSkill(skill, missile) {
	console.debug("Changing Assassin skills");
	skill.rows.forEach((row) => {
		if (row.skill == 'Fire Trauma') {
			row.Param1 = '30';
		}
		if (row.skill == 'Tiger Strike') {
			row.Param3 = '10000';
		}
		if (row.skill == 'Quickness') {
			row.Param5 = '90000';
		}
		if (row.skill == 'Fists of Fire') {
			row.Param1 = '30';
		}
		if (row.skill == 'Wake of Fire Sentry') {
			row.Param1 = '30';
		}
		if (row.skill == 'Wake Of Destruction Sentry') {
			row.Param8 = '30';
		}
		if (row.skill == 'Cobra Strike') {
			row.Param3 = '10000';
		}
		if (row.skill == 'Dragon Tail') {
			row.Param3 = '30';
			row.Param4 = '0';
		}
		if (row.skill == 'Lightning Sentry') {
			row.Param1 = '30';
		}
		if (row.skill == 'Lightning Sentry') {
			row.Param1 = '30';
		}
		if (row.skill == 'sentry lightning') {
			row.Param8 = '30';
		}
		if (row.skill == 'Blades of Ice') {
			row.Param1 = '30';
			row.Param2 = '30';
		}
		if (row.skill == 'Royal Strike') {
			row.Param1 = '30';
			row.Param2 = '30';
			row.Param5 = '64';
		}
	});
	missile.rows.forEach((row) => {
		if (row.Missile == 'wake of destruction maker') {
			row.Range = '40';
		}
		if (row.Missile == 'wake of destruction') {
			row.Range = '30';
		}
		if (row.Missile == 'sentrylightningbolt') {
			row.Range = '40';
		}
	});
}

// BARBARIAN SKILL
function changeBarbarianSkill(skill, missile) {
	console.debug("Changing Barbarian skills");
	skill.rows.forEach((row) => {
		if (row.skill == 'Battle Orders') {
			row.Param1 = '90000';
		}
		if (row.skill == 'Battle Command') {
			row.Param1 = '90000';
		}
	});
	missile.rows.forEach((row) => {
	});
}

// TREASURE CLASSES
// Make high level items easier to appear and more predictable

function installTreasureClassMod() {
	console.debug("Installing Treasure class");
	const treasureClassFile = 'global\\excel\\treasureclassex.txt';
	let treasureClass = D2RMM.readTsv(treasureClassFile);

	treasureClass.rows.forEach((row) => {
		changeRuneProb(row);
		changeItemsProb(row);
		changeChampionItemsProb(row);
		changeCommonBossesProb(row);
		changePandemoniumKeysProb(row);
		changeSpecialDrops(row);
		changeCountessRunesDrop(row);
	});

	D2RMM.writeTsv(treasureClassFile, treasureClass);
}

// Make high runes appear easier
function changeRuneProb(row) {
	const name = row['Treasure Class'];
	if (name.startsWith('Runes')) {
		row.Prob1 = '1';
		row.Prob2 = '1';
		if (name == 'Runes 1' || name == 'Runes 7' || name == 'Runes 13') {
			row.Prob3 = '';
		} else if (name == 'Runes 2' || name == 'Runes 8' || name == 'Runes 14') {
			row.Prob3 = '2';
		} else if (name == 'Runes 3' || name == 'Runes 9' || name == 'Runes 15') {
			row.Prob3 = '4';
		} else if (name == 'Runes 4' || name == 'Runes 10' || name == 'Runes 16') {
			row.Prob3 = '6';
		} else if (name == 'Runes 5' || name == 'Runes 11') {
			row.Prob3 = '8';
		} else if (name == 'Runes 6' || name == 'Runes 12') {
			row.Prob3 = '10';
		} else if (name == 'Runes 17') {
			row.Prob2 = '7';
		}
	}
}

// Make high level items easier to drop at high level areas
function changeItemsProb(row) {
	const name = row['Treasure Class'];
	if (name.startsWith('Act') && name.includes('Equip')) {
		if (row.Prob9 != '') {
			row.Prob9 = Math.floor(parseInt(row.Prob9) / 10);
		}
	}
	if (name.startsWith('Act') && name.includes('Melee')) {
		if (row.Prob9 != '') {
			row.Prob9 = Math.floor(parseInt(row.Prob9) / 10);
		}
	}
	if (name.startsWith('Act') && name.includes('Bow')) {
		if (row.Prob9 != '') {
			row.Prob9 = Math.floor(parseInt(row.Prob9) / 10);
		}
	}
}

// Make champions and uniques drop better items
function changeChampionItemsProb(row) {
	const name = row['Treasure Class'];
	if (name.startsWith('Act') && name.includes('Citem')) {
		row.Unique = '1000';
		row.Rare = '1000';
		row.Prob1 = '0'; // Dont drop gold
	}
	if (name.startsWith('Act') && name.includes('Uitem')) {
		row.Unique = '1000';
		row.Rare = '1000';
	}
	if (name.startsWith('Act') && name.includes('Super') && !name.includes('Desecrated')) {
		row.Unique = '1000';
		row.Rare = '1000';
	}
}

// Change common bosses items drop
function changeCommonBossesProb(row) {
	const name = row['Treasure Class'];
	if (name.startsWith('Andariel') ||
		name.startsWith('Duriel') ||
		name.startsWith('Radament') ||
		name.startsWith('Mephisto') ||
		name.startsWith('Diablo') ||
		name.startsWith('Summoner') ||
		name.startsWith('Council') ||
		name.startsWith('Haphesto') ||
		name.startsWith('Nihlathak') ||
		name.startsWith('Baal') ||
		name.startsWith('Blood Raven') ||
		name.startsWith('Izual') ||
		name.startsWith('Cow King')
	   ) {
		row.NoDrop = '0';
		if (row.Unique != '') {
			row.Unique = '1024';
		}
		if (row.Set != '') {
			row.Set = '300';
		}
		if (row.Rare != '') {
			row.Rare = '1024';
		}
		if (row.Item1.includes('gld') || row.Item1.includes('tsc')) {
			row.Prob1 = '0';
		}
	}
}

// Change drop for mob that drop pandemonium keys
function changePandemoniumKeysProb(row) {
	const name = row['Treasure Class'];
	if (name == 'Summoner (H)') {
		row.Picks = '3'
		let found = false;
		for (i = 1; i <= 10; i++) {
			if (found) {
				break;
			}
			if (row['Item' + i] == 'pk2') {
				found = true;
				row['Prob' + i] = '1';
			} else {
				row['Prob' + i] = '0';
			}
		}
	}
	if (name == 'Smith (H)') {
		row.Picks = '3'
		let found = false;
		for (i = 1; i <= 10; i++) {
			if (found) {
				break;
			}
			if (row['Item' + i] == '') {
				found = true;
				row['Item' + i] = 'pk3';
				row['Prob' + i] = '1';
			} else {
				row['Prob' + i] = '0';
			}
		}
	}
	if (name == 'Izual (H)') {
		row.Picks = '3'
		let found = false;
		for (i = 1; i <= 10; i++) {
			if (found) {
				break;
			}
			if (row['Item' + i] == '') {
				found = true;
				row['Item' + i] = 'pk1';
				row['Prob' + i] = '1';
			} else {
				row['Prob' + i] = '0';
			}
		}
	}
}

// Change special drops for some mobs
function changeSpecialDrops(row) {
	const name = row['Treasure Class'];
	if (name == 'Haphesto') {
		row.Picks = 6;
		row.Item2 = 'Perfect Gem';
		for (i = 3; i <= 10; i++) {
			if (row['Prob' + i] != '') {
				row['Prob' + i] = 0;
			}
		}
	}
	if (name == 'Haphesto (N)') {
		row.Picks = 6;
		row.Item2 = 'Perfect Gem';
		for (i = 3; i <= 10; i++) {
			if (row['Prob' + i] != '') {
				row['Prob' + i] = 0;
			}
		}
	}
	if (name == 'Haphesto (H)') {
		row.Picks = 6;
		row.Item2 = 'amu';
		for (i = 3; i <= 10; i++) {
			if (row['Prob' + i] != '') {
				row['Prob' + i] = 0;
			}
		}
	}
	if (name == 'Blood Raven (H)') {
		row.Picks = '-3';
		row.Item1 = 'The Stone of Jordan';
		row.Prob1 = '1';
		row.Item2 = 'Bul Katho\'s Wedding Band';
		row.Prob2 = '1';
		row.Item3 = 'Raven Frost';
		row.Prob3 = '1';
		for (i = 4; i <= 10; i++) {
			row['Item' + i] = '';
			row['Prob' + i] = '';
		}
	}
	if (name == 'Cow' || name == 'Cow (N)' || name == 'Cow (H)') {
		row.NoDrop = '22';
		row.Prob1 = '0';
		row.Prob3 = '0';
	}
}

function changeCountessRunesDrop(row) {
	const name = row['Treasure Class'];
	if (name == 'Countess Rune') {
		row.Picks = 1;
		row.NoDrop = 0;
		row.Item1 = 'Runes 6';
	}
	if (name == 'Countess Rune (N)') {
		row.Picks = 1;
		row.NoDrop = 0;
		row.Item1 = 'Runes 12';
	}
	if (name == 'Countess Rune (H)') {
		row.Picks = 1;
		row.NoDrop = 0;
		row.Item1 = 'Runes 17';
	}
	if (name == 'Countess' || name == 'Countess (N)' || name == 'Countess (H)') {
		row.Picks = 6;
		row.NoDrop = 0;
		row.Prob1 = 0;
	}
}

// SUPERUNIQUES

function installSuperUniquesMod() {
	console.debug("Installing superuniques.txt");
	const superUniquesFile = 'global\\excel\\superuniques.txt';
	let superunique = D2RMM.readTsv(superUniquesFile);

	superunique.rows.forEach((row) => {
		changeRakanishuTC(row);
	});

	D2RMM.writeTsv(superUniquesFile, superunique);
}

// Change Rakanishu to use Countess TC
function changeRakanishuTC(row) {
	if (row.Superunique == 'Rakanishu') {
		row['TC'] = 'Countess';
		row['TC(N)'] = 'Countess (N)';
		row['TC(H)'] = 'Countess (H)';
	}
}

// CUBE

function installCubeMods() {
	console.debug("Installing cubemain.txt");
	const cubemainFile = 'global\\excel\\cubemain.txt';
	let cubemain = D2RMM.readTsv(cubemainFile);

	cubemain.rows.forEach((row) => {
		changeConflictRecipes(row);
	});

	addCubeRecipes(cubemain);

	D2RMM.writeTsv(cubemainFile, cubemain);
}

function changeConflictRecipes(row) {
	if (row.description.startsWith('1 Spear')) {
		row.numinputs = 3;
		row['input 3'] = 'hpot';
	}
}

function addCubeRecipes(cubemain) {
	addSocketRecipes(cubemain);
	addItemRerollRecipes(cubemain);
	addMakeNormalItemRecipes(cubemain);
	addMakeRareItemRecipes(cubemain);
	addMakeUniqueItemRecipes(cubemain);
	addMakeEtherealItemRecipes(cubemain);
	addCharmUpgradeRecipes(cubemain);
}

function addSocketRecipes(cubemain) {
	const recipes = [
		{
			'description': '(KM) 1 El Rune + 1 Amethyst (Any) + 1 Normal Weapon -> Socketed Weapon (2)',
			'enabled': 1,
			'version': 100,
			'numinputs': 3,
			'input 1': 'weap,nor',
			'input 2': 'r01',
			'input 3': 'gema',
			'output': 'useitem',
			'mod 1': 'sock',
			'mod 1 min': 2,
			'mod 1 max': 2,
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Eld Rune + 1 Amethyst (Any) + 1 Normal Weapon -> Socketed Weapon (3)',
			'enabled': 1,
			'version': 100,
			'numinputs': 3,
			'input 1': 'weap,nor',
			'input 2': 'r02',
			'input 3': 'gema',
			'output': 'useitem',
			'mod 1': 'sock',
			'mod 1 min': 3,
			'mod 1 max': 3,
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Tir Rune + 1 Amethyst (Any) + 1 Normal Weapon -> Socketed Weapon (4)',
			'enabled': 1,
			'version': 100,
			'numinputs': 3,
			'input 1': 'weap,nor',
			'input 2': 'r03',
			'input 3': 'gema',
			'output': 'useitem',
			'mod 1': 'sock',
			'mod 1 min': 4,
			'mod 1 max': 4,
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Nef Rune + 1 Amethyst (Any) + 1 Normal Weapon -> Socketed Weapon (5)',
			'enabled': 1,
			'version': 100,
			'numinputs': 3,
			'input 1': 'weap,nor',
			'input 2': 'r04',
			'input 3': 'gema',
			'output': 'useitem',
			'mod 1': 'sock',
			'mod 1 min': 5,
			'mod 1 max': 5,
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Eth Rune + 1 Amethyst (Any) + 1 Normal Weapon -> Socketed Weapon (6)',
			'enabled': 1,
			'version': 100,
			'numinputs': 3,
			'input 1': 'weap,nor',
			'input 2': 'r05',
			'input 3': 'gema',
			'output': 'useitem',
			'mod 1': 'sock',
			'mod 1 min': 6,
			'mod 1 max': 6,
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 El Rune + 1 Topaz (Any) + 1 Normal Torso Armor -> Socketed Torso Armor (2)',
			'enabled': 1,
			'version': 100,
			'numinputs': 3,
			'input 1': 'tors,nor',
			'input 2': 'r01',
			'input 3': 'gemt',
			'output': 'useitem',
			'mod 1': 'sock',
			'mod 1 min': 2,
			'mod 1 max': 2,
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Eld Rune + 1 Topaz (Any) + 1 Normal Torso Armor -> Socketed Torso Armor (3)',
			'enabled': 1,
			'version': 100,
			'numinputs': 3,
			'input 1': 'tors,nor',
			'input 2': 'r02',
			'input 3': 'gemt',
			'output': 'useitem',
			'mod 1': 'sock',
			'mod 1 min': 3,
			'mod 1 max': 3,
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Tir Rune + 1 Topaz (Any) + 1 Normal Torso Armor -> Socketed Torso Armor (4)',
			'enabled': 1,
			'version': 100,
			'numinputs': 3,
			'input 1': 'tors,nor',
			'input 2': 'r03',
			'input 3': 'gemt',
			'output': 'useitem',
			'mod 1': 'sock',
			'mod 1 min': 4,
			'mod 1 max': 4,
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 El Rune + 1 Sapphire (Any) + 1 Normal Helm -> Socketed Helm (2)',
			'enabled': 1,
			'version': 100,
			'numinputs': 3,
			'input 1': 'helm,nor',
			'input 2': 'r01',
			'input 3': 'gems',
			'output': 'useitem',
			'mod 1': 'sock',
			'mod 1 min': 2,
			'mod 1 max': 2,
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Eld Rune + 1 Sapphire (Any) + 1 Normal Helm -> Socketed Helm (3)',
			'enabled': 1,
			'version': 100,
			'numinputs': 3,
			'input 1': 'helm,nor',
			'input 2': 'r02',
			'input 3': 'gems',
			'output': 'useitem',
			'mod 1': 'sock',
			'mod 1 min': 3,
			'mod 1 max': 3,
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 El Rune + 1 Ruby (Any) + 1 Normal Shield -> Socketed Shield (2)',
			'enabled': 1,
			'version': 100,
			'numinputs': 3,
			'input 1': 'shld,nor',
			'input 2': 'r01',
			'input 3': 'gemr',
			'output': 'useitem',
			'mod 1': 'sock',
			'mod 1 min': 2,
			'mod 1 max': 2,
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Eld Rune + 1 Ruby (Any) + 1 Normal Shield -> Socketed Shield (3)',
			'enabled': 1,
			'version': 100,
			'numinputs': 3,
			'input 1': 'shld,nor',
			'input 2': 'r02',
			'input 3': 'gemr',
			'output': 'useitem',
			'mod 1': 'sock',
			'mod 1 min': 3,
			'mod 1 max': 3,
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Tir Rune + 1 Ruby (Any) + 1 Normal Shield -> Socketed Shield (4)',
			'enabled': 1,
			'version': 100,
			'numinputs': 3,
			'input 1': 'shld,nor',
			'input 2': 'r03',
			'input 3': 'gemr',
			'output': 'useitem',
			'mod 1': 'sock',
			'mod 1 min': 4,
			'mod 1 max': 4,
			'*eol\r': 0
		}
	];
	cubemain.rows.push(...recipes);
}

function addItemRerollRecipes(cubemain) {
	const recipes = [
		{
			'description': '(KM) 1 Rare Item + 1 Health Potion -> 1 Rerolled Rare Item to specific level',
			'enabled': 1,
			'version': 100,
			'numinputs': 2,
			'input 1': 'any,rar',
			'input 2': 'hpot',
			'output': 'usetype,rar',
			'lvl': config.cubeconfigitemlevel,
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Rare Item + 1 Mana Potion  -> 1 Rerolled Rare Item (125% level)',
			'enabled': 1,
			'version': 100,
			'numinputs': 2,
			'input 1': 'any,rar',
			'input 2': 'mpot',
			'output': 'usetype,rar',
			'plvl': '125',
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Rare Item + 1 Town Portal Scroll -> 1 Rerolled Rare Item (150% level)',
			'enabled': 1,
			'version': 100,
			'numinputs': 2,
			'input 1': 'any,rar',
			'input 2': 'tsc',
			'output': 'usetype,rar',
			'plvl': '150',
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Rare Item + 1 Identification Scroll -> 1 Rerolled Rare Item (200% level)',
			'enabled': 1,
			'version': 100,
			'numinputs': 2,
			'input 1': 'any,rar',
			'input 2': 'isc',
			'output': 'usetype,rar',
			'plvl': '200',
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Unique Item + 1 Health Potion -> 1 Rerolled Unique Item',
			'enabled': 1,
			'version': 100,
			'numinputs': 2,
			'input 1': 'any,uni',
			'input 2': 'hpot',
			'output': 'usetype,uni',
			'lvl': '99',
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Normal Weapon + 1 Identification Scroll -> 1 Rerolled Normal Item',
			'enabled': 1,
			'version': 100,
			'numinputs': 2,
			'input 1': 'weap,nor',
			'input 2': 'isc',
			'output': 'usetype,nor',
			'lvl': '99',
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Normal Armor + 1 Identification Scroll -> 1 Rerolled Normal Item',
			'enabled': 1,
			'version': 100,
			'numinputs': 2,
			'input 1': 'armo,nor',
			'input 2': 'isc',
			'output': 'usetype,nor',
			'lvl': '99',
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Magic Item + 1 Identification Scroll -> 1 Rerolled Magic Item',
			'enabled': 1,
			'version': 100,
			'numinputs': 2,
			'input 1': 'any,mag',
			'input 2': 'isc',
			'output': 'usetype,mag',
			'lvl': '99',
			'*eol\r': 0
		}
	];
	cubemain.rows.push(...recipes);
}

function addMakeNormalItemRecipes(cubemain) {
	const recipes = [
		{
			'description': '(KM) 1 Arrow + 1 Rare Item -> Normal Item',
			'enabled': 1,
			'version': 100,
			'numinputs': 2,
			'input 1': 'any,rar',
			'input 2': 'aqv',
			'output': 'usetype,nor',
			'ilvl': '100',
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Bolt + 1 Magic Item -> Normal Item',
			'enabled': 1,
			'version': 100,
			'numinputs': 2,
			'input 1': 'any,mag',
			'input 2': 'cqv',
			'output': 'usetype,nor',
			'ilvl': '100',
			'*eol\r': 0
		}
	];
	cubemain.rows.push(...recipes);
}

function addMakeRareItemRecipes(cubemain) {
	const recipes = [
		{
			'description': '(KM) 1 Normal Armor + 1 Rejuvenation Potion -> 1 High Quality Rare Armor',
			'enabled': 1,
			'version': 100,
			'numinputs': 2,
			'input 1': 'armo,nor',
			'input 2': 'rvs',
			'output': 'usetype,rar',
			'plvl': '125',
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Normal Weapon + 1 Rejuvenation Potion -> 1 High Quality Rare Weapon',
			'enabled': 1,
			'version': 100,
			'numinputs': 2,
			'input 1': 'weap,nor',
			'input 2': 'rvs',
			'output': 'usetype,rar',
			'plvl': '125',
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Normal Armor + 1 Diamond (Any) -> 1 High Quality Rare Armor',
			'enabled': 1,
			'version': 100,
			'numinputs': 2,
			'input 1': 'armo,nor',
			'input 2': 'gemd',
			'output': 'usetype,rar',
			'plvl': '125',
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Normal Weapon + 1 Diamond (Any) -> 1 High Quality Rare Weapon',
			'enabled': 1,
			'version': 100,
			'numinputs': 2,
			'input 1': 'weap,nor',
			'input 2': 'gemd',
			'output': 'usetype,rar',
			'plvl': '125',
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Normal Armor + 1 Emerald (Any) -> 1 High Quality Rare Armor',
			'enabled': 1,
			'version': 100,
			'numinputs': 2,
			'input 1': 'armo,nor',
			'input 2': 'geme',
			'output': 'usetype,rar',
			'plvl': '125',
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Normal Weapon + 1 Emerald (Any) -> 1 High Quality Rare Weapon',
			'enabled': 1,
			'version': 100,
			'numinputs': 2,
			'input 1': 'weap,nor',
			'input 2': 'geme',
			'output': 'usetype,rar',
			'plvl': '125',
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Normal Armor + 1 Jewel -> 1 High Quality Rare Armor',
			'enabled': 1,
			'version': 100,
			'numinputs': 2,
			'input 1': 'armo,nor',
			'input 2': 'jew',
			'output': 'usetype,rar',
			'plvl': '125',
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Normal Weapon + 1 Jewel -> 1 High Quality Rare Weapon',
			'enabled': 1,
			'version': 100,
			'numinputs': 2,
			'input 1': 'weap,nor',
			'input 2': 'jew',
			'output': 'usetype,rar',
			'plvl': '125',
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Charm + 1 Rejuvenation Potion -> 1 High Quality Rare Charm',
			'enabled': 1,
			'version': 100,
			'numinputs': 2,
			'input 1': 'char',
			'input 2': 'rvs',
			'output': 'usetype,rar',
			'plvl': '125',
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Ring + 1 Rejuvenation Potion -> 1 High Quality Rare Ring',
			'enabled': 1,
			'version': 100,
			'numinputs': 2,
			'input 1': 'ring',
			'input 2': 'rvs',
			'output': 'usetype,rar',
			'plvl': '125',
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Amulet + 1 Rejuvenation Potion -> 1 High Quality Rare Amulet',
			'enabled': 1,
			'version': 100,
			'numinputs': 2,
			'input 1': 'amul',
			'input 2': 'rvs',
			'output': 'usetype,rar',
			'plvl': '125',
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Jewel + 1 Rejuvenation Potion -> 1 High Quality Rare Jewel',
			'enabled': 1,
			'version': 100,
			'numinputs': 2,
			'input 1': 'jew',
			'input 2': 'rvs',
			'output': 'usetype,rar',
			'plvl': '125',
			'*eol\r': 0
		}
	];
	cubemain.rows.push(...recipes);
}

function addMakeUniqueItemRecipes(cubemain) {
	const recipes = [
		{
			'description': '(KM) 1 Normal Armor + 3 Rejuvenation Potion -> 1 Unique Armor',
			'enabled': 1,
			'version': 100,
			'numinputs': 4,
			'input 1': 'armo,nor',
			'input 2': 'rvs,qty=3',
			'output': 'usetype,uni',
			'lvl': '99',
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Normal Armor + 1 Full Rejuvenation Potion -> 1 Unique Armor',
			'enabled': 1,
			'version': 100,
			'numinputs': 2,
			'input 1': 'armo,nor',
			'input 2': 'rvl',
			'output': 'usetype,uni',
			'lvl': '99',
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Normal Weapon + 3 Rejuvenation Potion -> 1 Unique Weapon',
			'enabled': 1,
			'version': 100,
			'numinputs': 4,
			'input 1': 'weap,nor',
			'input 2': 'rvs,qty=3',
			'output': 'usetype,uni',
			'lvl': '99',
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Normal Weapon + 1 Full Rejuvenation Potion -> 1 Unique Weapon',
			'enabled': 1,
			'version': 100,
			'numinputs': 2,
			'input 1': 'weap,nor',
			'input 2': 'rvl',
			'output': 'usetype,uni',
			'lvl': '99',
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Jewel + 3 Rejuvenation Potion -> 1 Unique Jewel',
			'enabled': 1,
			'version': 100,
			'numinputs': 4,
			'input 1': 'jew',
			'input 2': 'rvs,qty=3',
			'output': 'usetype,uni',
			'lvl': '99',
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Jewel + 1 Full Rejuvenation Potion -> 1 Unique Jewel',
			'enabled': 1,
			'version': 100,
			'numinputs': 2,
			'input 1': 'jew',
			'input 2': 'rvl',
			'output': 'usetype,uni',
			'lvl': '99',
			'*eol\r': 0
		}
	];
	cubemain.rows.push(...recipes);
}

function addMakeEtherealItemRecipes(cubemain) {
	const recipes = [
		{
			'description': '(KM) 1 Unique Weapon + 1 Hpot + 1 Mpot -> 1 Ethereal Unique Weapon',
			'enabled': 1,
			'version': 100,
			'numinputs': 3,
			'input 1': 'weap,uni',
			'input 2': 'hpot',
			'input 3': 'mpot',
			'output': 'usetype,uni,eth',
			'lvl': '99',
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Unique Armo + 1 Hpot + 1 Mpot -> 1 Ethereal Unique Weapon',
			'enabled': 1,
			'version': 100,
			'numinputs': 3,
			'input 1': 'armo,uni',
			'input 2': 'hpot',
			'input 3': 'mpot',
			'output': 'usetype,uni,eth',
			'lvl': '99',
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Normal Weapon + 1 Hpot + 1 Mpot -> 1 Ethereal Normal Weapon',
			'enabled': 1,
			'version': 100,
			'numinputs': 3,
			'input 1': 'weap,nor',
			'input 2': 'hpot',
			'input 3': 'mpot',
			'output': 'usetype,eth',
			'lvl': '99',
			'*eol\r': 0
		},
		{
			'description': '(KM) 1 Normal Armo + 1 Hpot + 1 Mpot -> 1 Ethereal Normal Weapon',
			'enabled': 1,
			'version': 100,
			'numinputs': 3,
			'input 1': 'armo,nor',
			'input 2': 'hpot',
			'input 3': 'mpot',
			'output': 'usetype,eth',
			'lvl': '99',
			'*eol\r': 0
		}
	];
	cubemain.rows.push(...recipes);
}

function addCharmUpgradeRecipes(cubemain) {
const recipes = [
		{
			'description': '(KM) 2 Small Charm -> 1 Large Charm',
			'enabled': 1,
			'version': 100,
			'numinputs': 2,
			'input 1': 'scha,qty=2',
			'output': 'mcha,rar',
			'plvl': '125',
			'*eol\r': 0
		},
		{
			'description': '(KM) 2 Large Charm -> 1 Grand Charm',
			'enabled': 1,
			'version': 100,
			'numinputs': 2,
			'input 1': 'mcha,qty=2',
			'output': 'lcha,rar',
			'plvl': '125',
			'*eol\r': 0
		}
	];
	cubemain.rows.push(...recipes);
}

function installAllMods() {
	console.debug("Installing keimoon-mod");
	installAutoMagicMods();
	installArmorMods();
	installWeaponMods();
	installCharStatsMods();
	installItemTypes();
	installSkillMods();
	installTreasureClassMod();
	installSuperUniquesMod();
	installCubeMods();
}

installAllMods();
