// 20 = Void/emptyness
// 21 = Grass
// 22 = Sand
// 30 = Stone
// 40 = Ice Wall
// 41 = Totem of Healing
// 42 = Totem of Mana
// 70 = Zombie
// 200 = Teleport shop 1
// 300 = Teleport shop 2

// 0-9 = Player
// 10-19 = starting positions for players 1-10
// 20-49 = Terrain
// 20-29 = Walkable Terrain
// 30-39 = Obstacle Terrain
// 40-59 = Obstacle Terrain Summons
// 70-99 = CPU's
// 200-299 = Shop 1
// 300-399 = Shop 2

// Highlight map:
// 0 = no highlight
// 1 = active player highlight
// 2 = inactive player highlight

// Glyph map:
// 1 = heatwave (Novice)
// 2 = freezing ground (Sorcerer)
// 3 = snowstorm (Sorcerer)
// 4 = holy ground (Priest)
// 5 = starfall (Priest)

const mapOne = [
  [20, 20, 21, 200, 30, 21, 21, 21, 21, 21, 21, 21, 21, 21, 20, 20],
  [20, 21, 21, 30, 30, 30, 21, 21, 21, 21, 21, 21, 21, 30, 21, 20],
  [21, 13, 21, 21, 21, 21, 21, 21, 21, 21, 22, 30, 21, 21, 21, 21],
  [21, 12, 21, 21, 21, 21, 22, 21, 21, 21, 21, 21, 21, 21, 21, 21],
  [21, 10, 21, 21, 21, 22, 11, 22, 22, 21, 21, 22, 21, 21, 21, 21],
  [21, 21, 21, 21, 30, 21, 21, 21, 22, 30, 21, 21, 11, 21, 21, 21],
  [21, 21, 21, 21, 22, 21, 21, 22, 22, 21, 11, 21, 21, 21, 21, 21],
  [21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 11, 21],
  [21, 21, 21, 21, 21, 30, 21, 21, 21, 21, 22, 11, 30, 21, 21, 21],
  [21, 21, 21, 30, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21],
  [20, 21, 21, 21, 21, 21, 30, 21, 21, 21, 21, 21, 21, 21, 21, 20],
  [20, 20, 21, 21, 21, 30, 21, 21, 21, 21, 21, 21, 21, 300, 20, 20],
];

function returnMapBlockClass(mapNumber) {
  const mapBlockClasses = {
    1: "player-one",
    2: "player-two",
    3: "player-three",
    4: "player-four",
    10: "map-grid-player-one-starting-position",
    11: "map-grid-player-two-starting-position",
    20: "map-grid-void",
    21: "map-grid-grass",
    22: "map-grid-sand",
    30: "map-grid-stone",
    70: "npc-zombie",
    200: "map-grid-teleport-shop-minerals",
    300: "map-grid-teleport-shop-fabrics",
  };

  return mapBlockClasses[mapNumber];
}

// 0-29 actively taken away (like movement and spell highlight)
// 30+ stays (like glyphs)
function returnHighlightBlockClass(mapNumber) {
  const mapHighlightClasses = {
    0: "",
    1: "active-movement-highlight",
    2: "inactive-movement-highlight",
    3: "spell-range-highlight",
  };

  return mapHighlightClasses[mapNumber];
}

// Is the position occupied by a unit. Returns the unit or false.
const checkIfPositionIsUnit = (map = Game.activeMap, position) => {
  const { y, x } = position;
  const mapNumber = Game.activeMap[y] ? Game.activeMap[y][x] : false;

  if (!mapNumber && mapNumber !== 0) return false;

  if (
    (mapNumber >= 0 && mapNumber < 10) ||
    (mapNumber >= 70 && mapNumber < 100) ||
    (mapNumber >= 40 && mapNumber < 60)
  ) {
    const foundPlayer = Game.combatTimeline.find(
      (ele) => ele.position.y === y && ele.position.x === x
    );
    return foundPlayer;
  }

  return false;
};

const allMaps = [mapOne];
