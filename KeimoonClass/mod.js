function installAllMods() {
	let build = config.build;
	console.log("Installing all mods for " + build);

	const magicprefixFile = 'global\\excel\\magicprefix.txt';
	let magicprefix = D2RMM.readTsv(magicprefixFile);
	const magicsuffixFile = 'global\\excel\\magicsuffix.txt';
	let magicsuffix = D2RMM.readTsv(magicsuffixFile);

	if (build == 'firesorc') {
		installModFireSorc(magicprefix, magicsuffix);
	} else if (build == 'kicksin') {
		installModKickSin(magicprefix, magicsuffix);
	}

	D2RMM.writeTsv(magicprefixFile, magicprefix);
	D2RMM.writeTsv(magicsuffixFile, magicsuffix);
}

function updateClassSkillTab(row) {
	row.rare = 1;
	row.frequency = 200;
	if (row.itype1 == 'lcha') {
		row.frequency = 200;
	} else if (row.mod1min == '1') {
		row.maxlevel = 39;
	} else if (row.mod1min == '2') {
		row.maxlevel = 59;
	}
}

// FIRE SORC
function installModFireSorc(magicprefix, magicsuffix) {
	magicprefix.rows.forEach((row) => {
		if (row.version == '1' || row.version == '100') {
			let iTypes = getItypesFromRow(row);
			changeCommonPrefix(row, iTypes);
			changeCasterMagicPrefix(row, iTypes);
			if (row.group == '125' && row.mod1param == '3') {
				updateClassSkillTab(row);
			}
		}
	});

	magicsuffix.rows.forEach((row) => {
		if (row.version == '1' || row.version == '100') {
			let iTypes = getItypesFromRow(row);
			changeCommonMagicSuffix(row, iTypes, false);
			changeCasterMagicSuffix(row, iTypes);
		}
	});
}

// KICKSIN
function installModKickSin(magicprefix, magicsuffix) {
	magicprefix.rows.forEach((row) => {
		if (row.version == '1' || row.version == '100') {
			let iTypes = getItypesFromRow(row);
			changeCommonPrefix(row, iTypes);
			changePhysicMagicPrefix(row, iTypes);
			if (row.group == '125' && row.mod1param == '20') {
				updateClassSkillTab(row);
			}
		}
	});

	magicsuffix.rows.forEach((row) => {
		if (row.version == '1' || row.version == '100') {
			let iTypes = getItypesFromRow(row);
			changeCommonMagicSuffix(row, iTypes, true);
			changePhysicMagicSuffix(row, iTypes);
		}
	});
}

// COMMON PREFIX
function changeCommonPrefix(row, iTypes) {
	changeCommonResAllPrefix(row, iTypes);
}

function changeCommonResAllPrefix(row, iTypes) {
	if (row.group == '116') {
		if (row.itype1 == 'scha' || row.itype1 == 'mcha'|| row.itype1 == 'lcha') {
			row.rare = 1;
			row.frequency = 100;
		}
	}
}

// CASTER PREFIX
function changeCasterMagicPrefix(row, iTypes) {
	changeCasterManaPrefix(row, iTypes);
	changeCasterManaKillPrefix(row, iTypes);
}

// Mana prefix
function changeCasterManaPrefix(row, iTypes) {
	if (row.group == '115') {
		if (!iTypes.includes('scha') && !iTypes.includes('mcha') && !iTypes.includes('lcha') && !iTypes.includes('jewl')) {
			row.rare = 1;
			row.frequency = 100;
		}
	}
}

function changeCasterManaKillPrefix(row, iTypes) {
	if (row.group == '121') {
		if (!iTypes.includes('jewl')) {
			row.rare = 1;
			row.frequency = 100;
		}
	}
}

// PHYSIC PREFIX
function changePhysicMagicPrefix(row, iTypes) {
	changeDamagePercentPrefix(row);
	changeCharmMaxDamagePrefix(row);
}

function changeDamagePercentPrefix(row) {
	if (row.group == '105' && row.mod1code == 'dmg%' && row.itype1 == 'weap') {
		row.rare = 1;
		row.frequency = 100;
	}
	if (row.group == '105' && row.mod1code == 'dmg%' && row.itype1 == 'jewl' && row.Name == 'Ruby') {
		row.rare = 1;
		row.frequency = 100;
	}
}

function changeCharmMaxDamagePrefix(row) {
	if (row.group == '111') {
		if (row.itype1 == 'lcha') {
			row.rare = 1;
			row.frequency = 100;
			if (row.level == '15') {
				row.maxlevel = '21';
			}
			if (row.level == '22') {
				row.maxlevel = '28';
			}
		}
		if (row.itype1 == 'mcha') {
			row.rare = 1;
			row.frequency = 100;
			if (row.level == '19') {
				row.maxlevel = '27';
			}
		}
		if (row.itype1 == 'scha') {
			row.rare = 1;
			row.frequency = 100;
		}
	}
}

// COMMON SUFFIX
function changeCommonMagicSuffix(row, iTypes, enableChargedTeleport) {
	changeCommonHPSuffix(row, iTypes);
	changeCommonMoveSuffix(row, iTypes);
	if (enableChargedTeleport) {
		changeCommonChargedTeleport(row, iTypes);
	}
}

// HP suffix
function changeCommonHPSuffix(row, iTypes) {
	if (row.group == '26') {
		row.rare = 1;
		row.frequency = 100;
	}
}

// Movespeed suffix
function changeCommonMoveSuffix(row, iTypes) {
	if (row.group == '35' && row.itype1 == 'boot') {
		row.rare = 1;
		row.frequency = 100;
	}
}

// Charged Teleport staff
function changeCommonChargedTeleport(row, iTypes) {
	if (row.group == '44' && row.itype1 == 'staf' and row.Name = 'of Teleportation') {
		row.rare = 1;
		row.frequency = 200;
	}
}

// CASTER SUFFIX
function changeCasterMagicSuffix(row, iTypes) {
	changeCasterFCRSuffix(row, iTypes);
}

// FCR suffix
function changeCasterFCRSuffix(row, iTypes) {
	if (row.group == '9') {
		row.rare = 1;
		if (row.level == '5') {
			row.frequency = 100;
		} else {
			row.frequency = 200;
		}
	}
}

// PHYSIC SUFFIX
function changePhysicMagicSuffix(row, iTypes) {
	changeIASSuffix(row);
	changeLifeLeechSuffix(row);
	changeManaLeechSuffix(row);
}

function changeIASSuffix(row) {
	if (row.group == '7') {
		row.rare = 1;
		row.frequency = 100;
	}
}

function changeLifeLeechSuffix(row) {
	if (row.group == '27') {
		row.rare = 1;
		row.frequency = 100;
	}
}

function changeManaLeechSuffix(row) {
	if (row.group == '28') {
		row.rare = 1;
		row.frequency = 100;
	}
}

// Utilities functions

function getItypesFromRow(row) {
	let iTypes = [];
	for (i = 1; i <= 7; i++) {
		if (row['itype' + i] != '') {
			iTypes.push(row['itype' + i]);
		}
	}
	return iTypes;
}

installAllMods();
