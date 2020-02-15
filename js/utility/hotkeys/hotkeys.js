document.addEventListener("keydown", function(event){
    if(event.key == "s"){
        console.log("S")
        if(!Game.npcActiveTurn){
            removeMovementHighlightsFromMap(Game.mapHighlights)
            openAndCloseSpellList()
        }
    }
    if(event.which === 27){
        console.log("ESC")
        if(!Game.npcActiveTurn){
            console.log("Within IF STATEMENT")
            Game._nextTurn()
        }
    }
})