const updateUnitPosition = (unit, newPosition) => {
    const {y, x} = unit.position
    const previousMapNumber = Game.activeMap[y][x]

    Game.activeMap[y][x] = Game.originalMap[y][x]
    Game.activeMap[newPosition.y][newPosition.x] = previousMapNumber

    const unitDiv = document.getElementById(`${unit.npc ? "npc" : "player"}-${unit.position.y},${unit.position.x}`)
    unitDiv.parentNode.removeChild(unitDiv)

    unitDiv.id = `player-${newPosition.y},${newPosition.x}`

    const mapGridBlockDiv = document.getElementById("map-grid-block-"+newPosition.y+","+newPosition.x)
    mapGridBlockDiv.appendChild(unitDiv)

    unit.position = newPosition
}