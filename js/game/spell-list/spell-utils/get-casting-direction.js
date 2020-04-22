const getCastingDirection = (playerPosition, targetPosition) => {
    const relativeX = playerPosition.x - targetPosition.x
    const relativeY = playerPosition.y - targetPosition.y

    if(Math.abs(relativeX) > Math.abs(relativeY)){
        if(relativeX > 0) {
            return "W"
        } else {
            return "E"
        }
    } else {
        if(relativeY > 0){
            return "N"
        } else {
            return "S"
        }
    }
}