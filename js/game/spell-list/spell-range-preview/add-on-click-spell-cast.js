const addOnClickToCastSpellOnHighlight = (highlightDiv, position) =>{
    let spell = Game.spellToBeCast

    
    highlightDiv.onclick = () => {
        removeHighlightsFromMap()
        removeAllChilds(document.getElementById("player-panel-spell-text"));
        
        spell.cast(position)
        Game._checkIfAnyoneHasDied()
    }
}