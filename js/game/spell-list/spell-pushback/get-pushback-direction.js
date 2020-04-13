// Returns an array with directions (west = {x: -1}, east = {x: 1}, etc)
const getPushbackDirection = (caster, target) => {
    const positionRelativeX = caster.position.x - target.position.x
    const positionRelativeY = caster.position.y - target.position.y

    if(positionRelativeX > 0) return {x:-1} // W
    else if(positionRelativeX < 0) return {x:1} // E
    if(positionRelativeY > 0) return {y:-1} // N
    else if(positionRelativeY < 0) return {y:1} // S
}