const addSquareGlyph = (player, position, spell) => {
  const { y, x } = position;
  const {size} = spell.spellInfo

  for (let i = 0; i <= size; i++) {
    for (let k = 0; k <= size; k++) {
      if (checkIfInsideOfMap(Game.glyphMap, y + i, x + k) && k!== 0)
        Game.glyphMap[y + i][x + k].push({spell, player});
      if (checkIfInsideOfMap(Game.glyphMap, y + i, x - k))
        Game.glyphMap[y + i][x - k].push({spell, player});
      if (checkIfInsideOfMap(Game.glyphMap, y - i, x + k) && k !== 0 && i !== 0)
        Game.glyphMap[y - i][x + k].push({spell, player});
      if (checkIfInsideOfMap(Game.glyphMap, y - i, x - k) && i !== 0)
        Game.glyphMap[y - i][x - k].push({spell, player});
    }
  }

  displayGlyphs()
};

const removeGlyph = (player, glyphNumber) => {
    for(let y = 0; y < Game.glyphMap.length; y++){
        for(let x = 0; x < Game.glyphMap[y].length; x++){
            Game.glyphMap[y][x] = Game.glyphMap[y][x].filter(ele => {
                return !(ele.player === player && ele.spell.spellInfo.glyphNumber === glyphNumber)
            })
        }
    }
}