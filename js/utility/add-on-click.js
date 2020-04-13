function addOnClickElements(){

}

function addOnClickPlayers(){
    Game.players.forEach((player)=>{   
        document.getElementById(`player-${player.position.y},${player.position.x}`).onclick = function(){
            removeMovementHighlightsFromMap()
            Game._displayMovementHighlights(player)
        }
    })

}

function addOnClickMovementHighlight(highlightDiv, position){
    highlightDiv.onclick = function(){
        removeMovementHighlightsFromMap()
        let movementRoute = findBestMovementRoute(position, Game.availableMovementMap)
        movementVisuals(movementRoute, Game.combatTimeline[Game.turn].position)
        confirmMovementToPosition(position)
    }
}