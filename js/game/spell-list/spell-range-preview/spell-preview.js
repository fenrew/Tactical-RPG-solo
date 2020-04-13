const castSpellPreview = spell =>{
    let player = Game.combatTimeline[Game.turn],
    yPos = player.position.y, xPos = player.position.x,
    spellInfo = spell.spellInfo, movementMap

    if(spellInfo.freeCells){
        movementMap = calculateSpellRangeFreeCells(Game.activeMap, spellInfo, {y: yPos, x: xPos})
    } else if(spellInfo.straigthLine){
        movementMap = calculateSpellRangeStraightLine(Game.activeMap, spellInfo, {y: yPos, x: xPos})
    }

    // 3 comes from maps.js, returnHighlightBlockClass()
    Game._addNewHighlightToMap(movementMap, 3)

    Game.spellToBeCast = spell

    displayMapHighlightsVisuals()

    let spellElement = document.getElementById("spell-list-tab")
    document.getElementById("player-area").removeChild(spellElement)

    //Game.spellRangeHighlightMap = movementMap //Do I need this?
    //highlightSpellRangeVisuals(Game , movementMap, spell)
}