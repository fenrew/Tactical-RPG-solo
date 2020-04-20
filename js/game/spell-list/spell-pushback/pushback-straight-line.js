// Pushes the target back in a straight line. Returns 0 if no pushback damage, or 0< amount of distance left as pushback damage
// Doesn't change target.position. This needs to be done somewhere else
const pushBackInStraightLine = async (target, direction, distance) => {
    target.newPosition = {...target.position}
    
    for(let i = 0; i < distance; i++){
        for (let key in direction){
            let prevPos = {...target.newPosition}
            target.newPosition[key] += direction[key]
            if(!checkInsideAndGridAvailability(target.newPosition)){
                target.newPosition[key] -= direction[key]
                await displayPushbackAnimation({...target.position}, {...target.newPosition}, target)
                console.log("return", distance, i)
                    
                return distance - i
            }
            Game.activeMap[prevPos.y][prevPos.x] = Game.originalMap[prevPos.y][prevPos.x]
            Game.activeMap[target.newPosition.y][target.newPosition.x] = target.playerNumber
        }
    }

        await displayPushbackAnimation({...target.position}, {...target.newPosition}, target)
        console.log("return")
        return 0
    }