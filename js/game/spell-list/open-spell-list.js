function openAndCloseSpellList(){
    removeHighlightsFromMap()

    let spellElement = document.getElementById("spell-list-tab")
    if(!spellElement){
        let player = Game.combatTimeline[Game.turn], 
        newElement = document.createElement("div")

        newElement.id = "spell-list-tab"
        newElement.style.top = player.position.y * 77 + "px";
        newElement.style.left = player.position.x * 77 + 77 + "px";
        document.getElementById("player-area").appendChild(newElement)
        addSpellListKeysToElement(player.class.spells, newElement)
    } else{
        document.getElementById("player-area").removeChild(spellElement)
    }
}

function addSpellListKeysToElement(spellList, element){
    let spellListArray = Object.values(spellList)

    spellListArray.sort((a, b) => {
        return a.id.toUpperCase().localeCompare(b.id.toUpperCase())
    })

    spellListArray.forEach((spell) => {
        let newElement = document.createElement("div")
        newElement.id = "spell-list-" + spell.id
        newElement.classList.add("spell-list-unit")
        newElement.innerHTML = spell.name
        addOnClickToOpenSpellListElement(spell, newElement)
        //spell.element = newElement
        element.appendChild(newElement)
    })
}

const addOnClickToOpenSpellListElement = (spell, element) => {
    element.onclick = (event) => {
        event.preventDefault()
        console.log("CAST: ", spell)
        castSpellPreview(spell)
    }
}
