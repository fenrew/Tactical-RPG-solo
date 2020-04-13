// Pushes the target back in a straight line. Returns 0 if no pushback damage, or 0< amount of distance left as pushback damage

const pushBackInStraightLine = (target, direction, distance) => {
    console.log({...target.position})
    let originalPosition = {...target.position}
    for(let i = 0; i < distance; i++){
        for (let key in direction[0]){
            let prevPos = {...target.position}
            target.position[key] += direction[0][key]
            if(!checkInsideAndGridAvailability(target.position)){
                target.position[key] -= direction[0][key]
                return distance - i
            }
            Game.activeMap[prevPos.y][prevPos.x] = Game.originalMap[prevPos.y][prevPos.x]
            Game.activeMap[target.position.y][target.position.x] = target.playerNumber
        }
    }
    console.log(JSON.parse(JSON.stringify(target.position)))
   // displayPushbackAnimation(originalPosition, {...target.position}, target, distance, direction)
    return 0
}