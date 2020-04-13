// Returns an array with directions (west = {x: -1}, east = {x: 1}, etc)
const getPushbackDirection = (caster, target) => {
    const positionRelativeX = caster.position.x - target.position.x
    const positionRelativeY = caster.position.y - target.position.y
    let direction = []

    if(positionRelativeX > 0) direction.push({x:-1}) // W
    else if(positionRelativeX < 0) direction.push({x:1}) // E
    if(positionRelativeY > 0) direction.push({y:-1}) // N
    else if(positionRelativeY < 0) direction.push({y:1}) // S

    return direction
}