function checkIfInsideOfMap(map, y, x) {
  if (y >= map.length || y < 0 || x >= map[Math.abs(y)].length || x < 0) {
    return false;
  } else {
    return true; // Inside of map
  }
}

function checkIfMapGridIsAvailable(map, position) {
  if (!map) map = Game.activeMap;
  if (map[position.y][position.x] > 20 && map[position.y][position.x] < 30) {
    return true;
  } else return false;
}

const checkInsideAndGridAvailability = (position, map) => {
  if (!map) map = Game.activeMap;
  if (
    checkIfInsideOfMap(map, position.y, position.x) &&
    checkIfMapGridIsAvailable(map, position)
  ) {
    return true;
  }
  return false;
};
