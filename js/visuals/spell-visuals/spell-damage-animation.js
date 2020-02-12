function handleSpellDamageEffectAnimation(targetPosition, effectValue, effect){
    let element = document.getElementById("player-"+targetPosition.y+","+targetPosition.x)
    let newElement = document.createElement("div")
    if(effect == "damage"){
        newElement.classList.add("display-damage-dealt")
    } else if(effect == "healing"){
        newElement.classList.add("display-healing-done")
    }
    else if(effect == "manadrain"){
        newElement.classList.add("display-mana-drained")
    } else if(effect == "managain"){
        newElement.classList.add("display-mana-gained")
    }
    else if(effect == "mp"){
        newElement.classList.add("display-movement-changed")
    }
    newElement.innerHTML = String(effectValue)
    element.appendChild(newElement)
    setTimeout(() => {
        element.removeChild(newElement)
    },2000)
}