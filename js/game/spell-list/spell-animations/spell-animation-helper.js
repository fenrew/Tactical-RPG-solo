const spellAnimationHelperAdd = (position, aniClassStr) => {
    const {y, x} = position
    const targetDiv = document.getElementById(`map-grid-block-${y},${x}`)
    const newAniEle = document.createElement("div")

    newAniEle.classList.add(aniClassStr, "spell-animation-general")

    targetDiv.appendChild(newAniEle)
    
    return {targetDiv, newAniEle}
}

const spellAnimationHelperRemove = (eleObj) => {
    const {targetDiv, newAniEle} = eleObj
    targetDiv.removeChild(newAniEle)
}