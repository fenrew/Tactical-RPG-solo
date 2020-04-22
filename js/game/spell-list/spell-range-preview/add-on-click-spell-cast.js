const addOnClickToCastSpellOnHighlight = (highlightDiv, position) =>{
    const {spell, player} = Game.spellToBeCast
    
    highlightDiv.onclick = () => {
        removeHighlightsFromMap()
        removeAllChilds(document.getElementById("player-panel-spell-text"));
        
        spell.cast(position, player.class)
    }
}