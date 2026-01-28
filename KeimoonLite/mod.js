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
	changeAmazonSkill(skill, missile);
	changeDruidSkill(skill, missile);
	changePalladinSkill(skill, missile);

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
		['tornado', '24']
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
			row.Param1 = '9';
			row.Param2 = '9';
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

function installTreasureClassMod() {
	console.debug("Installing Treasure class");
	const treasureClassFile = 'global\\excel\\treasureclassex.txt';
	let treasureClass = D2RMM.readTsv(treasureClassFile);

	treasureClass.rows.forEach((row) => {
		changePandemoniumKeysProb(row);
	});

	D2RMM.writeTsv(treasureClassFile, treasureClass);
}

function installAllMods() {
	console.debug("Installing keimoon-mod-lite");
	installCharStatsMods();
	installSkillMods();
	installTreasureClassMod();
}

installAllMods();
