function addOnClickElements(){

}

function addOnClickPlayers(){
    Game.players.forEach((player)=>{    
        document.getElementById(`player-${player.position.y},${player.position.x}`).onclick = function(){
            removeMovementHighlightsFromMap(Game.mapHighlights)
            Game._displayMovementHighlights(player)
        }
    })

}

function addOnClickMovementHighlight(highlightDiv, position){
    highlightDiv.onclick = function(){
        removeMovementHighlightsFromMap(Game.mapHighlights)
        let movementRoute = findBestMovementRoute(position, Game.combatTimeline[Game.turn].position)
        movementVisuals(movementRoute, Game.combatTimeline[Game.turn].position)
        confirmMovementToPosition(position)
    }
}