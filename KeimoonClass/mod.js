function installAllMods() {
	let build = config.build;
	console.log("Installing all mods for " + build);

	const magicprefixFile = 'global\\excel\\magicprefix.txt';
	let magicprefix = D2RMM.readTsv(magicprefixFile);
	const magicsuffixFile = 'global\\excel\\magicsuffix.txt';
	let magicsuffix = D2RMM.readTsv(magicsuffixFile);

	if (build == 'firesorc') {
		installModFireSorc(magicprefix, magicsuffix);
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
			changeCommonMagicSuffix(row, iTypes);
			changeCasterMagicSuffix(row, iTypes);
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

// COMMON SUFFIX
function changeCommonMagicSuffix(row, iTypes) {
	changeCommonHPSuffix(row, iTypes);
	changeCommonMoveSuffix(row, iTypes);
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
