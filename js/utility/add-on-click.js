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