const displayPushbackAnimation = (fromPos, toPos, target) => {
    if(fromPos.x === toPos.x && fromPos.y === toPos.y) return
    const targetEle = document.getElementById(`${target.npc ? "npc":"player"}-${fromPos.y},${fromPos.x}`)
    const left = toPos.x - fromPos.x
    const top = toPos.y - fromPos.y
    
   targetEle.style.transition = `top ${Math.abs(top/2)}s ease-in, left ${Math.abs(left/2)}s ease-in`
   targetEle.style.top = `${top * 77}px`
   targetEle.style.left = `${left * 77}px`

    const pushbackAnimation = new Promise(resolve => {
        setTimeout(() => {
    targetEle.style.top = "0px"
    targetEle.style.left = "0px"
    targetEle.style.transition = ""

    targetEle.id = `${target.npc ? "npc":"player"}-${toPos.y},${toPos.x}`
    document.getElementById(`map-grid-block-${fromPos.y},${fromPos.x}`).removeChild(targetEle)
    document.getElementById(`map-grid-block-${toPos.y},${toPos.x}`).appendChild(targetEle)
    resolve()
   }, (Math.abs(top/2)+(Math.abs(left/2)))*1000)
})
    return Promise.resolve(pushbackAnimation)
}