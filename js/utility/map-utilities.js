function removeStartingPositions(map) {

    for(let y = 0; y < map.length; y ++){
        for(let x = 0; x < map[y].length; x++){
            if(map[y][x] > 9 && map[y][x] < 20){
                map[y][x] = 21
            }
        }
    }

    return map
}