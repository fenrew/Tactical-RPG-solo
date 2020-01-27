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
        let movementRoute = findBestMovementRoute(position, Game.players[Game.turn].position)
        movementVisuals(movementRoute, Game.players[Game.turn].position)
        confirmMovementToPosition(position)
    }
}