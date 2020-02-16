document.addEventListener("keydown", function(event){
    if(event.key.toLowerCase() == "s"){
        console.log("S")
        if(!Game.npcActiveTurn){
            removeMovementHighlightsFromMap()
            openAndCloseSpellList()
        }
    }
    if(event.which === 27){
        console.log("ESC")
        if(!Game.npcActiveTurn){
            Game._nextTurn()
        }
    }
})