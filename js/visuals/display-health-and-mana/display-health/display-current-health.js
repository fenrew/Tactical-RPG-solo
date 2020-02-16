const displayCurrentHealthBar = (unit) => {
    let unitDiv = document.getElementById(`${unit.npc ? "npc" : "player"}-${unit.position.y},${unit.position.x}`)
    let maxHealthDiv = document.createElement("div") 
    let currentHealthDiv = document.createElement("div")

    maxHealthDiv.classList.add("max-health-div")
    currentHealthDiv.classList.add("current-health-div")
    currentHealthDiv.style.height = unit.class.combatstats.currentHp*100/unit.class.combatstats.hp + "%"

    maxHealthDiv.appendChild(currentHealthDiv)
    unitDiv.appendChild(maxHealthDiv)
}

const removeCurrentHealthDiv = (unit) => {
    let unitDiv = document.getElementById(`${unit.npc ? "npc" : "player"}-${unit.position.y},${unit.position.x}`)
    unitDiv.removeChild(unitDiv.querySelector(".max-health-div"))
}

const updateCurrentHealthBar = (unit) => {
    let unitDiv = document.getElementById(`${unit.npc ? "npc" : "player"}-${unit.position.y},${unit.position.x}`)
    let currentHealthDiv = unitDiv.querySelector(".current-health-div")

    currentHealthDiv.style.height = unit.class.combatstats.currentHp*100/unit.class.combatstats.hp + "%"
}


// MANA

const displayCurrentManaBar = (unit) => {
    let unitDiv = document.getElementById(`${unit.npc ? "npc" : "player"}-${unit.position.y},${unit.position.x}`)
    let maxManaDiv = document.createElement("div") 
    let currentManaDiv = document.createElement("div")

    maxManaDiv.classList.add("max-mana-div")
    currentManaDiv.classList.add("current-mana-div")
    currentManaDiv.style.height = unit.class.combatstats.currentMana*100/unit.class.combatstats.mana + "%"

    maxManaDiv.appendChild(currentManaDiv)
    unitDiv.appendChild(maxManaDiv)
}

const removeCurrentManaDiv = (unit) => {
    let unitDiv = document.getElementById(`${unit.npc ? "npc" : "player"}-${unit.position.y},${unit.position.x}`)
    unitDiv.removeChild(unitDiv.querySelector(".max-mana-div"))
}

const updateCurrentManaBar = (unit) => {
    let unitDiv = document.getElementById(`${unit.npc ? "npc" : "player"}-${unit.position.y},${unit.position.x}`)
    let currentManaDiv = unitDiv.querySelector(".current-mana-div")

    currentManaDiv.style.height = unit.class.combatstats.currentMana*100/unit.class.combatstats.mana + "%"
}