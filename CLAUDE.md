# D2RMM Mods

This is a collection of mods for **Diablo II: Resurrected**, built using the [D2RMM (Diablo II: Resurrected Mod Manager)](https://github.com/olegbl/d2rmm) modding tool.

## Project Structure

Each mod lives in its own top-level directory and contains:

- `mod.json` - Mod metadata (name, description, author, version) and config schema
- `mod.js` - Mod logic using the D2RMM API
- `hd/` (optional) - Asset overrides (sprites, images, video files)
- `*.dev/` directories contain development assets (source images, etc.) not used at runtime

## D2RMM API

Mods are JavaScript files executed by D2RMM. Key API methods:

- `D2RMM.readTsv(path)` / `D2RMM.writeTsv(path, data)` - Read/write tab-separated game data files (e.g. `global\excel\skills.txt`)
- `D2RMM.readJson(path)` / `D2RMM.writeJson(path, data)` - Read/write JSON game data files (e.g. `local\lng\strings\item-names.json`)
- `D2RMM.copyFile(src, dst)` - Copy asset files into the mod output
- `config` - Global object containing user-configured values from `mod.json` config schema

TSV files return `{ headers: string[], rows: object[] }`. Rows are keyed by column header names.

## Reference Data

The default/vanilla D2R game data files are located at `../D2R-Excel/`. These TSV files (e.g. `skills.txt`, `missiles.txt`, `monstats.txt`, `armor.txt`, `weapons.txt`) contain the base game values and column definitions. Reference them to understand default values, available columns, and valid field values when writing mods.

## Code Style

- Single quotes (configured via prettier in `package.json`)
- ESLint config in `.eslintrc.js` (relaxed rules for the D2RMM scripting environment)
- Game file paths use backslash separators (e.g. `'global\\excel\\armor.txt'`)
