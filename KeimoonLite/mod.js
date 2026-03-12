const PREFIXES = ['global\\excel\\', 'global\\excel\\base\\'];

function modifyTsv(fileName, modifier) {
	PREFIXES.forEach((prefix) => {
		const filePath = prefix + fileName;
		console.debug('Modifying ' + filePath);
		let data = D2RMM.readTsv(filePath);
		modifier(data);
		D2RMM.writeTsv(filePath, data);
	});
}

// AUTOMAGIC
// Make amazon auto magic mod easier to appear

function installAutoMagicMods() {
	console.debug("Installing automagic.txt");

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

	modifyTsv('automagic.txt', (automagic) => {
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
	});
}

// ARMOR
// Set same rarity for all armors

function installArmorMods() {
	console.debug("Installing armor.txt");
	modifyTsv('armor.txt', (armor) => {
		armor.rows.forEach((row) => {
			row.rarity = '1';
		});
	});
}

// WEAPON
// Set same rarity for all weapons

function installWeaponMods() {
	console.debug("Installing weapons.txt");
	modifyTsv('weapons.txt', (weapon) => {
		weapon.rows.forEach((row) => {
			row.rarity = '1';
		});
	});
}

// CHARSTAT
// Increase Light Radius

function installCharStatsMods() {
	console.debug("Installing charstats.txt");
	modifyTsv('charstats.txt', (charStats) => {
		charStats.rows.forEach((row) => {
			if (row.LightRadius != '') {
				row.LightRadius = 18;
			}
		});
	});
}

// ITEMTYPES
// Enable rare for charms

function installItemTypes() {
	console.debug("Installing itemtypes.txt");
	modifyTsv('itemtypes.txt', (itemTypes) => {
		itemTypes.rows.forEach((row) => {
			if (row.ItemType.includes('Charm')) {
				row.Rare = '1';
			}
		});
	});
}

// SKILLS
// Bigger, badder skills

function installSkillMods() {
	console.debug("Installing skill mods");
	PREFIXES.forEach((prefix) => {
		const missileFile = prefix + 'missiles.txt';
		let missile = D2RMM.readTsv(missileFile);
		const skillFile = prefix + 'skills.txt';
		let skill = D2RMM.readTsv(skillFile);

		changeMissileSpeed(missile);
		changeSorceressSkill(skill, missile);
		changeAssassinSkill(skill, missile);
		changeBarbarianSkill(skill, missile);
		changeAmazonSkill(skill, missile);
		changeDruidSkill(skill, missile);
		changePalladinSkill(skill, missile);
		// Necromancer must be after Amazon to copy modified Lightning Fury values
		changeNecromancerSkill(skill, missile);
		changeWarlockSkill(skill, missile);

		D2RMM.writeTsv(missileFile, missile);
		D2RMM.writeTsv(skillFile, skill);
	});
}

