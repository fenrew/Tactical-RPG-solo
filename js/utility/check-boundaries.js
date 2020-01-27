function checkIfInsideOfMap(map, y, x){
    if(y >= map.length || y < 0 || x >= map[Math.abs(y)].length || x < 0) {
        return false
    }
    else {
        return true
    }
}

function checkIfMapGridIsAvailable(map, position){
    if(map[position.y][position.x] > 20 && map[position.y][position.x] < 30){
        return true
    } else return false
}