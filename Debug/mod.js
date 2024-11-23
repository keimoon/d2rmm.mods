const files = [
	'global\\excel\\automagic.txt',
	'global\\excel\\armor.txt',
	'global\\excel\\charstats.txt',
	'global\\excel\\cubemail.txt',
	'global\\excel\\itemtypes.txt',
	'global\\excel\\levels.txt',
	'global\\excel\\missiles.txt',
	'global\\excel\\monstats.txt',
	'global\\excel\\skills.txt',
	'global\\excel\\superuniques.txt',
	'global\\excel\\treasureclasses.txt',
	'global\\excel\\uniqueitems.txt',
	'global\\excel\\weapon.txt',
	'global\\excel\\magicprefix.txt',
	'global\\excel\\magicsuffix.txt',
];

files.forEach((file) => {
	let fileData = D2RMM.readTsv(file);
	let debugFileName = 'debug\\' + file;
	console.log('Writing to ' + debugFileName);
	D2RMM.writeTsv(debugFileName, fileData);
});
