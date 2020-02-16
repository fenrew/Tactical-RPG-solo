const removeUnitFromPlayerarea = (unit) => {
    updatePlayerPanelCombatTimelineVisuals()

    let unitDiv = document.getElementById(`${unit.npc ? "npc" : "player"}-${unit.position.y},${unit.position.x}`)
    unitDiv.parentNode.removeChild(unitDiv)
}