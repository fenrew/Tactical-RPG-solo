const addOnClickToCastSpellOnHighlight = (highlightDiv, position) =>{
    let spell = Game.spellToBeCast

    
    highlightDiv.onclick = () => {
        removeHighlightsFromMap()
        spell.cast(position)
        Game._checkIfAnyoneHasDied()
    }
}