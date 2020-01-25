document.getElementById("main-menu-one-player").onclick = function(){
    removeAllChilds(document.getElementById("player-area"))
    startGame(0)
}

document.getElementById("main-menu-two-player").onclick = function(){
    removeAllChilds(document.getElementById("player-area"))
    startGame(1)
}

document.getElementById("main-menu-three-player").onclick = function(){
    removeAllChilds(document.getElementById("player-area"))
    startGame(2)
}

document.getElementById("main-menu-four-player").onclick = function(){
    removeAllChilds(document.getElementById("player-area"))
    startGame(3)
}