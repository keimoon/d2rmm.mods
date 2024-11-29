const DIFFICULTY_AFFIXES = ['', '(N)', '(H)'];
const ELEMENTAL_AFFIXES = ['Dm', 'Ma', 'Fi', 'Li', 'Co', 'Po'];

const monstatsFilename = 'global\\excel\\monstats.txt';
const monstats = D2RMM.readTsv(monstatsFilename);
const excludeMobs = [
	'gorgon1', 'gorgon2', 'gorgon3', 'gorgon4',
	'cain1', 'gheed', 'akara', 'chicken', 'kashya', 'rat', 'rogue1', 'hellmeteor', 'charsi', 'warriv1',
	'bird1', 'bird2', 'bat',
	'warriv2', 'atma', 'drognan', 'fara', 'camel',
	'act2male', 'act2female', 'act2child', 'greiz', 'elzix', 'geglash', 'jerhyn', 'lysander', 'act2guard1', 'act2vendor1', 'act2vendor2', 'meshif1',
	'cain2', 'cain3', 'cain4',
	'tyrael1', 'asheara', 'hratli', 'alkor', 'ormus', 'halbu',
	'meshif2', 'cain5', 'bug', 'scorpion',
	'rogue2', 'roguehire', 'rogue3',
	'larva',
	'claygolem', 'bloodgolem', 'irongolem', 'firegolem', 'familiar', 'act3male', 'act3female', 'natalya',
	'snake', 'parrot', 'fish',
	'evilhole1', 'evilhole2', 'evilhole3', 'evilhole4', 'evilhole5',
	'trap-firebolt', 'trap-horzmissile', 'trap-vertmissile', 'trap-poisoncloud', 'trap-lightning',
	'act2guard2', 'invisospawner',
	'suckernest1', 'suckernest2', 'suckernest3', 'suckernest4',
	'act2hire', 'minispider',
	'boneprison1', 'boneprison2', 'boneprison3', 'boneprison4', 'bonewall',
	'hydra1', 'hydra2', 'hydra3', 'trap-melee', 'seventombs', 'dopplezon', 'valkyrie', 'act2guard3', 'act3hire',
	'necroskeleton', 'necromage',
	'tyrael2', 'darkwanderer', 'spiritmummy',
	'act2guard4', 'act2guard5',
	'jamella', 'izualghost', 'malachai',
	'wakeofdestruction', 'chargeboltsentry', 'lightningsentry', 'bladecreeper', 'invisopet','infernosentry', 'deathsentry', 'shadowwarrior', 'shadowmaster',
	'druidhawk', 'spiritwolf', 'fenris', 'spiritofbarbs', 'heartofwolverine', 'oaksage', 'plaguepoppy', 'cycleoflife', 'vinecreature', 'druidbear', 'eagle', 'wolf', 'bear',
	'larzuk', 'drehya', 'malah', 'nihlathak', 'qual-kehk', 'catapultspotter1', 'catapultspotter2', 'catapultspotter3', 'catapultspotter4', 'cain6', 'tyrael3', 'act5barb1', 'act5barb2', 'drehyaiced',
	'act5pow', 'act5barb3', 'act5barb4', 'ancientstatue1', 'ancientstatue2', 'ancientstatue3',
	'bunny', 'act5hire1', 'act5hire2',
	'injuredbarb1', 'injuredbarb2', 'injuredbarb3', 'worldstoneeffect',
	'pig', 'seagull'
];
monstats.rows.forEach((row) => {
	ELEMENTAL_AFFIXES.forEach((elementalAffix) => {
		DIFFICULTY_AFFIXES.forEach((difficultyAffix) => {
			const cell = `Res${elementalAffix}${difficultyAffix}`;
			if (row[cell] !== '') {
				row[cell] = Math.min(config.maxres, +row[cell]);
			}
			if (!excludeMobs.includes(row.Id)) {
				row[cell] = config.maxres;
			}
		});
	});
});
D2RMM.writeTsv(monstatsFilename, monstats);

if (config.disableaffixes) {
	const disabledAffixes = [];
	const replacementAffixes = [];

	const monumodFilename = 'global\\excel\\monumod.txt';
	const monumod = D2RMM.readTsv(monumodFilename);
	monumod.rows.forEach((row) => {
		if (
			[
				// "Fire Enchanted" adds 75 fire resistance
				'fire',
				// "Lightning Enchanted" adds 75 lightning resistance
				'lightning',
				// "Cold Enchanted" adds 75 cold resistance
				'cold',
				// "Stone Skin" adds 50 physical resistance
				'stoneskin',
				// "Magic Resistant" adds 40 magic resistance
				'resist',
				// "Mana Burn" adds 20 magic resistance
				'manahit',
			].indexOf(row.uniquemod) !== -1
		) {
			row.enabled = 0;
			disabledAffixes.push(row.id);
		}

		if (
			[
				// "Aura Enchanted" is a nice, versatile affix that can end up buffing offense, defense or utility
				'aura',
				// Not a normal mod that can spawn, but increasing HP of unique enemies seems a reasonable compensation for decreasing their resistance
				'hpmultiply',
			].indexOf(row.uniquemod) !== -1
		) {
			replacementAffixes.push(row.id);
		}
	});
	D2RMM.writeTsv(monumodFilename, monumod);

	const superuniquesFilename = 'global\\excel\\superuniques.txt';
	const superuniques = D2RMM.readTsv(superuniquesFilename);
	superuniques.rows.forEach((row) => {
		if (disabledAffixes.indexOf(row.Mod1) !== -1) {
			row.Mod1 = replacementAffixes[0];
		}
		if (disabledAffixes.indexOf(row.Mod2) !== -1) {
			row.Mod2 = replacementAffixes[1];
		}
		if (disabledAffixes.indexOf(row.Mod3) !== -1) {
			row.Mod3 = 0;
		}
	});
	D2RMM.writeTsv(superuniquesFilename, superuniques);
}
