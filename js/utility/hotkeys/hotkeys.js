document.addEventListener("keydown", function(event){
    if(event.key == "s"){
    }
    if(event.which === 27){
        console.log("ESC")
        Game._nextTurn()
    }
})