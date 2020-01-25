document.querySelector(".player-panel-button").onclick = function(){
    Game._nextTurn()
}

function removeAllChilds(parentDiv){
    let child = parentDiv.lastElementChild
    
    while (child){
        parentDiv.removeChild(child)
        child = parentDiv.lastElementChild
    }
}
