const displayLearnedNewSpell = (spell) =>{
    const playerareaEle = document.getElementById("player-area-box")
    
    const newContainerEle = document.createElement("div")
    const newCongratsTextEle = document.createElement("div")
    const newSpellTextEle = document.createElement("div")

    newContainerEle.id = "learned-spell-popup-container"
    newCongratsTextEle.id = "learned-spell-popup-congrats-text"
    newSpellTextEle.id = "learned-spell-popup-spell-text"

    newCongratsTextEle.innerText = "You got a new spell!"
    newSpellTextEle.innerText = spell.name

    newContainerEle.appendChild(newCongratsTextEle)
    newContainerEle.appendChild(newSpellTextEle)
    playerareaEle.appendChild(newContainerEle)

    newContainerEle.onclick = () => {
        playerareaEle.removeChild(newContainerEle)
    }
}