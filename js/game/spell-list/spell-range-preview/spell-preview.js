const castSpellPreview = spell =>{
    let player = Game.combatTimeline[Game.turn],
    yPos = player.position.y, xPos = player.position.x,
    spellInfo = spell.spellInfo, movementMap

    if(spellInfo.freeCells){
        movementMap = calculateSpellRangeFreeCells(Game.activeMap, spellInfo, {y: yPos, x: xPos})
    } else if(spellInfo.straigthLine){
        movementMap = spellPathfinderStraightLine(game, spell, movementMap)
    }

    // 3 comes from maps.js, returnHighlightBlockClass()
    Game._addNewHighlightToMap(movementMap, 3)

    Game.spellToBeCast = spell

    displayMapHighlightsVisuals()

    let spellElement = document.getElementById("spell-list-tab")
    document.getElementById("player-area").removeChild(spellElement)

    //game.spellRangeHighlightMap = movementMap //Do I need this?
    //highlightSpellRangeVisuals(game , movementMap, spell)
}