function changeMissileSpeed(missile) {
	console.debug("Changing missile speed");

	const vels = new Map([
		['firearrow', '96'],
		['explodingarrow', '96'],
		['firebolt', '80'],
		['fireball', '80'],
		['freezingarrow', '48'],
		['glacialspike', '80'],
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
		['sentrylightningbolt', '45'],
		['chargedbolt', '36'],
		['lightningbolt', '60'],
		['chainlightning', '60'],
		['firestormmaker', '32'],
		['tornado', '24'],
		['teeth', '30'],
		['bonespear', '80'],
		['miasmabolt', '80'],
		['echoingstrike', '80']
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
		if (row.skill == 'Charged Bolt') {
			row.Param1 = '30';
		}
		if (row.skill == 'Enchant') {
			row.Param1 = '90000';
			row.restrict = '1';
		}
		if (row.skill == 'Chain Lightning') {
			row.Param1 = '40';
			row.Param3 = '15';
			row.Param5 = '1';
		}
		if (row.skill == 'Teleport') {
			row.restrict = '1';
		}
		if (row.skill == 'Thunder Storm') {
			row.Param1 = '90000';
			row.Param3 = '1'
			row.Param5 = '100';
			row.Param7 = '30';
			row.restrict = '1';
		}
		if (row.skill == 'Blizzard') {
			row.localdelay = '';
			row.globaldelay = '';
			row.LineOfSight = '';
			row.Param1 = '14';
			row.Param3 = '1';
			row.Param8 = '10';
			row.mana = '10';
			row.lvlmana = '0';
		}
		if (row.skill == 'Frozen Orb') {
			row.localdelay = '';
			row.globaldelay = '';
		}
		if (row.skill == 'Glacial Spike') {
			row.Param1 = '30';
			row.Param8 = '10';
			row.lvlmana = '0';
		}
		if (row.skill == 'Static Field') {
			row.Param1 = '40';
		}
		if (row.skill == 'Nova') {
			row.lvlmana = '0';
		}
	});
	missile.rows.forEach((row) => {
		changeSorcMissileMeteor(row);
		if (row.Missile == 'nova') {
			row.Vel = '48';
			row.MaxVel = '48';
			row.Range = '26';
		}
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
		if (row.skill == 'Fade') {
			row.Param5 = '90000';
		}
		if (row.skill == 'Fists of Fire') {
			row.Param1 = '30';
			row.Param3 = '10000';
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
		if (row.skill == 'Claws of Thunder') {
			row.Param3 = '10000';
			row.Param1 = '1';
			row.Param2 = '9';
		}
		if (row.skill == 'Blades of Ice') {
			row.Param3 = '10000';
		}
		if (row.skill == 'Royal Strike') {
			row.auralencalc = '10000';
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
			row.restrict = '1';
		}
		if (row.skill == 'Battle Command') {
			row.Param1 = '90000';
			row.restrict = '1';
		}
	});
	missile.rows.forEach((row) => {
	});
}

// AMAZON SKILL
function changeAmazonSkill(skill, missile) {
	console.debug("Changing Amazon skills");
	skill.rows.forEach((row) => {
		if (row.skill == 'Freezing Arrow') {
			row.Param1 = '30';
		}
		if (row.skill == 'Lightning Fury') {
			row.Param3 = '30';
		}
	});
	missile.rows.forEach((row) => {
		if (row.Missile == 'explodingarrowexp2') {
			row.sHitPar1 = '30';
		}
		if (row.Missile == 'freezingarrowexp3') {
			row.sHitPar1 = '30';
		}
	});
}

// DRUID SKILL
function changeDruidSkill(skill, missile) {
	console.debug("Changing Druid skills");
	skill.rows.forEach((row) => {
		if (row.skill == 'Shape Shifting') {
			row.Param1 = '90000';
		}
		if (row.skill == 'Firestorm') {
			row.Param1 = '10';
			row.localdelay = '';
			row.globaldelay = '';
		}
		if (row.skill == 'Molten Boulder') {
			row.Param1 = '30';
			row.localdelay = '';
			row.globaldelay = '';
		}
		if (row.skill == 'Eruption') {
			row.Param1 = '14';
			row.Param2 = '1';
			row.localdelay = '';
			row.globaldelay = '';
			row.LineOfSight = '';
		}
		if (row.skill == 'Hurricane') {
			row.Param1 = '90000';
			row.Param3 = '18';
			row.Param4 = '1';
			row.localdelay = '';
			row.globaldelay = '';
		}
	});
	missile.rows.forEach((row) => {
		if (row.Missile == 'firestormmaker') {
			row.Range = '100';
		}
	});
}

// PALLADIN SKILLS
function changePalladinSkill(skill, missile) {
	console.debug("Changing Palladin skills");
	skill.rows.forEach((row) => {
		if (row.skill == 'Fist of the Heavens') {
			row.localdelay = '';
			row.globaldelay = '';
		}
		if (row.skill == 'Holy Shield') {
			row.Param1 = '90000';
		}
	});
}

// NECROMANCER SKILLS
// Give Bone Spear the Lightning Fury splitting behavior
function changeNecromancerSkill(skill, missile) {
	console.debug("Changing Necromancer skills");

	// Buff Teeth: increase base number of teeth to 10
	// Formula is min(ln12,24) where ln12 = Param1 + level * Param2
	skill.rows.forEach((row) => {
		if (row.skill == 'Teeth') {
			row.Param1 = '20'; // base number of missiles (default: 2)
			row.lvlmana = '0';
		}
		if (row.skill == 'Bone Spear') {
			row.lvlmana = '0';
		}
		if (row.skill == 'Bone Spirit') {
			row.lvlmana = '0';
		}
	});

	// Find lightningfury missile to copy hit behavior from
	let lightningFuryRow = missile.rows.find((row) => row.Missile == 'lightningfury');
	if (!lightningFuryRow) {
		console.error("Could not find lightningfury missile");
		return;
	}

	// Find bonespear missile to modify and copy for submissile
	let boneSpearRow = missile.rows.find((row) => row.Missile == 'bonespear');
	if (!boneSpearRow) {
		console.error("Could not find bonespear missile");
		return;
	}

	// Find the highest missile ID to assign a new one
	let maxId = 0;
	missile.rows.forEach((row) => {
		let id = parseInt(row['*ID']);
		if (!isNaN(id) && id > maxId) {
			maxId = id;
		}
	});
	let newMissileId = (maxId + 1).toString();

	// Create submissile by copying bonespear
	let boneSpearSplitRow = { ...boneSpearRow };
	boneSpearSplitRow.Missile = 'bonespearsplit';
	boneSpearSplitRow['*ID'] = newMissileId;
	// Submissile should NOT have the splitting hit function (avoid infinite recursion)
	boneSpearSplitRow.pSrvHitFunc = '';
	boneSpearSplitRow.pCltHitFunc = '';
	boneSpearSplitRow.sHitPar1 = '';
	boneSpearSplitRow.sHitPar2 = '';
	boneSpearSplitRow.cHitPar1 = '';
	boneSpearSplitRow.cHitPar2 = '';
	boneSpearSplitRow.HitSubMissile1 = '';
	boneSpearSplitRow.HitSubMissile2 = '';
	boneSpearSplitRow.HitSubMissile3 = '';
	boneSpearSplitRow.HitSubMissile4 = '';
	boneSpearSplitRow.CltHitSubMissile1 = '';
	boneSpearSplitRow.CltHitSubMissile2 = '';
	boneSpearSplitRow.CltHitSubMissile3 = '';
	boneSpearSplitRow.CltHitSubMissile4 = '';
	boneSpearSplitRow.Vel = '80';
	boneSpearSplitRow.MaxVel = '80';

	// Add the new submissile to the missile table
	missile.rows.push(boneSpearSplitRow);

	// Copy hit functions from lightningfury, but use custom hit params
	boneSpearRow.pSrvHitFunc = lightningFuryRow.pSrvHitFunc;
	boneSpearRow.pCltHitFunc = lightningFuryRow.pCltHitFunc;
	boneSpearRow.sHitPar1 = '30';
	boneSpearRow.sHitPar2 = '30';
	boneSpearRow.cHitPar1 = '30';
	boneSpearRow.cHitPar2 = '30';

	// Set the submissile to our new bonespearsplit
	boneSpearRow.HitSubMissile1 = 'bonespearsplit';
	boneSpearRow.CltHitSubMissile1 = 'bonespearsplit';

	console.debug("Bone Spear now splits like Lightning Fury, submissile ID: " + newMissileId);
}

// WARLOCK SKILLS
function changeWarlockSkill(skill, missile) {
	console.debug("Changing Warlock skills");
	skill.rows.forEach((row) => {
		if (row.charclass == 'war') {
			row.localdelay = '';
			row.globaldelay = '';
			row.lvlmana = '0';
		}
		if (row.skill == 'Hex Purge') {
			row.Param3 = '90000';
			row.Param7 = '3000';
		}
		if (row.skill == 'Hex Bane' || row.skill == 'Hex Siphon') {
			row.Param3 = '90000';
		}
		if (row.skill == 'Blade Warp') {
			row.Param1 = '30';
			row.Param3 = '5';
		}
		if (row.skill == 'Cleave') {
			row.calc7 = '10';
		}
		if (row.skill == 'Consume') {
			row.Param1 = '90000';
		}
		if (row.skill == 'Flame Wave') {
			row.Param1 = '8';
			row.Param2 = '14';
			row.Param3 = '0';
		}
		if (row.skill == 'Ring of Fire') {
			row.calc2 = '((lvl>=10)?64:32)';
		}
		if (row.skill == 'Sigil Lethargy' || row.skill == 'Sigil Rancor') {
			row.Param1 = '30';
		}
		if (row.skill == 'Echoing Strike') {
			row.Param10 = '5';
			row.calc5 =
				"(skill('Mirrored Blades'.blvl) > 0) ? (11+(skill('Mirrored Blades'.blvl)/5)) : 11";
		}
		if (row.skill == 'Sigil Death') {
			row.Param5 = '30';
		}
		if (row.skill == 'Abyss') {
			row.Param1 = '30';
			row.LineOfSight = '';
		}

	});
	missile.rows.forEach((row) => {
		if (row.Missile == 'ringoffire') {
			row.sHitPar1 = '15';
			row.cHitPar1 = '15';
		}
		if (row.Missile == 'abysscenter' || row.Missile == 'abyssexplode') {
			row.Param5 = '1'; // radius scaling: +1 per Enhanced Entropy level (default: 5)
		}
		if (row.Missile == 'miasmaboltcloud') {
			row.Radius = "(skill('Enhanced Entropy'.blvl) >= 10)?30:((skill('Enhanced Entropy'.blvl)>=5)?25:20)";
		}
	});
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

// Equipment drop rates: divide cascade-to-lower-tier probability by scaling factor
// so higher level areas drop more higher level items.
function changeEquipDropRates(row) {
	const treasureClass = row['Treasure Class'];
	if (!treasureClass.startsWith('Act')) {
		return;
	}
	if (!/Equip|Melee|Bow/.test(treasureClass)) {
		return;
	}
	// Find the last Item slot that references a lower tier treasure class
	for (let i = 10; i >= 1; i--) {
		const item = row['Item' + i];
		if (item != null && item.startsWith('Act')) {
			row['Prob' + i] = Math.max(1, Math.floor(row['Prob' + i] / config.equipScaling));
			break;
		}
	}
}

// Rune drop rates: set flat A% stay chance for all tiers.
// For Runes 2-16: Prob1 + Prob2 = A, Prob3 = 100 - A
// For Runes 17 (Zod): Prob1 = A, Prob2 = 100 - A
function changeRuneDropRates(row) {
	const treasureClass = row['Treasure Class'];
	const match = treasureClass.match(/^Runes ([1-9][0-9]?)$/);
	if (match == null) {
		return;
	}
	const groupNumber = +match[1];
	if (groupNumber <= 1) {
		return;
	}
	const A = config.runeStayChance;
	if (groupNumber < 17) {
		row.Prob1 = Math.floor(A / 2);
		row.Prob2 = A - Math.floor(A / 2);
		row.Prob3 = 100 - A;
	} else {
		// Zod is half as likely to stay
		row.Prob1 = Math.floor(A / 2);
		row.Prob2 = 100 - Math.floor(A / 2);
	}
}

// Remove gold and junk drops from special monsters (champions, uniques, bosses)
function changeSpecialMonsterDrops(row) {
	if (row.Unique == null || row.Unique === '' || +row.Unique <= 0) {
		return;
	}
	let changed = false;
	for (let i = 1; i <= 10; i++) {
		const item = row['Item' + i];
		if (item == null || item === '') {
			continue;
		}
		if (item.startsWith('gld') || item.includes('Junk')) {
			row['Prob' + i] = '0';
			changed = true;
		}
	}
	if (changed) {
		row.NoDrop = '0';
	}
}

// NoDrop reduction: simulate /players N for NoDrop using the formula
// newNoDrop = floor(probSum / (1 / (noDropChance^N) - 1))
// Also fix Countess parent TCs to prefer rune drops when NoDrop is modified.
function changeNoDrop(row) {
	const noDrop = parseInt(row.NoDrop);
	if (isNaN(noDrop) || noDrop <= 0) {
		return;
	}

	const name = row['Treasure Class'];

	// Determine player count based on TC category
	let playerCount;
	if (name.includes('Terrorize Act Consumable')) {
		playerCount = config.noDropWorldstone;
	} else if (name === 'Sunder Charms') {
		playerCount = config.noDropSunder;
	} else {
		playerCount = config.noDropNormal;
	}

	if (playerCount === 1) {
		return;
	}

	if (playerCount === 0) {
		row.NoDrop = '0';
	} else {
		let probSum = 0;
		for (let i = 1; i <= 10; i++) {
			const prob = parseInt(row['Prob' + i]);
			if (!isNaN(prob)) {
				probSum += prob;
			}
		}
		if (probSum > 0) {
			const noDropChance = noDrop / (noDrop + probSum);
			const newNoDrop = Math.floor(probSum / (1 / Math.pow(noDropChance, playerCount) - 1));
			row.NoDrop = String(newNoDrop);
		}
	}

	// Fix Countess parent TCs: swap Item1/Item2 so runes are preferred over items
	if (config.noDropNormal !== 1) {
		const countessParents = [
			'Countess', 'Countess (N)', 'Countess (H)',
			'Countess Desecrated', 'Countess (N) Desecrated', 'Countess (H) Desecrated',
		];
		if (countessParents.includes(name)) {
			const tempItem = row.Item1;
			const tempProb = row.Prob1;
			row.Item1 = row.Item2;
			row.Prob1 = row.Prob2;
			row.Item2 = tempItem;
			row.Prob2 = tempProb;
		}
	}
}

// Ancient Statue drop weight in desecrated act boss TCs
function changeAncientStatueWeight(row) {
	const name = row['Treasure Class'];
	if (!name.includes('Desecrated')) {
		return;
	}
	const weight = config.ancientStatueWeight;
	if (weight === 1) {
		return; // vanilla default
	}
	for (let i = 1; i <= 10; i++) {
		const item = row['Item' + i];
		if (item != null && item.startsWith('Ancient Statue')) {
			row['Prob' + i] = String(weight);
			break;
		}
	}
}

// Sunder charm herald tier threshold: modify the ConditionCalc on the Sunder Charms TC
function changeSunderHeraldTier(row) {
	if (row['Treasure Class'] !== 'Sunder Charms') {
		return;
	}
	const minTier = config.sunderHeraldTier;
	if (minTier === 4) {
		return; // vanilla default
	}
	row.ConditionCalc =
		'"cond(\'MonsterTestElite\', herald)*(stat(\'heraldtier\'.accr) >' +
		(minTier - 1) +
		') "';
}

function installTreasureClassMod() {
	console.debug("Installing Treasure class");
	modifyTsv('treasureclassex.txt', (treasureClass) => {
		treasureClass.rows.forEach((row) => {
			changePandemoniumKeysProb(row);
			changeRuneDropRates(row);
			changeEquipDropRates(row);
			changeNoDrop(row);
			changeSpecialMonsterDrops(row);
			changeSunderHeraldTier(row);
			changeAncientStatueWeight(row);
		});
	});
}

// MAGIC PREFIX
// Increase skilltab frequency on grand charms

function installMagicPrefixMods() {
	console.debug("Installing magicprefix.txt");
	modifyTsv('magicprefix.txt', (magicPrefix) => {
		magicPrefix.rows.forEach((row) => {
			if (row.mod1code == 'skilltab' && row.itype1 == 'lcha') {
				row.frequency = '200';
			}
		});
	});
}

// UNIQUE ITEMS
// Boost rarity of desirable unique rings

function installUniqueItemMods() {
	console.debug("Installing uniqueitems.txt");

	const boostedRings = [
		'The Stone of Jordan',
		'Raven Frost',
		'Bul Katho\'s Wedding Band',
		'Sling',
	];

	const boostedAmulets = [
		'Mara\'s Kaleidoscope',
	];

	modifyTsv('uniqueitems.txt', (uniqueItems) => {
		uniqueItems.rows.forEach((row) => {
			if (row.code == 'rin') {
				if (boostedRings.includes(row.index)) {
					row.rarity = String(config.ringBoostedRarity);
				} else {
					row.rarity = String(config.ringBaseRarity);
				}
			}
			if (row.code == 'amu') {
				if (boostedAmulets.includes(row.index)) {
					row.rarity = String(config.amuletBoostedRarity);
				} else {
					row.rarity = String(config.amuletBaseRarity);
				}
			}
		});
	});
}

function installAllMods() {
	console.debug("Installing keimoon-mod-lite");
	installAutoMagicMods();
	installArmorMods();
	installWeaponMods();
	installCharStatsMods();
	installItemTypes();
	installSkillMods();
	installTreasureClassMod();
	installMagicPrefixMods();
	installUniqueItemMods();
}

installAllMods();
