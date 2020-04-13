const displayPushbackAnimation = (fromPos, toPos, target, distance, direction) => {
    const targetEle = document.getElementById(`${target.npc ? "npc":"player"}-${fromPos.y},${toPos.x}`)
    console.log(targetEle)
    targetEle.style.transition = `top ${distance}s, left ${distance}s`

    let left = 0
    let top = 0
    direction.forEach(ele => {
        for(let key in ele){
            key == "y" ? top += ele[key] : left += ele[key]
        }
    })

    console.log(top, left)

    targetEle.style.top = `${top * 77}px`
    targetEle.style.left = `${left * 77}px`
   // movementVisuals(toPos)
}